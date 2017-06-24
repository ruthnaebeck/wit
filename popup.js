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
      var ghosts = document.querySelectorAll('.lazy-image.EntityPhoto-circle-7.ghost-person.loaded')
      ghosts.forEach(image => {
        var firstName = image.alt.split(' ')[0]
        var url = 'https://gender-api.com/get?key=' + genderKey + '&name=' + firstName
        fetch(url)
        .then(result => result.json())
        .then(result => {
          // console.log(result)
          if (result.accuracy >= 60 && result.gender === 'male') {
            image.closest('li.mn-pymk-list__card').remove()
            console.log('MALE GHOST', result.name)
          }else{
            console.log('FEMALE GHOST', result.name)
          }
        })
      })
      var images = document.querySelectorAll('.lazy-image.EntityPhoto-circle-7.loaded:not(.ghost-person)')
      var data = {}
      var nodeArr = []
      images.forEach(image => {
        let id = image.parentNode.id
        if(!data[id]){
          nodeArr.push(image)
          data[id] = {
            alt: image.alt,
            node: image,
            src: image.src,
            femalePercent: null
          }
        }
      })
      femalePercent(nodeArr)
    `})
  setTimeout(function(){
    window.close()
  }, 2000)
}

function searchFilter() {
  chrome.tabs.executeScript(null,
    {code: `
      var ghosts = document.querySelectorAll('.lazy-image.ghost-person.loaded')
      ghosts.forEach(image => {
        var firstName = image.alt.split(' ')[0]
        var url = 'https://gender-api.com/get?key=' + genderKey + '&name=' + firstName
        fetch(url)
        .then(result => result.json())
        .then(result => {
          // console.log(result)
          if (result.accuracy >= 60 && result.gender === 'male') {
            image.closest('div.search-result__wrapper').remove()
            console.log('REMOVED', result.name)
          }else{
            console.log('FEMALE', result.name)
          }
        })
      })
      var images = document.querySelectorAll('.lazy-image.loaded')
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
              image.closest('div.search-result__wrapper').remove()
              console.log('REMOVED')
            }else{
              console.log('FEMALE')
            }
          },
        function(err) {
          console.log(err)
          console.log('Error on', image.alt)
        })
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
    if(url.indexOf('linkedin.com/mynetwork') > -1){
      renderHTML('Working...')
      filterByWomen()
    }else if(url.indexOf('linkedin.com/feed') > -1){
      renderHTML('Scroll to clean feed')
      cleanFeed()
    }else if (url.indexOf('linkedin.com/search') > -1){
      renderHTML('Working...')
      searchFilter()
    }else{
      renderHTML('Please navigate to LinkedIn')
    }
  })
})
