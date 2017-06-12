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

function onScroll() {
  chrome.tabs.executeScript(null,
      {code: `
        window.addEventListener('scroll', function(e){
          console.log('test', document.documentElement.scrollHeight)
        })
      `})
  window.close()
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
  window.close()
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    if(url === 'https://www.linkedin.com/mynetwork/'){
      renderHTML('Filtering...')
      onScroll()
    }else if(url === 'https://www.linkedin.com/feed/'){
      renderHTML('Filtering...')
      cleanFeed()
    }else{
      renderHTML('Please navigate to https://www.linkedin.com/mynetwork/')
    }
  })
})
