/* global chrome */

function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0]
    var url = tab.url
    console.assert(typeof url == 'string', 'tab.url should be a string')
    callback(url)
  })
}

function filterByWomen() {
  chrome.tabs.executeScript(null,
    {code: `
      var clarApp = new Clarifai.App(
        'zYOQwhlm1J3ylwqW4AZyArXbDvmxMfNh521S4iYH',
        'ya_pWvenG-kZ5V5VhMfpmu1CNRiK5xVmiAUAPXxn'
      )
      var images = document.querySelectorAll('.lazy-image.EntityPhoto-circle-7.loaded')
      images.forEach(image => {
        clarApp.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', image.src)
        .then(
          function(response) {
            var genders = response.outputs[0].data.regions[0].data.face.gender_appearance.concepts
            var percentFemale = 0
            var gender = 'unknown'
            if(genders[0].name === 'feminine'){
              gender = genders[0].name
              percentFemale = genders[0].value
            }else{
              gender = genders[1].name
              percentFemale = genders[1].value
            }
            console.log(image.alt, gender, percentFemale)
            if(percentFemale < .5){
              image.closest('li.mn-pymk-list__card').remove()
              console.log('REMOVED')
            }else{
              console.log('FEMALE')
            }
          },
          function(err) {
            console.log(err)
            console.log('Error on', image.alt)
          }
        )
      })
      var images = document.querySelectorAll('.lazy-image.EntityPhoto-circle-7.ghost-person.loaded')
      images.forEach(image => {
        var firstName = image.alt.split(' ')[0]
        var url = 'https://gender-api.com/get?key=QSDnnVxVVRusljFLBB&name=' + firstName
        fetch(url)
        .then(result => result.json())
        .then(result => {
          console.log(result)
          if (result.accuracy >= 60 && result.gender === 'male') {
            image.closest('li.mn-pymk-list__card').remove()
            console.log('REMOVED', result.name)
          }else{
            console.log('FEMALE', result.name)
          }
        })
      },
        function(err) {
          console.log(err)
          console.log('Error on', image.alt)
        })
    `})
  setTimeout(function(){
    window.close()
  }, 2000)
}

function renderHTML(value) {
  document.getElementById('witLI').innerHTML = value;
}

function cleanFeed() {
  chrome.tabs.executeScript(null,
    {code: `
      window.addEventListener('scroll', function(e){
        [].forEach.call(document.querySelectorAll('.feed-s-connection-updates'),function(e){
          e.parentNode.removeChild(e);
        })
      })
    `})
  setTimeout(function(){
    window.close()
  }, 2000)
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    if(url.indexOf('https://www.linkedin.com/mynetwork/') > -1){
      renderHTML('Working...')
      filterByWomen()
    }else if(url === 'https://www.linkedin.com/feed/'){
      renderHTML('Feed will be cleaned as you scroll.')
      cleanFeed()
    }else{
      renderHTML('Please navigate to https://www.linkedin.com/mynetwork/')
    }
  })
})
