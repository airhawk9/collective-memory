var coordinates = [[0.0, 0.0]];
var aniID;
var speedX;
var posX = 0;
var speedY;
var posY = 0;
var str;
var speedMultiplier = 1; // percent of speedX/Y reduced, compared to percent off
var percentOff = 0.95; //multiplier between ticks
var startMulti = .2; //sets how much the initial speed with be, multiplies itself by the difference in coordinates
var style;
var offset;
var zoomLevel = 1;

function drag(ev) {
	style = window.getComputedStyle(ev.target, null);
	str = (parseInt(style.getPropertyValue("left")) - ev.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - ev.clientY) + ',' + ev.target.id;
	ev.dataTransfer.setData("Text", str);
	coordinates = [[ev.clientX, ev.clientY]];
	coordinates[1] = [ev.clientX, ev.clientY];
	offset = event.dataTransfer.getData("Text").split(',');
	dm.style.left = (ev.clientX + parseInt(offset[0], 10)) + 'px';
	dm.style.top = (ev.clientY + parseInt(offset[1], 10)) + 'px';
}

function drop(ev) {
	offset = event.dataTransfer.getData("Text").split(',');
	dm.style.left = (ev.clientX + parseInt(offset[0], 10)) + 'px';
	dm.style.top = (ev.clientY + parseInt(offset[1], 10)) + 'px';
	ev.preventDefault();
	slide(ev);
	return false;
}

function drag_over(ev) {
	if (coordinates.length > 10)
		coordinates.splice(0, 1);
	coordinates.push([ev.clientX, ev.clientY]);

	ev.preventDefault();
	return false;
}

function folder() {
	var newDiv = document.createElement('div');
	newDiv.setAttribute('class', 'folder');
}

function zoom(ev, out) { // if out is false then it zooms in
	var scale = 1;
	var width = dm.offsetWidth - 4;
	var height = dm.offsetHeight - 4;

	if (out == false) {
		zoomLevel++;
		scale = .5;
		width /= 2;
		height /= 2;

	} else {
		zoomLevel--;
		scale = 2;
		width *= 2;
		height *= 2;
	}
	dm.style.transition = 'all 2s';
	dm.style.transform = 'scale(' + scale + ',' + scale + ')';
	posX = parseInt(dm.style.left, 10);
	posY = parseInt(dm.style.top, 10);
	setTimeout(function () {
		dm.style.transition = 'all 0s';
	}, 2000);

}

function slide(ev) {
	if (speedMultiplier == 1) {

		speedX = (coordinates[coordinates.length - 1][0] - coordinates[0][0]) * startMulti;
		posX = parseInt(dm.style.left, 10);
		speedY = (coordinates[coordinates.length - 1][1] - coordinates[0][1]) * startMulti;
		posY = parseInt(dm.style.top, 10);
	}
	posX += speedX;
	posY += speedY;
	dm.style.left = posX + 'px';
	dm.style.top = posY + 'px';

	speedX *= percentOff;
	speedY *= percentOff;
	speedMultiplier *= percentOff;
	if (Math.abs(speedX) + Math.abs(speedY) < .3) {
		cancelAnimationFrame(aniID);
		speedMultiplier = 1;
	} else {
		aniID = requestAnimationFrame(slide);

	}

}