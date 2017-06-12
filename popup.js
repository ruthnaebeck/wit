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

function renderHTML(value) {
  document.getElementById('witLI').innerHTML = value;
}

function scroll() {
  chrome.tabs.executeScript(null,
      {code: `
        window.addEventListener('scroll', function(e){
          console.log('test', document.documentElement.scrollHeight)
        })
      `})
  window.close()
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    if(url === 'https://www.linkedin.com/mynetwork/'){
      renderHTML('Filtering...')
      scroll()
    }else{
      renderHTML('Please navigate to https://www.linkedin.com/mynetwork/')
    }
  })
})
