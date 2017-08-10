var coordinates = [[0.0, 0.0]];
var aniID;
var speedX;
var posX;
var speedY;
var posY;
var str;
var speedMultiplier = 1; // percent of speedX/Y reduced, compared to percent off
var percentOff = 0.8; //multiplier between ticks
var style;
var offset;

function drag(ev) {
	style = window.getComputedStyle(ev.target, null);
	str = (parseInt(style.getPropertyValue("left")) - ev.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - ev.clientY) + ',' + ev.target.id;
	ev.dataTransfer.setData("Text", str);
	coordinates = [[ev.clientX, ev.clientY]];
	coordinates[1] = [ev.clientX, ev.clientY];
}

function drop(ev) {
	offset = event.dataTransfer.getData("Text").split(',');
	dm = document.getElementById(offset[2]);
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
	newDiv.setAttribute('class', 'folder')

}

function slide(ev) {
	if (speedMultiplier == 1) {
		var startMulti = .3;
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
	if (speedMultiplier < .1) {
		cancelAnimationFrame(aniID);
		speedMultiplier = 1;
	} else {
		aniID = requestAnimationFrame(slide);

	}


}