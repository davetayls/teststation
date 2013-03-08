function Gradient(colors) {
	this.colors = colors;
}

Gradient.prototype.getColor = function(percent) {
	var colorF = percent * (this.colors.length - 1);

	var color1 = parseInt(colorF);
	var color2 = parseInt(colorF + 1);

	return this.colors[color1].interpolate((colorF - color1) / (color2 - color1),
			this.colors[color2]);
};
