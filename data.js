function runD3(){
  console.log("WE IN HERE:", d3)
  filterByWomen();
}

(function(){
  var head = document.getElementsByTagName("head");
  var script = document.createElement("script");

  script.onload = runD3();
  script.onerror = function () { alert('Failed to load D3.') };
  script.src = "http://d3js.org/d3.v3.min.js";
  script.charset = "utf-8";
  // head.appendChild(script);
  console.log('script', script)
})();
