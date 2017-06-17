var w = window.innerWidth - 50;
var h = 50;

var setupDependencies = function() {
  var head = document.getElementsByTagName("witLI");
  script = document.createElement("script");
  script.src = "http://d3js.org/d3.v3.min.js";
  script.charset = "utf-8";
  head[0].appendChild(script);
}

setupDependencies();

var smartReviewSVG = d3.select(".smartReviews")
                       .append("svg")
                       .attr("width", w)
                       .attr("height", h+10);
