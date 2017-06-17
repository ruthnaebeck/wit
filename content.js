/* global Clarifai clarKey clarSecret */

var clarApp = new Clarifai.App(clarKey, clarSecret)

function femalePercent(data, nodeArr){
  var i = 0
  var len = nodeArr.length - 1
  function filter(){
    // console.log('x', nodeArr[i], i)
    clarApp.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', nodeArr[i].src)
    .then(
      function(response) {
        i++
        var genders = response.outputs[0].data.regions[0].data.face.gender_appearance.concepts
        let percentFemale = 0
        if(genders[0].name === 'feminine'){
          percentFemale = genders[0].value
        }else{
          percentFemale = genders[1].value
        }
        // console.log(nodeArr[i].alt, percentFemale)
        if(percentFemale < 0.5){
          nodeArr[i - 1].closest('li.mn-pymk-list__card').remove()
          // console.log('REMOVED')
        }
        // else{
        //   console.log('FEMALE')
        // }
      },
      function(err) {
        i++
        console.log(err)
        console.log('Error on', nodeArr[i - 1].alt)
      }
    )
    if(i < len){
      setTimeout(filter, 500)
    }
  }
  filter()
}
