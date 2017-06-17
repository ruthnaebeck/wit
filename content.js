/* global Clarifai clarKey clarSecret */

var clarApp = new Clarifai.App(clarKey, clarSecret)
console.log(clarApp)

function femalePercent(images){
  for(var image in images){
    clarApp.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', images[image].src)
    .then(
      function(response) {
        var genders = response.outputs[0].data.regions[0].data.face.gender_appearance.concepts
        if(genders[0].name === 'feminine'){
          images[image].femalePercent = genders[0].value
          // console.log(images[image].femalePercent)
        }else{
          images[image].femalePercent = genders[1].value
          // console.log(images[image].femalePercent)
        }
        // console.log(image.alt, gender, percentFemale)
        // if(percentFemale < .5){
        //   image.closest('li.mn-pymk-list__card').remove()
        //   console.log('REMOVED')
        // }else{
        //   console.log('FEMALE')
        // }
        console.log(images)
      },
      function(err) {
        console.log(err)
        console.log('Error on', image.alt)
      }
    )
  }
}
