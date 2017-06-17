chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.executeScript( {file: "d3.min.js" });
  chrome.tabs.executeScript( {file: "popup.js" })
});
