;(function() {
  Raphael.fn.addGuides = function() {
    this.ca.guide = function(g) {
      return {
        guide: g
      };
    };
    this.ca.offsets = function(offsets) {
      return {
        offsets: offsets
      };
    };
    this.ca.along = function(percent) {
      var g = this.attr("guide"),
          offsets = this.attr('offsets'),
          bBox = g.getBBox();
      var len = g.getTotalLength();
      var point = g.getPointAtLength(percent * len);
      var t = {
        transform: [
          "t",
          point.x + bBox.x + (offsets.x || 0),
          " ",
          point.y + bBox.y + (offsets.y || 0)
        ].join()
      };
      return t;
    };
  };
})();