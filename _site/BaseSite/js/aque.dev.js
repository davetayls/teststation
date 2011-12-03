// Declarations
var aque = {}
aque.getQuery = function(ji) {
    hu = window.location.search.substring(1);
    gy = hu.split("&");
    for (i = 0; i < gy.length; i++) {
        ft = gy[i].split("=");
        if (ft[0] == ji) {
            return ft[1];
        }
    }
    return null;
}

// aque.dev
aque.dev = {};
aque.dev.statuses = { off: 0, play: 1, pause: 2 };
aque.dev.designViews = { hidden: 0, semiTransparent: 1, opaque: 2 };

// Properties
aque.dev.controller = null;
aque.dev.designlayout = null;
aque.dev.designvisible = false;
aque.dev.designCurrentImageIndex = 0;
aque.dev.designLayoutImages = [
	{   imageUrl: '/images/layouts/themarket/01_Market_V2.jpg', paths: ['/layouts/themarket/market_v2.htm'], style: {top: '-87px', left: '50%', 'margin-left': '-550px' }  },
	{   imageUrl: '/images/layouts/themarket/00_SolvencyII.jpg', paths: ['/layouts/themarket/solvencyii.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }  },
	{   imageUrl: '/images/layouts/themarket/02_Bulletins.jpg', paths: ['/layouts/themarket/bulletins.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }  },
	{   imageUrl: '/images/layouts/themarket/02_Compliance_V2.jpg', paths: ['/layouts/themarket/compliance.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }  },
	{   imageUrl: '/images/layouts/themarket/02_Directories.jpg', paths: ['/layouts/themarket/directories.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }  },
	{   imageUrl: '/images/layouts/themarket/02_Market.jpg', paths: ['/layouts/themarket/market.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-550px' }  },

	// news and insight
	{   imageUrl: '/images/layouts/News/02_1_article.jpg', paths: ['/layouts/news/article.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }  },
	{   imageUrl: '/images/layouts/News/00_03_01_x_Climate change.jpg', paths: ['/layouts/news/climate_change.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }  },
	{   imageUrl: '/images/layouts/News/02_360_Hub.jpg', paths: ['/layouts/news/360_hub.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }  },
	{   imageUrl: '/images/layouts/News/02_360_Hub_alt2.jpg', paths: ['/layouts/news/360_hub_alt2.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }  },
	{   imageUrl: '/images/layouts/News/02_360_Hub_alt3.jpg', paths: ['/layouts/news/360_hub_alt3.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }  },
	{   imageUrl: '/images/layouts/News/02_Events_Hub.jpg', paths: ['/layouts/news/events_hub.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }  },
	{   imageUrl: '/images/layouts/News/02_news&features_Hub.jpg', paths: ['/layouts/news/news_features_hub.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }  },
	{   imageUrl: '/images/layouts/News/blogs.jpg', paths: ['/layouts/news/blogs.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }  },
	{   imageUrl: '/images/layouts/News/02_blogs_hub.jpg', paths: ['/layouts/news/blogs_hub.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }  },
	{   imageUrl: '/images/layouts/News/03_03_research.jpg', paths: ['/layouts/news/research.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }  },
	{   imageUrl: '/images/layouts/News/02_research_hub.jpg', paths: ['/layouts/news/research_hub.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }  },
	{   imageUrl: '/images/layouts/News/02_1_categories.jpg', paths: ['/layouts/news/categories.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }  },

	// lloyds
	{   imageUrl: '/images/layouts/00_01_about.jpg', paths: ['/layouts/lloyds/layout-center-basic.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }  },
    {   imageUrl: '/images/layouts/00_01_04_x_Event.jpg', paths: ['/'], style: { top: '-88px', left: '50%', 'margin-left': '-551px' } },
    {   imageUrl: '/images/layouts/00_1_1_1_The_Market.jpg', paths: ['/layouts/lloyds/the_market.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' }   },
    { 	imageUrl: '/images/layouts/00_home.jpg', paths: ['/layouts/lloyds/careers_events.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' } },
    { 	imageUrl: '/images/layouts/04_4_x_Graduates_v2.jpg', paths: ['/layouts/lloyds/graduates.htm'], style: {top: '-88px', left: '50%', 'margin-left': '-551px' } },
	{	imageUrl: '/images/layouts/00_1_2_4_Casestudies_fallback.jpg', paths: ['/layouts/lloyds/case_studies.htm'], style: { top: '-88px', left: '50%', 'margin-left': '-551px' } },
	{	imageUrl: '/images/layouts/00_1_2_4_Meet_our_people_Landing.jpg', paths: ['/layouts/lloyds/meet_our_people.htm'], style: { top: '-88px', left: '50%', 'margin-left': '-551px' } },
    {	imageUrl: '/images/layouts/03_1_1_1_Management_Team.jpg', paths: ['/layouts/lloyds/management_team.htm'], style: { top: '-88px', left: '50%', 'margin-left': '-551px' } },
	{	imageUrl: '/images/layouts/03_1_3_Governance.jpg', paths: ['/layouts/lloyds/governance.htm'], style: { top: '-88px', left: '50%', 'margin-left': '-551px' }},
	{	imageUrl: '/images/layouts/03_1_Structure.jpg', paths: ['/layouts/lloyds/structure.htm'], style: { top: '-88px', left: '50%', 'margin-left': '-551px' } },
    {	imageUrl: '/images/layouts/00_1_4_Careers_events.jpg', paths: ['/layouts/lloyds/careers_events.htm'], style: { top: '-88px', left: '50%', 'margin-left': '-551px' }}

];  // list of layout images to place as the design overlay 
aque.dev.currentStatus = aque.dev.statuses.pause;
aque.dev.secondsBeforeRefresh = 2.5;
aque.dev.currentDesignView = aque.dev.designViews.hidden;
aque.dev.timerId = -1;

// Methods
aque.dev.init = function() {
    s = aque.getQuery("status");
    if (s) { aque.dev.currentStatus = s; }
    if (aque.dev.currentStatus != aque.dev.statuses.off) {

        // layout image
        if (aque.getQuery("di") != null) {
            aque.dev.designCurrentImageIndex = parseInt(aque.getQuery("di"));
            designImageSettings = aque.dev.designLayoutImages[aque.dev.designCurrentImageIndex];
        } else {
            designImageSettings = aque.dev.getDesignImageSettings();
        }
        if (designImageSettings) {
            $("body").append('<img id="design" src="' + designImageSettings.imageUrl + '" alt="design image" />');
            $("#design")
            .css({ position: 'absolute', 'z-index': '2000', display: 'none' })
            .css(designImageSettings.style);
            $(document).keydown(aque.dev.onBody_KeyDown);
        }
        
        // controller
        aque.dev.controller = document.createElement("div");
        $(aque.dev.controller).attr("style", "border: solid 1px #ccc; position: fixed; top:0; left:0; width: 5px; height: 6px; font-weight: bold; text-align: center; padding: 3px; cursor: pointer; background-color: white; font-size: 5px; z-index: 2000;");
        aque.dev.controller.onclick = aque.dev.toggle;
        document.getElementsByTagName("body")[0].appendChild(aque.dev.controller);

        // design layout
        aque.dev.designlayout = document.createElement("div");
        $(aque.dev.designlayout).attr("style", "border: solid 1px #ccc; position: fixed; top:0; left:15px; width: 45px; height: 6px; font-weight: bold; text-align: center; padding: 3px; cursor: pointer; background-color: white; font-size: 7px; z-index: 2000;");
        aque.dev.designlayout.onclick = aque.dev.toggledesign;
        aque.dev.designlayout.innerHTML = "D E S I G N";
        document.getElementsByTagName("body")[0].appendChild(aque.dev.designlayout);
        d = aque.getQuery("design");
        if (d != null) {
            aque.dev.designvisible = d;
            //if (d == 'true') { aque.dev.designShow(); } else { aque.dev.designHide(); }
        }
        dv = aque.getQuery("dv");
        if (dv != null) {
            if (dv == aque.dev.designViews.hidden) {
                aque.dev.designHide();
            } else if (dv == aque.dev.designViews.semiTransparent) {
                aque.dev.designSemiTransparent();
            } else {
                aque.dev.designShow();
            }
        }

        v = aque.getQuery("v");
        if (v) {
            $(document).scrollTop(v);
        }

        window.onmousemove = aque.dev.onMouseMove;
        if (aque.dev.currentStatus == aque.dev.statuses.pause) {
            aque.dev.pause();
        } else {
            aque.dev.play();
        }
    }
	aque.eh.init();
}
aque.dev.getDesignImageSettings = function() {
    pathname = location.pathname.toLowerCase();
    for (var i = 0; i < aque.dev.designLayoutImages.length; i++) {
        layout = aque.dev.designLayoutImages[i];
        for (var p = 0; p < layout.paths.length; p++) {
            path = layout.paths[p];
            if (pathname == path) {
                aque.dev.designCurrentImageIndex = i;
                return layout;
            }
        }
    };
    return '/images/layout-home.jpg';
}

aque.dev.designBack = function() {
    if (aque.dev.currentDesignView == aque.dev.designViews.hidden) {
        aque.dev.designShow();
    } else if (aque.dev.currentDesignView == aque.dev.designViews.semiTransparent) {
        aque.dev.designHide();
    } else {
        aque.dev.designSemiTransparent();
    }
}
aque.dev.designForward = function() {
    if (aque.dev.currentDesignView == aque.dev.designViews.hidden) {
        aque.dev.designSemiTransparent();
    } else if (aque.dev.currentDesignView == aque.dev.designViews.semiTransparent) {
        aque.dev.designShow();
    } else {
        aque.dev.designHide();
    }
}
aque.dev.designHide = function() {
    $("#design").css("display", "none");
    aque.dev.designvisible = false;
    aque.dev.currentDesignView = aque.dev.designViews.hidden;
}
aque.dev.designShow = function() {
    $("#design").css({ display: "block", opacity: "1" });
    aque.dev.designvisible = true;
    aque.dev.currentDesignView = aque.dev.designViews.opaque;
}
aque.dev.designSemiTransparent = function() {
    $("#design").css({ display: "block", opacity: "0.5" });
    aque.dev.designvisible = true;
    aque.dev.currentDesignView = aque.dev.designViews.semiTransparent;
}
aque.dev.designSwitch = function(previous) {
    if (previous) {
        newIndex = aque.dev.designCurrentImageIndex - 1;
        if (newIndex < 0) newIndex = aque.dev.designLayoutImages.length -1;
    } else {
        newIndex = aque.dev.designCurrentImageIndex + 1;
        if (newIndex > aque.dev.designLayoutImages.length - 1) newIndex = 0;
    }
    aque.dev.designCurrentImageIndex = newIndex;
    nextLayout = aque.dev.designLayoutImages[newIndex];
    $("#design")
        .attr("src", nextLayout.imageUrl)
        .css(nextLayout.style);
}
aque.dev.onBody_KeyDown = function(e) {
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    else return true;

    // Check if user presses Ctl+. (ie Ctl+>)
    if (e.ctrlKey && (keycode == 190 || keycode == 39)) {
		if (e.shiftKey){
			var currentLeft = parseInt($("#design").css("margin-left"));
			$("#design").css("margin-left", currentLeft + 1);
		}else{
			aque.dev.designForward();
			return false;
		}
    }
    // Check if user presses Ctl+, (ie Ctl+<)
    if (e.ctrlKey && (keycode == 188 || keycode == 37)) {
		if (e.shiftKey){
			var currentLeft = parseInt($("#design").css("margin-left"));
			$("#design").css("margin-left", currentLeft - 1);
		}else{
			aque.dev.designBack();
			return false;
		}
    }
    // Check if user presses Ctl+up-arrow
    if (e.ctrlKey && keycode == 38) {
		if (e.shiftKey){
			var currentTop = parseInt($("#design").css("top"));
			$("#design").css("top", currentTop - 1);
		}else{
			aque.dev.designSwitch(true);
			return false;
		}
    }
    // Check if user presses Ctl+down-arrow
    if (e.ctrlKey && keycode == 40) {
		if (e.shiftKey){
			var currentTop = parseInt($("#design").css("top"));
			$("#design").css("top", currentTop + 1);
		}else{
			aque.dev.designSwitch(false);
			return false;
		}
    }
    // Ctl+Space
    else if (e.ctrlKey && keycode == 32) {
        aque.dev.toggle();
        return false;
    }
    else {
        return true;
    }
}
aque.dev.onMouseMove = function() {
    clearTimeout(aque.dev.timerId);
    if (aque.dev.currentStatus == aque.dev.statuses.play) {
        timerId = setTimeout('aque.dev.reload()', aque.dev.secondsBeforeRefresh * 1000);
    }
}
aque.dev.play = function() {
    aque.dev.currentStatus = aque.dev.statuses.play;
    aque.dev.controller.innerHTML = "|&nbsp;|";
    aque.dev.timerId = setTimeout('aque.dev.reload()', aque.dev.secondsBeforeRefresh * 1000);
}
aque.dev.pause = function() {
    aque.dev.currentStatus = aque.dev.statuses.pause;
    aque.dev.controller.innerHTML = ">";
    clearTimeout(aque.dev.timerId);
    //reloadUrl = "http://" + location.host + location.pathname + "?status=" + aque.dev.currentStatus + "&design=" + aque.dev.designvisible + "&v=" + $(document).scrollTop() + "&dv=" + aque.dev.currentDesignView;
    //location.href = reloadUrl;
    
}
aque.dev.reload = function() {
    if (aque.dev.currentStatus == aque.dev.statuses.play) {
        reloadUrl = "http://" + location.host + location.pathname + "?r=" + new Date().toString() + "&status=" + aque.dev.currentStatus + "&design=" + aque.dev.designvisible + "&v=" + $(document).scrollTop() + "&dv=" + aque.dev.currentDesignView + "&di=" + aque.dev.designCurrentImageIndex;
        location.href = reloadUrl;
    }
}

aque.dev.toggle = function() {
    if (aque.dev.currentStatus == aque.dev.statuses.pause) {
        aque.dev.play();
    } else {
        aque.dev.pause();
    }
}
aque.dev.toggledesign = function() {
    aque.dev.designForward();
}

/*
    aque.eh
-----------------------------------------------------------*/
aque.eh = {};
aque.eh.controller = null;
aque.eh.errorsBox = null;
aque.eh.errors = "";
aque.eh.errorsBoxVisible = false;


aque.eh.init = function(){
	// controller
	aque.eh.controller = document.createElement("div");
	$(aque.eh.controller).attr("style", "border: solid 1px #ccc; position: fixed; top:15px; left:0; width: 5px; height: 6px; font-weight: bold; text-align: center; padding: 3px; cursor: pointer; background-color: white; font-size: 9px; z-index: 2000;");
	aque.eh.controller.onclick = aque.eh.toggleErrorBox;
	document.getElementsByTagName("body")[0].appendChild(aque.eh.controller);

	// errors
	aque.eh.errorsBox = document.createElement("ul");
	$(aque.eh.errorsBox).attr("style", "border: solid 1px #ccc; display: none; position: fixed; top:15px; left:15px; width: 300px; height: 400px; font-weight: bold; text-align: left; padding: 3px; background-color: white; font-size: 9px; z-index: 2000; overflow: auto;");
	document.getElementsByTagName("body")[0].appendChild(aque.eh.errorsBox);
	
	aque.eh.renderErrors();
}
aque.eh.logError = function(err){
	if (typeof(err) == "string"){
		aque.eh.errors  += "<li>" + err + "</li>";
	}else{
		aque.eh.errors  += "<li>" + err.message + "</li>";
	}
	aque.eh.renderErrors();
}
aque.eh.renderErrors = function(){
	if (aque.eh.errorsBox){	$(aque.eh.errorsBox).html(aque.eh.errors); }
	if (aque.eh.controller) {
		if (aque.eh.errors != ""){
			$(aque.eh.controller)
				.css("border-color","red")
				.css("color","red")
				.html("!");
		}else{
			$(aque.eh.controller)
				.css("border-color","#ccc")
				.css("color","#444")
				.html("e");
		}
	}
}
aque.eh.showErrorBox = function(b){
	aque.eh.errorsBoxVisible = b;
	if (b){
		$(aque.eh.errorsBox).show(100);
	}else{
		$(aque.eh.errorsBox).hide(100);
	}
}
aque.eh.toggleErrorBox = function(){
	aque.eh.showErrorBox(!aque.eh.errorsBoxVisible);
}

if (window.addEventListener) {
    window.addEventListener('load', aque.dev.init, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', aque.dev.init);
}
