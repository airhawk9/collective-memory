var totSearch = []; //stores the divs that the search terms are displayed in for deletion
var totSuggestions = []; //stores the divs that the suggested terms are displayed in for deletion
var deletedTerm; // remembers the last term deleted for buy fix purposes
var stringQuery; // the query represented as a string
var contentItems = []; //stores the divs that the content item are displayed in for deletion purposes

/*
this is the main javascript file run on every page
allows the capturing of the users choice of search terms and easy editing of the query



*******SPLIT TERMS**********

Split terms takes the search parameter (in string form) and parses 
the string out between spaces and commas, spaces seperating words
and commas seperating phrases. It then runs the search terms function to create the divs
*/


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

/*
*********UPDATE SEARCH***********

Refreshes the search display from the wholeQuery variable 
and updates the stringQuery variable in the document

*/

function updateSearch() {

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

/*
*********SEARCH TERMS**********

Creates the divs from the whole query variable 
clears the previous terms
*/

function searchTerms() {


	for (i = 0; i < wholeQuery.length; i++) { //splits terms by spaces

		makeRemoveIcon(makeDiv(wholeQuery[i].join(' '), 'queryTerms', totSearch), totSearch);

	}
	updateSearch();
	document.getElementById('sTerms').setAttribute('style', "background-color: " + getRandomColor() + ';');
	clearContent();
	makeRemoveIcon(populateContent(), contentItems);
}

/*
********MAKE DIV**********

Makes a div with a term, location, and list
the term is displayed in the div
the location is what div it will be placed in
the list is what list stores it's location for deletion
*/

function makeDiv(term, location, list) {
	term = term.replace(/(\r\n|\n|\r)/gm, "");

	var newDiv = document.createElement("DIV");

	if (term == "") {} else {

		document.getElementById(location).appendChild(newDiv);

		list.push(newDiv);

		newDiv.addEventListener('click', function () {
			addTerms(event.target.innerText.replace(/\r?\n|\r/, "").split(' '));
		});

		newDiv.innerHTML = term; //sets the text boxes to that of the search
		newDiv.setAttribute('class', "query"); //sets up class for CSS
		newDiv.setAttribute('style', 'margin:3px;padding:3px;border-radius:5px;border:1px solid;overflow:hidden;display:flex;justify-content: space-between;');

	}
	return newDiv;
}

/*
*********MAKE REMOVE ICON**********

adds a remove icon to an element
stores that element in a list for deletion
actual deletion function is deliQuery
*/

function makeRemoveIcon(div, list) {
	var removeIcon = document.createElement('I');
	removeIcon.setAttribute('class', 'fa fa-minus-square');
	removeIcon.setAttribute('aria-hidden', 'true');
	removeIcon.setAttribute('style', 'float:right;display:inline;');
	div.appendChild(removeIcon);
	removeIcon.addEventListener("click", function () {
		deliQuery(true, list);
	}, true); //sets remove icon 

}

/*
***********DELI QUERY**********

delete function for any lists of elements
can delete itself or a whole array
list refers to the list that the element was stored in
*/

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

/*
**********ADD TERMS***********

adds a term to the query
called in the suggestion boxes and the add term button
always adds to the whole query variable and updates the search
*/

function addTerms(term) { //adds a word to the search
	var add = true;
	var tempTerm = [];
	if (deletedTerm == event.target) {

	} else if (term != "" && term != undefined && event.target.parentElement != document.getElementById("queryTerms") && term != 'undefined') {

		for (i = 0; i < totSearch.length; i++) totSearch[i].parentElement.removeChild(totSearch[i]);

		totSearch = []; //removes the previous search items
		//	if (typeof term != typeof "") term = event.target.firstElementChild.innerHTML.split(' ');


		for (j = 0; j < wholeQuery.length; j++) //checks to see if the clicked item is already a part of the search
			if (term == wholeQuery[j].toString() || term == deletedTerm) {

				add = false;
			};


		if (add == true) {
			if (event.target.parentElement != document.getElementById("queryTerms") && event.target.parentElement.parentElement != document.getElementById('sBar') && event.target.isSameNode(document.createElement('button')))
				event.target.parentElement.removeChild(event.target);
			splitTerms(stringQuery + ',' + term);
		} else searchTerms();

	}
	updateSearch();

}

/*
*********POPULATE CONNTENT***********

adds a content div
has an image and text
will have an <a> tag and link to the full page as this just displays a short excerpt
*/

function populateContent( /*source, imageURL*/ ) {
	var source = '';
	imageURL = "/test_assets/test2.jpg";
	var newDiv = document.createElement('div');
	var newP = document.createElement('p');
	var newImg = document.createElement('img');
	var removeIcon = document.createElement('I');

	newDiv.setAttribute('class', 'content borderRad');
	newDiv.appendChild(newP);
	newDiv.appendChild(newImg);

	newImg.src = imageURL;
	newP.setAttribute('src', 'source');

	document.getElementById('contentWrapper').appendChild(newDiv);
	contentItems.push(newDiv);
	return newDiv;


}

/*
**********CLEAR CONTENT**********
clears the content completely
might be able to switch to deli query
*/

function clearContent(delSelf) {

	for (i = 0; i < contentItems.length; i++) {
		document.getElementById('contentWrapper').removeChild(contentItems[i]);
	}
	contentItems = [];
}

/*
*********GET RANDOM COLOR*********
makes a random color
*/

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}