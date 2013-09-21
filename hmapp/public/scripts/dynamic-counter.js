/**
 * @author abduldav
 */
var s = function() {
	var img = document.getElementById("live");
	img.timer = setInterval(function() {
		if (img.src.lastIndexOf("?") > 0) var newSrc = img.src.substr(0,img.src.lastIndexOf("?"))+"?s="+Math.random();
		else var newSrc = img.src+"?s="+Math.random();
		img.src = newSrc;
	},28050);
};
if (window.addEventListener) { window.addEventListener("load", s, false); } 
else if (window.attachEvent) { window.attachEvent("onload", s); } 