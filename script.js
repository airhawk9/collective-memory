var totSearch = [];
var totSuggestions = [];
var deletedTerm;
var stringQuery;

function splitTerms(search) {
	deliQuery(false, totSearch);
	wholeQuery = [];
	//function run on submit that parses and splits terms into a JSON object
	//grabs from search bar and puts that into wholeQuery 
	//clears all divs  
	splitText = search.split(',')

	for (i = 0; i < splitText.length; i++) { //splits terms up between ',' signs 

		wholeQuery[i] = splitText[i].split(" ");
		//remembers all the divs created so it can clear them later
	}
	searchTerms();
}

function updateSearch() {
	//updates the area that displays what terms you've searched

	stringQuery = "";
	if (wholeQuery.length > 0) {
		i = 0;
		while (i < wholeQuery.length - 1) {

			stringQuery += wholeQuery[i].join(' ') + ", ";
			i++;
		}
		stringQuery += wholeQuery[i].join(' ');
		document.getElementById('termsDisplay').innerText = stringQuery;
	} else {
		document.getElementById('termsDisplay').innerText = '';
	}
}

function searchTerms() { //searches your combonation of terms from the wholeQuery variable


	for (i = 0; i < wholeQuery.length; i++) { //splits terms by spaces

		makeDiv(wholeQuery[i].join(' '), 'queryTerms', totSearch);

	}
	updateSearch();
	document.getElementById('sTerms').setAttribute('style', "background-color: " + getRandomColor() + ';');

}

function makeDiv(term, location, list) {
	term = term.replace(/(\r\n|\n|\r)/gm, "");

	var newDiv = document.createElement("DIV");
	var removeIcon = document.createElement('I');

	if (term == "") {} else {

		document.getElementById(location).appendChild(newDiv);

		list.push(newDiv);



		newDiv.addEventListener('click', function () {
			addTerms(event.target.innerText.replace(/\r?\n|\r/, "").split(' '));
		});

		newDiv.innerHTML = term; //sets the text boxes to that of the search
		newDiv.setAttribute('class', "query"); //sets up class for CSS
		newDiv.setAttribute('style', 'margin:3px;padding:3px;border-radius:5px;border:1px solid;overflow:hidden;display:flex;justify-content: space-between;');
		newDiv.appendChild(removeIcon);




		removeIcon.setAttribute('class', 'fa fa-minus-square');
		removeIcon.setAttribute('aria-hidden', 'true');
		removeIcon.setAttribute('style', 'float:right;display:inline;');

		removeIcon.addEventListener("click", function () {
			deliQuery(true, totSearch);
		}, true); //sets remove icon 

	}
}

function deliQuery(self, list) {
	event.stopPropagation;
	if (self == false) {
		while (list.length > 0) {
			list[0].parentElement.removeChild(list[0]);
			list.splice(0, 1);
		}
	} else {

		for (i = 0; i < list.length; i++) {
			if (list[i] == event.target.parentElement) {
				list.splice(i, 1);
				if (list == totSearch)
					wholeQuery.splice(i, 1);
			}
		}
		event.target.parentElement.parentElement.removeChild(event.target.parentElement);
	}
	deletedTerm = event.target;
	updateSearch();
}

function addTerms(term) { //adds a word to the search
	var add = true;
	var tempTerm = [];
	if (deletedTerm == event.target) {

	} else if (term != "" && term != undefined && event.target.parentElement != document.getElementById("queryTerms")) {

		for (i = 0; i < totSearch.length; i++) totSearch[i].parentElement.removeChild(totSearch[i]);

		totSearch = []; //removes the previous search items
		//	if (typeof term != typeof "") term = event.target.firstElementChild.innerHTML.split(' ');


		for (j = 0; j < wholeQuery.length; j++) //checks to see if the clicked item is already a part of the search
			if (term == wholeQuery[j].toString() || term == deletedTerm) {

				add = false;
			};


		if (add == true) {
			if (event.target.parentElement != document.getElementById("queryTerms") && event.target.parentElement.parentElement != document.getElementById('sBar'))
				event.target.parentElement.removeChild(event.target);
			splitTerms(stringQuery + ',' + term);
		}
		updateSearch();
	}

}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}