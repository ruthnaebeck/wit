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

function consoleLog() {
  chrome.tabs.executeScript(null,
    {code: `
      var clarApp = new Clarifai.App(
        'zYOQwhlm1J3ylwqW4AZyArXbDvmxMfNh521S4iYH',
        'ya_pWvenG-kZ5V5VhMfpmu1CNRiK5xVmiAUAPXxn'
      )
      clarApp.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAvzAAAAJDAxZGE0OWM4LTk3M2UtNDE5Ny1iM2YxLTkxOGJmMDFjZGQwZg.jpg')
        .then(
          function(response) {
            console.log('Response', response.outputs[0].data.regions[0].data.face.gender_appearance.concepts[1].name, response.outputs[0].data.regions[0].data.face.gender_appearance.concepts[1].value)
          },
          function(err) {
            console.log('Error', err)
          }
        )
    `})
  setTimeout(function(){
    window.close()
  }, 2000)
}

function renderHTML(value) {
  document.getElementById('witLI').innerHTML = value;
}

function onScroll() {
  chrome.tabs.executeScript(null,
    {code: `
      window.addEventListener('scroll', function(e){
        console.log('test', document.documentElement.scrollHeight)
      })
    `})
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
    if(url === 'https://www.linkedin.com/mynetwork/'){
      renderHTML('Analyzing...')
      consoleLog()
      onScroll()
    }else if(url === 'https://www.linkedin.com/feed/'){
      renderHTML('Feed will be cleaned as you scroll.')
      cleanFeed()
    }else{
      renderHTML('Please navigate to https://www.linkedin.com/mynetwork/')
    }
  })
})
