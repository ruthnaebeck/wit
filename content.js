/* global Clarifai clarKey clarSecret */

var clarApp = new Clarifai.App(clarKey, clarSecret);

function femalePercent(nodeArr) {
  var i = 0;
  var len = nodeArr.length - 1;
  function filter() {
    let node = nodeArr[i];
    i++;
    if (node) {
      clarApp.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', node.src)
        .then(
        function (response) {
          if (response) {
            let resUrl = response.outputs[0].input.data.image.url;
            let nodeUrl = node.src;
            if (resUrl === nodeUrl) {
              var genders = response.outputs[0].data.regions[0].data.face.gender_appearance.concepts;
              let percentFemale = 0;
              if (genders[0].name === 'feminine') {
                percentFemale = genders[0].value;
              } else {
                percentFemale = genders[1].value;
              }
              if (percentFemale < 0.5) {
                node.closest('li.mn-pymk-list__card').remove();
                console.log(node.alt, 'MALE');
              }
              else {
                console.log(node.alt, 'FEMALE');
              }
            } else {
              console.log('******SYNC_ISSUE********');
              i--;
            }
          }
        },
        function (err) {
          console.log(err);
          console.log('Error on', node.alt);
        }
        );
      if (i < len) {
        setTimeout(filter, 600);
      }
    }
  }
  filter();
}
