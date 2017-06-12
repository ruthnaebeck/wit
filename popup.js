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

function click() {
  chrome.tabs.executeScript(null,
      {code: 'window.scroll(0, 10000)'})
  window.close()
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    if(url === 'https://www.linkedin.com/mynetwork/'){
      renderHTML('Filtering...')
      click()
    }else{
      renderHTML('Please navigate to https://www.linkedin.com/mynetwork/')
    }
  })
})
