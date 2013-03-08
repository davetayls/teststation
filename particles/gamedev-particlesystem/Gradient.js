function Gradient(colors){
    this.colors = colors;
}
Gradient.prototype = {

    getColor: function(percent) {
        //Floating point color location within the array
        var colorF = percent * (this.colors.length - 1);

        //Round down; this is the specified color in the array
        //below our current color
        var color1 = parseInt(colorF, 10);
        //Round up; this is the specified color in the array
        //above our current color
        var color2 = parseInt(colorF + 1, 10);

        //Interpolate between the two nearest colors (using above method)
        return this.colors[color1].interpolate(
                (colorF - color1) / (color2 - color1),
                this.colors[color2]
            );
    }
};