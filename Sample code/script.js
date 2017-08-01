var totSearch = [];
var totSuggestions = [];
var deletedTerm;
var stringQuery;

function splitTerms() {
	delQuery(false, totSearch);
	//function run on submit that parses and splits terms into a JSON object
	//grabs from search bar and puts that into wholeQuery 
	//clears all divs  
	splitText = document.getElementsByName("searchBar")[0].value.split(",");

	for (i = 0; i < splitText.length; i++) { //splits terms up between ',' signs 

		wholeQuery[i] = splitText[i].split(" ");
		//remembers all the divs created so it can clear them later
	}
	searchTerms();
}

function updateSearch() {

	stringQuery = "";
	if (wholeQuery.length > 0) {
		i = 0;
		while (i < wholeQuery.length - 1) {

			stringQuery += wholeQuery[i].join(' ') + ", ";
			i++;
		}
		stringQuery += wholeQuery[i].join(' ');
		document.getElementById('sTerms').innerText = stringQuery;
	}
}

function searchTerms() { //searches your combonation of terms from the wholeQuery variable


	for (i = 0; i < wholeQuery.length; i++) { //splits terms by spaces

		makeDiv(wholeQuery[i].join(' '), 'queryTerms', totSearch);

	}
	updateSearch();

}

function makeDiv(term, location, list) {

	var newDiv = document.createElement("DIV");
	var newP = document.createElement('P');
	var removeIcon = document.createElement('I');


	document.getElementById(location).appendChild(newDiv);

	list.push(newDiv);


	newDiv.appendChild(newP);
	newDiv.appendChild(removeIcon);
	newDiv.addEventListener('click', function () {
		addTerms(event.target.firstChild.innerHTML);
	});


	newDiv.setAttribute('class', "query"); //sets up class for CSS
	newDiv.setAttribute('z-index', '10')
	newDiv.setAttribute('style', 'margin:3px;padding:3px;border-radius:5px;border:1px solid;overflow:hidden;display:flex;justify-content: space-between;');


	newP.innerHTML = term; //sets the text boxes to that of the search
	newP.setAttribute('style', 'float:left;margin:0px;');
	newP.addEventListener('click', function () {
		addTerms(this.innerHTML);
	});

	removeIcon.setAttribute('class', 'fa fa-minus-square');
	removeIcon.setAttribute('aria-hidden', 'true');
	removeIcon.setAttribute('style', 'display:inline-flex;');

	removeIcon.addEventListener("click", function () {
		delQuery(true, list);
	}, true); //sets remove icon 

}

function delQuery(self, list) {
	event.stopPropagation;
	//if self is ture it deletes itself and renumbers the divs
	//if false it deletes the entire list

	if (list == totSearch) {

		if (self == false || wholeQuery.length == 1) {
			document.getElementById('queryTerms').innerHTML = '';
			totSearch = [];
			wholeQuery = [];
			splitText = '';
			document.getElementById('sTerms').innerHTML = '';

		} else if (event.target == document.getElementById('submitNewSearch')) {
			//
		} else {
			var i = 0;
			while (event.currentTarget.parentElement != totSearch[i]) {

				i++;
			}

			wholeQuery.splice(i, 1);
			event.target.parentElement.parentElement.removeChild(event.currentTarget.parentElement);
			totSearch.splice(i, 1);

		}
	} else if (event.target.parentElement.parentElement == document.getElementById('sugTerms')) {
		for (i = 0; i < list.length; i++) {
			if (list[i] == event.target.parentElement) {
				list[i].parentElement.removeChild(list[i]);
			} else if (i == list.length) {
				console.log('error in delQuery');
			}
		}


	}
	deletedTerm = event.target;
	updateSearch();
}

function addTerms(term) { //adds one of the clickable suggestion boxes to the search
	event.stopPropagation;
	var add = true;
	var tempTerm = [];
	if (deletedTerm == event.target) {
		deletedTerm = "";
	} else {

		for (i = 0; i < totSearch.length; i++) totSearch[i].parentElement.removeChild(totSearch[i]);

		totSearch = []; //removes the previous search items
		tempTerm[0] = term;
		//	if (typeof term != typeof "") term = event.target.firstElementChild.innerHTML.split(' ');


		for (j = 0; j < wholeQuery.length; j++) //checks to see if the clicked item is already a part of the search
			if (term == wholeQuery[j].toString() || term == deletedTerm) {

				add = false;
			};


		if (add == true) {
			wholeQuery.push(tempTerm);
		}
	}
	searchTerms();
}