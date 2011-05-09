// Declarations
var dt = {};
dt.getQuery = function(ji) {
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

/*
	dt.xhr
-----------------------------------------------------------------------------*/
dt.xhr = {};
dt.xhr.loadFile = function(fname) {
    var xmlDoc;
    // code for IE
    if (window.ActiveXObject) {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.load(fname);
        return (xmlDoc);
    }
    // code for Mozilla, Firefox, Opera, etc.
    else if (window.XMLHttpRequest) {
        xmlDoc = new window.XMLHttpRequest();
        xmlDoc.open("GET", fname, false)
        xmlDoc.send("")
        return xmlDoc;
    }
    else {
        throw (new dt.eh.exception("This browser doesn't support XMLHttpRequest"));
    }
}



// dt.dev
dt.dev = {};
dt.dev.statuses = { off: 0, play: 1, pause: 2 };
dt.dev.designViews = { hidden: 0, semiTransparent: 1, opaque: 2 };
dt.dev.config = eval(dt.xhr.loadFile("/BaseSite/js/dev.config.js").responseText);

// Properties
dt.dev.controller = null;
dt.dev.designlayout = null;
dt.dev.designvisible = false;
dt.dev.designCurrentImageIndex = 0;
dt.dev.designLayoutImages =  dt.dev.config.designLayoutImages;  // list of layout images to place as the design overlay 
dt.dev.currentStatus = dt.dev.statuses.pause;
dt.dev.secondsBeforeRefresh = 2.5;
dt.dev.currentDesignView = dt.dev.designViews.hidden;
dt.dev.timerId = -1;

// Methods
dt.dev.init = function() {
    s = dt.getQuery("status");
    if (s) { dt.dev.currentStatus = s; }
    if (dt.dev.currentStatus != dt.dev.statuses.off) {

        // layout image
        if (dt.getQuery("di") != null) {
            dt.dev.designCurrentImageIndex = parseInt(dt.getQuery("di"));
            designImageSettings = dt.dev.designLayoutImages[dt.dev.designCurrentImageIndex];
        } else {
            designImageSettings = dt.dev.getDesignImageSettings();
        }
        if (designImageSettings) {
            $("body").append('<img id="design" src="' + designImageSettings.imageUrl + '" alt="design image" />');
            $("#design")
            .css({ position: 'absolute', 'z-index': '2000', display: 'none' })
            .css(designImageSettings.style);
            $(document).keydown(dt.dev.onBody_KeyDown);
        }
        
        // controller
        dt.dev.controller = document.createElement("div");
        $(dt.dev.controller).attr("style", "border: solid 1px #ccc; position: fixed; top:0; left:0; width: 5px; height: 6px; font-weight: bold; text-align: center; padding: 3px; cursor: pointer; background-color: white; font-size: 5px; z-index: 2000;");
        dt.dev.controller.onclick = dt.dev.toggle;
        document.getElementsByTagName("body")[0].appendChild(dt.dev.controller);

        // design layout
        dt.dev.designlayout = document.createElement("div");
        $(dt.dev.designlayout).attr("style", "border: solid 1px #ccc; position: fixed; top:0; left:15px; width: 45px; height: 6px; font-weight: bold; text-align: center; padding: 3px; cursor: pointer; background-color: white; font-size: 7px; z-index: 2000;");
        dt.dev.designlayout.onclick = dt.dev.toggledesign;
        dt.dev.designlayout.innerHTML = "D E S I G N";
        document.getElementsByTagName("body")[0].appendChild(dt.dev.designlayout);
        d = dt.getQuery("design");
        if (d != null) {
            dt.dev.designvisible = d;
            //if (d == 'true') { dt.dev.designShow(); } else { dt.dev.designHide(); }
        }
        dv = dt.getQuery("dv");
        if (dv != null) {
            if (dv == dt.dev.designViews.hidden) {
                dt.dev.designHide();
            } else if (dv == dt.dev.designViews.semiTransparent) {
                dt.dev.designSemiTransparent();
            } else {
                dt.dev.designShow();
            }
        }

        v = dt.getQuery("v");
        if (v) {
            $(document).scrollTop(v);
        }

        window.onmousemove = dt.dev.onMouseMove;
        if (dt.dev.currentStatus == dt.dev.statuses.pause) {
            dt.dev.pause();
        } else {
            dt.dev.play();
        }
    }
	dt.eh.init();
}
dt.dev.getDesignImageSettings = function() {
    pathname = location.pathname.toLowerCase();
    for (var i = 0; i < dt.dev.designLayoutImages.length; i++) {
        layout = dt.dev.designLayoutImages[i];
        for (var p = 0; p < layout.paths.length; p++) {
            path = layout.paths[p];
            if (pathname == path) {
                dt.dev.designCurrentImageIndex = i;
                return layout;
            }
        }
    };
    return '/images/layout-home.jpg';
}

dt.dev.designBack = function() {
    if (dt.dev.currentDesignView == dt.dev.designViews.hidden) {
        dt.dev.designShow();
    } else if (dt.dev.currentDesignView == dt.dev.designViews.semiTransparent) {
        dt.dev.designHide();
    } else {
        dt.dev.designSemiTransparent();
    }
}
dt.dev.designForward = function() {
    if (dt.dev.currentDesignView == dt.dev.designViews.hidden) {
        dt.dev.designSemiTransparent();
    } else if (dt.dev.currentDesignView == dt.dev.designViews.semiTransparent) {
        dt.dev.designShow();
    } else {
        dt.dev.designHide();
    }
}
dt.dev.designHide = function() {
    $("#design").css("display", "none");
    dt.dev.designvisible = false;
    dt.dev.currentDesignView = dt.dev.designViews.hidden;
}
dt.dev.designShow = function() {
    $("#design").css({ display: "block", opacity: "1" });
    dt.dev.designvisible = true;
    dt.dev.currentDesignView = dt.dev.designViews.opaque;
}
dt.dev.designSemiTransparent = function() {
    $("#design").css({ display: "block", opacity: "0.5" });
    dt.dev.designvisible = true;
    dt.dev.currentDesignView = dt.dev.designViews.semiTransparent;
}
dt.dev.designSwitch = function(previous) {
    if (previous) {
        newIndex = dt.dev.designCurrentImageIndex - 1;
        if (newIndex < 0) newIndex = dt.dev.designLayoutImages.length -1;
    } else {
        newIndex = dt.dev.designCurrentImageIndex + 1;
        if (newIndex > dt.dev.designLayoutImages.length - 1) newIndex = 0;
    }
    dt.dev.designCurrentImageIndex = newIndex;
    nextLayout = dt.dev.designLayoutImages[newIndex];
    $("#design")
        .attr("src", nextLayout.imageUrl)
        .css(nextLayout.style);
}
dt.dev.onBody_KeyDown = function(e) {
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    else return true;

    // Check if user presses Ctl+. (ie Ctl+>)
    if (e.ctrlKey && (keycode == 190 || keycode == 39)) {
        dt.dev.designForward();
        return false;
    }
    // Check if user presses Ctl+, (ie Ctl+<)
    if (e.ctrlKey && (keycode == 188 || keycode == 37)) {
        dt.dev.designBack();
        return false;
    }
    // Check if user presses Ctl+up-arrow
    if (e.ctrlKey && keycode == 38) {
        dt.dev.designSwitch(true);
        return false;
    }
    // Check if user presses Ctl+down-arrow
    if (e.ctrlKey && keycode == 40) {
        dt.dev.designSwitch(false);
        return false;
    }
    // Ctl+Space
    else if (e.ctrlKey && keycode == 32) {
        dt.dev.toggle();
        return false;
    }
    else {
        return true;
    }
}
dt.dev.onMouseMove = function() {
    clearTimeout(dt.dev.timerId);
    if (dt.dev.currentStatus == dt.dev.statuses.play) {
        timerId = setTimeout('dt.dev.reload()', dt.dev.secondsBeforeRefresh * 1000);
    }
}
dt.dev.play = function() {
    dt.dev.currentStatus = dt.dev.statuses.play;
    dt.dev.controller.innerHTML = "|&nbsp;|";
    dt.dev.timerId = setTimeout('dt.dev.reload()', dt.dev.secondsBeforeRefresh * 1000);
}
dt.dev.pause = function() {
    dt.dev.currentStatus = dt.dev.statuses.pause;
    dt.dev.controller.innerHTML = ">";
    clearTimeout(dt.dev.timerId);
    //reloadUrl = "http://" + location.host + location.pathname + "?status=" + dt.dev.currentStatus + "&design=" + dt.dev.designvisible + "&v=" + $(document).scrollTop() + "&dv=" + dt.dev.currentDesignView;
    //location.href = reloadUrl;
    
}
dt.dev.reload = function() {
    if (dt.dev.currentStatus == dt.dev.statuses.play) {
        reloadUrl = "http://" + location.host + location.pathname + "?r=" + new Date().toString() + "&status=" + dt.dev.currentStatus + "&design=" + dt.dev.designvisible + "&v=" + $(document).scrollTop() + "&dv=" + dt.dev.currentDesignView + "&di=" + dt.dev.designCurrentImageIndex;
        location.href = reloadUrl;
    }
}

dt.dev.toggle = function() {
    if (dt.dev.currentStatus == dt.dev.statuses.pause) {
        dt.dev.play();
    } else {
        dt.dev.pause();
    }
}
dt.dev.toggledesign = function() {
    dt.dev.designForward();
}

/*
    dt.eh
-----------------------------------------------------------*/
dt.eh = {};
dt.eh.controller = null;
dt.eh.errorsBox = null;
dt.eh.errors = "";
dt.eh.errorsBoxVisible = false;

dt.eh.exception = function(message){
	this.message = message;
}
dt.eh.exception.prototype = {};
dt.eh.exception.prototype.message = "";

dt.eh.init = function(){
	// controller
	dt.eh.controller = document.createElement("div");
	$(dt.eh.controller).attr("style", "border: solid 1px #ccc; position: fixed; top:15px; left:0; width: 5px; height: 6px; font-weight: bold; text-align: center; padding: 3px; cursor: pointer; background-color: white; font-size: 9px; z-index: 2000;");
	dt.eh.controller.onclick = dt.eh.toggleErrorBox;
	document.getElementsByTagName("body")[0].appendChild(dt.eh.controller);

	// errors
	dt.eh.errorsBox = document.createElement("ul");
	$(dt.eh.errorsBox).attr("style", "border: solid 1px #ccc; display: none; position: fixed; top:15px; left:15px; width: 300px; height: 400px; font-weight: bold; text-align: left; padding: 3px; background-color: white; font-size: 9px; z-index: 2000; overflow: auto;");
	document.getElementsByTagName("body")[0].appendChild(dt.eh.errorsBox);
	
	dt.eh.renderErrors();
}
dt.eh.logError = function(err){
	if (typeof(err) == "string"){
		dt.eh.errors  += "<li>" + err + "</li>";
	}else{
		dt.eh.errors  += "<li>" + err.message + "</li>";
	}
	dt.eh.renderErrors();
}
dt.eh.renderErrors = function(){
	if (dt.eh.errorsBox){	$(dt.eh.errorsBox).html(dt.eh.errors); }
	if (dt.eh.controller) {
		if (dt.eh.errors != ""){
			$(dt.eh.controller)
				.css("border-color","red")
				.css("color","red")
				.html("!");
		}else{
			$(dt.eh.controller)
				.css("border-color","#ccc")
				.css("color","#444")
				.html("e");
		}
	}
}
dt.eh.showErrorBox = function(b){
	dt.eh.errorsBoxVisible = b;
	if (b){
		$(dt.eh.errorsBox).show(100);
	}else{
		$(dt.eh.errorsBox).hide(100);
	}
}
dt.eh.toggleErrorBox = function(){
	dt.eh.showErrorBox(!dt.eh.errorsBoxVisible);
}

if (window.addEventListener) {
    window.addEventListener('load', dt.dev.init, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', dt.dev.init);
}


/*
	dt.xml
-----------------------------------------------------------------------------*/
dt.xml ={};
dt.xml.xslTransform = function(xml, xsl) {
    // code for IE
    if (window.ActiveXObject) {
        ex = xml.transformNode(xsl);
        return ex;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else if (document.implementation
  && document.implementation.createDocument) {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        resultDocument = xsltProcessor.transformToFragment(xml, document);
        return resultDocument;
    }
}

