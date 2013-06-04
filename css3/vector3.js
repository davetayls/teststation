
function Vector3(x, y, z){

  this.x  = x;
  this.y  = y;
  this.z  = z;

}
Vector3.prototype = {
    join: function(s){
        return [
            this.x,
            this.y,
            this.z
        ].join(s);
    },
    copy: function(v){
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
    }
};

