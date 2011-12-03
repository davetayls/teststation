/*
	All of the items this file dynamically adds 
	get combined and compressed on deployment.
	
	@import url("/js/lloyds.core.js");
	@import url("/js/lloyds.ui.js");
*/
var lloydsIncludes = [
	"/js/lloyds.core.js",
	"/js/lloyds.ui.js"
	];
function includeJs(){
	for (var i=0;i< lloydsIncludes.length;i++){
		document.write("<script type=\"text/javascript\" src=\"" + lloydsIncludes[i] + "\"></script>");
	}
}
includeJs();
