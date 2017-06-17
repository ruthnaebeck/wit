chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.executeScript( {file: "d3.js" });
  chrome.tabs.executeScript( {file: "data.js" })
});
