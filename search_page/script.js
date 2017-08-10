var coordinates = [[0, 0]];

function drag(ev) {
	var style = window.getComputedStyle(ev.target, null);
	var str = (parseInt(style.getPropertyValue("left")) - ev.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - ev.clientY) + ',' + ev.target.id;
	ev.dataTransfer.setData("Text", str);
	coordinates[1] = [ev.clientX, ev.clientY];
}

function drop(ev) {
	var offset = event.dataTransfer.getData("Text").split(',');
	var dm = document.getElementById(offset[2]);
	dm.style.left = (ev.clientX + parseInt(offset[0], 10)) + 'px';
	dm.style.top = (ev.clientY + parseInt(offset[1], 10)) + 'px';
	ev.preventDefault();
	slide();
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

function slide() {

}