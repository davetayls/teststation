var Question = Class.create({
  _answer: null,
  answer: function() {
    if (arguments.length > 0) {
      this._answer = arguments[0];
      return this;
    }
    return this._answer;
  }
});

var SplineChart = Class.create({
  init: function(div_id, xAxisLabel, yAxisLabel, color, xMin, xMax, splineFunc) {
    this.div_id = div_id;
    this.iOS = !! window.navigator.appVersion.match(/\biP(ad|od|hone)\b/);
    this.xAxisLabel = xAxisLabel;
    this.yAxisLabel = yAxisLabel;
    this.color = color;
    this.xMin = xMin;
    this.xMax = xMax;
    this.splineFunc = splineFunc;
    
    this.questions = [];
    this.ys = [];
    this.handles = [];
    this.xLabs = [];
    this.yLabs = [];

    document.observe('dom:loaded', (function() { this.draw(true); }).bind(this));
  },
  draw: function(firstTime) {
    var me = this;
    var div = $(this.div_id);
    var canvas = div.down('canvas');
    var width = parseInt(canvas.width);  // it's a string in IE6(+?)
    var height = parseInt(canvas.height);
    
    var pxJump = 3, xPadProp = 0, yPadProp = 0, handleSize = 14, curveWidth = 2;
    if (this.iOS) handleSize *= 2;
    
    var xs = this.questions.map(function(a) { return parseFloat(a.answer()); });
    var xmin = xs.min();
    var xmax = xs.max();
    var xrange = xmax - xmin;
    xmin -= xrange * xPadProp;
    xmax += xrange * xPadProp;
    xrange = xmax - xmin;
    me.xfactor = width / xrange;
    
    var ys = this.ys;
    var ymin = ys.min();
    var ymax = ys.max();
    var yrange = ymax - ymin;
    ymin -= yrange * yPadProp;
    ymax += yrange * yPadProp;
    yrange = ymax - ymin;
    var yfactor = height / yrange;
    
    // fix infinite gradients to be just sub-infinite for plotting purposes
    var lastX, tinyAdjustment = 0.00001;
    var adjustedXs = xs.map(function(x) {
      if (x == lastX) x += tinyAdjustment;
      lastX = x
      return x; 
    });
   // var cdf = new MonotonicCubicSpline(adjustedXs, ys);
   
    var cdf = this.splineFunc(adjustedXs, ys);
    
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    
    ctx.strokeStyle = '#ccc';
    ctx.fillStyle = '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    // axis labels
    if (firstTime) {
      var xAxisLabel = new Element('div', {'class': 'cubic_spline_xaxis_label'});
      xAxisLabel.update(this.xAxisLabel).setStyle({width: canvas.width + 'px'});
      div.insert(xAxisLabel);
      var yAxisLabel = new Element('div', {'class': 'cubic_spline_yaxis_label'});
      yAxisLabel.update(this.yAxisLabel).setStyle({top: (canvas.height / 2 - 9) + 'px'});
      div.insert(yAxisLabel);
      if (me.ie) yAxisLabel.setStyle({top: (canvas.height / 2 - 100) + 'px', left: '-70px'});
    }
    
    // general iterator
    var forEachXY = function(callback) {
      for (var i = 0, len = xs.length; i < len; i ++) {
        var x = xs[i], y = ys[i];
        var pxX = (x - xmin) * me.xfactor;
        var pxY = (y - ymin) * yfactor;
        callback(x, y, pxX, pxY, i);
      }
    }
    
    forEachXY(function(x, y, pxX, pxY, i) { 
      // vertical (x) lines
      ctx.moveTo(pxX, 0);
      ctx.lineTo(pxX, height);
      
      // x labels
      var xLab;
      if (firstTime) {
        xLab = new Element('div', {'class': 'cubic_spline_xlabel'});
        me.xLabs[i] = xLab;
        div.insert(xLab);
      } else {
        xLab = me.xLabs[i];
      }
      xLab.update(x);
      xLab.setStyle({left: (pxX - 75) + 'px', top: (height + 9) + 'px'});
      
      // horizontal (y) lines
      ctx.moveTo(0, pxY);
      ctx.lineTo(width, pxY);
      
      // y labels
      if (firstTime) {
        yLab = new Element('div', {'class': 'cubic_spline_ylabel'}).update(y);
        me.yLabs[i] = yLab;
        yLab.setStyle({top: ((height - pxY) - 10) + 'px'});
        div.insert(yLab);
      }
    });
    ctx.stroke();
    ctx.closePath();

    // spline
    var started = false;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = curveWidth;
    ctx.beginPath();
    for (var pxX = 0; pxX <= width; pxX += pxJump) {
      var splineX = xmin + pxX / me.xfactor;
      var splineY = cdf.interpolate(splineX);
      if (typeof(splineY) == 'number') {
        pxY = (splineY - ymin) * yfactor;
        if (started) ctx.lineTo(pxX, height - pxY);
        else {
          ctx.moveTo(pxX, height - pxY);
          started = true;
        }
      }
    }
    ctx.stroke();
    ctx.closePath();
    
    // handles
    var handle;
    forEachXY(function(x, y, pxX, pxY, i) {
      if (firstTime) {
        handle = new Element('div', {'class': 'cubic_spline_handle'});
        handle.observe('dblclick',  function(e) { me.edit(i, e); });
        handle.observe('mousedown',  function(e) { me.slide(i, e); });
        if (me.iOS) handle.observe('touchstart', function(e) {
          if (me.lastTapTime && new Date().getTime() - me.lastTapTime < 500 && me.lastTapHandle == i)
            me.edit(i, e);
          else 
            me.slide(i, e);
          me.lastTapHandle = i;
          me.lastTapTime = new Date().getTime();
        });
        var handleSizeStyle = (handleSize - 4) + 'px';
        var handleBRadStyle = (handleSize / 2) + 'px';
        handle.setStyle({
           width: handleSizeStyle, 
           height: handleSizeStyle,
           MozBorderRadius: handleBRadStyle, 
           WebkitBorderRadius: handleBRadStyle, 
           borderRadius: handleBRadStyle
         });
        me.handles[i] = handle;
        div.insert(handle);
      } else {
        handle = me.handles[i];     
      }     
      handle.setStyle({left: (pxX - handleSize / 2 + 1) + 'px', top: ((height - pxY) - handleSize / 2 + 1) + 'px'});
    });
  },
  slide: function(i, e) {
    e.stop();
    var precision = 2;
    var me = this, doc = $(document);
    var q = me.questions[i];
    me.slideX = parseFloat(q.answer());
    me.slidePxX = e.clientX || e.changedTouches[0].clientX;
    $('page').setStyle({cursor: 'col-resize'});
    me.setHandleHighlight(i, true);
    var moveFunc = function(e) {
      e.stop();
      var newX = me.slideX + ((e.clientX || e.changedTouches[0].clientX) - me.slidePxX) / me.xfactor;
      q.answer(me.truncateX(newX, i));
      me.draw();
    }
    doc.observe('mousemove', moveFunc);
    if (me.iOS) doc.observe('touchmove', moveFunc);
    var upFunc = function(e) { 
      doc.stopObserving('mousemove');
      if (me.iOS) doc.stopObserving('touchmove');
      $('page').setStyle({cursor: 'default'});
      me.setHandleHighlight(i, false);
    }
    doc.observe('mouseup', upFunc);
    if (me.iOS) {
      doc.observe('touchend', upFunc);
      doc.observe('touchcancel', upFunc);
    }
  },
  edit: function(i, e) {
    e.stop();
    var q = this.questions[i];
    var a = q.answer();
    this.setHandleHighlight(i, true);
    var newX = parseFloat(window.prompt('Enter the value of S for F(S) = ' + this.ys[i], a));
    if (! isNaN(newX)) {
      q.answer(this.truncateX(newX, i));
      this.draw();
    }
    this.setHandleHighlight(i, false);
  },
  truncateX: function(x, i) {  // fixes and formats x
    var minGap = 0, precision = 2;
    x = x.toFixed(precision);
    if (i > 0) x = Math.max(x, parseFloat(this.questions[i - 1].answer()) + minGap);
    if (i < this.questions.length - 1) x = Math.min(x, parseFloat(this.questions[i + 1].answer()) - minGap);
    x = Math.max(x, this.xMin);
    x = Math.min(x, this.xMax);
    x = x.toFixed(precision);  // sometimes ends .XX99999999999 or .XX000000001 otherwise
    xStr = x + '';
    xStr = xStr.replace(/[.]0+$/, '').replace(/([.][0-9]+)0+$/, '$1');  // eliminate trailing zeroes
    return xStr;
  },
  setHandleHighlight: function(i, h) {  // h = true if highlighted
    this.handles[i].setStyle({background: h ? '#ff0' : '#fff'});
    this.xLabs[i].setStyle({fontWeight: h ? 'bold' : 'normal'});
    this.yLabs[i].setStyle({fontWeight: h ? 'bold' : 'normal'});
  },
  point: function(question, y) {
    this.questions.push(question);
    this.ys.push(y);
  }
});
