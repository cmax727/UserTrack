//HP Customisations and configurationsvar
var ps_hpCustom = {
	init: function () {
		//New Blog object
		var psBlog = PS.NewObject("Blogs");
		//set loading element to null so no loading indicator
		psBlog.loading = null;
		//set char limit on post to 120 chars
		psBlog.charLimit = 120;
		//init blog object with the root of pokerstasrs blog
		psBlog.init("http://www.pokerstarsblog.com/", gE("scrolling-news"));
		//Rotate Ambassador
//		aS(["#pokerstars{z-index:10}", "#place-the-banner {z-index:10}"]);
//		var aR = PS.NewObject("AmbassadorRotate");
//		aR.images = ["/images/nuno-coelho-welcome.jpg", "/images/joao-nunes-welcome.jpg", "/images/henrique-pinho-welcome.jpg"];
//		aR.parentDiv = gE("big-middle");
//		aR.steps = 20;
//		sO(aR.parentDiv, { style: { overflow: "hidden"} });
//		aR.init();
	}
}
ps_hpCustom.init()
