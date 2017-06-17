
var setupDependencies = function() {
  console.log("HEYYYYYYY")
  var head = document.getElementById("witLI");
  script = document.createElement("script");
  script.src = "http://d3js.org/d3.v3.min.js";
  script.charset = "utf-8";
  head.appendChild(script);
}

setupDependencies();
