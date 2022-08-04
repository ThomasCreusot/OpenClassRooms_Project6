//Vanilla javascript asked for the project


//CONSTANCES AND VARIABLES
const numberOfMoviesOnAnAPIPage = 5
const numberOfMoviesInACaroussel = 7
const numberOfMoviesDisplayedInACaroussel = 4



//========== You can change the chosen categories here =========//
let threeCategories = ["action", "comedy", "fantasy"]     		//
																//
// table format choice: reference is passed, not only the value //
let CarousselLag_value_bestMovies = [0]                         //
let CarousselLag_value_category1 = [0]                          //
let CarousselLag_value_category2 = [0]                          //
let CarousselLag_value_category3 = [0]                          //
//==============================================================//


//HTML elements
let element_bestMovie_buttonLeft = document.getElementById("best-movie_button-left"); 
let element_bestMovie_buttonRight = document.getElementById("best-movie_button-right"); 

let element_category1_buttonLeft = document.getElementById("category1_button-left"); 
let element_category1_buttonRight = document.getElementById("category1_button-right"); 

let element_category2_buttonLeft = document.getElementById("category2_button-left"); 
let element_category2_buttonRight = document.getElementById("category2_button-right"); 

let element_category3_buttonLeft = document.getElementById("category3_button-left"); 
let element_category3_buttonRight = document.getElementById("category3_button-right"); 


//FUNCTIONS
function bestMovieFetching() {
	//Recuperation of data related to the best movie, and within the .then() of the fetch : replacement fo title and picture (html) + calling openModalBox() by filling movie data

	//GET request with Fetch
	fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score") //API documentation: sort_by=<field> or sort_by=-<field> 

	//Promises: if solved : execution of the next .then() function, if not solved :  execution of the next .catch()
	.then(function(res) {
		if (res.ok) {
			//Recupération of json for the next .then()
			return res.json();
		}
	})

	.then(function(value) { //value is fetch result at json format
		//TITLE: Association of the best movie title to the corresponding HTML balise 
		document.getElementById("bestMovie_Title").textContent = value.results[0].title //results[0] : first movie is the best one
		//IMAGE
		const img = document.getElementById("bestMovie_Picture")
		img.src  = value.results[0].image_url
		img.height = "400" //defined in the CSS ; part .best-movie-container

		//Movie URL recuperation for the next then()
		return value.results[0].url 
	})

	.then(function(bestMovieUrl) {
		
		fetch(bestMovieUrl)
		
		//Check wicth res.ok that we got the data from http://127.0.0.1:8000/api/v1/titles/1508669 (URL of the best movie)
		.then(function(res) {
			if (res.ok) {
				//Recupération of json for the next .then()
				return res.json();
			}
		})
		
		.then(function(value) {
			//SUMMARY : Association of the best movie summary to the corresponding HTML balise 
			document.getElementById("bestMovie_Summary").textContent = value.description 

			//value = json with all data related to the movie : used for the modal box
			openModalBox(value)
		})
	})
	
	.catch(function(err) {
		console.log("ERROR in bestMovieFetching() function") // This code is executed if an error happenned
	});
}


async function MultiFetchingForACategory(CarousselLag, genreToFetch, prefix_of_the_HtmlElements_IDs_for_a_category_carroussel){ // genre = "" --> all movies
	//Recuperation of ... TO BE DONE

	let movies_JS_objects_list = []
	
	let response = await Promise.all([ 
		//.then((value)=> value.json()) corresponds to :
			//.then(function(res) {
			//	if (res.ok) {
			//		return res.json();
			//	}
			//})
		
		fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre="+genreToFetch)
		.then((value)=> value.json())
		.catch(function(err) {console.log("ERROR in MultiFetchingForACategory() function")})
		, 
		fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre="+genreToFetch+"&page=2")
		.then((value)=> value.json())
		.catch(function(err) {console.log("ERROR in MultiFetchingForACategory() function")})
	])
	//TESTS
	//console.log(response) 
	//console.log(response[0].results)
	//console.log(response[0].results[0])
	//console.log(response[0].results[1])
	//console.log(response[1].results) 

	//For each element in 'response' (=each API page which has been fetched), and for each element in each API page which has been fetched (=results related to a movie): unshifting the table
	for (let i in response){
		//console.log(i) // for each API page which has been fetched
		for (let j in response[i].results){
			//console.log("page "+i+" movie "+j) // for each movie of each API page which has been fetched
			movies_JS_objects_list.unshift(response[i].results[j])
		}
	}

	//Movies are sorted according to their imdb score
	movies_JS_objects_list.sort((a, b) => a.imdb_score - b.imdb_score)
	movies_JS_objects_list.reverse()

	//Caroussel pictures
	carousselPicturesUpdate(CarousselLag, prefix_of_the_HtmlElements_IDs_for_a_category_carroussel, movies_JS_objects_list) //il y a un truc pas logique ici : movies_JS_object n'est pas utilisé??
		
	//test
	//console.log(movies_JS_objects_list) 
}


function carousselPicturesUpdate(CarousselLag, prefix_of_the_HtmlElements_IDs_for_a_category_carroussel, category_movies_JS_objects_list){
	//Replaces pictures of a given caroussel, according to a given CarousselLag 

	for (let PicturePositionInCarroussel = 0; PicturePositionInCarroussel < numberOfMoviesDisplayedInACaroussel ; PicturePositionInCarroussel++){ //numberOfMoviesDisplayedInACaroussel = 4 
		let JS_movie_picture = document.getElementById(`${prefix_of_the_HtmlElements_IDs_for_a_category_carroussel}${PicturePositionInCarroussel}`); // --> we are looking for best-movie_picture0, best-movie_picture1, etc
		JS_movie_picture.src = category_movies_JS_objects_list[PicturePositionInCarroussel+CarousselLag].image_url

		//The URL of movie is recorded in the HTML balise <img> (.alt attribute) ; this will be useful for fetching data when oppening the modal window 
		JS_movie_picture.alt = category_movies_JS_objects_list[PicturePositionInCarroussel+CarousselLag].url
	}
}


function carousselLeftAndRightsButtons_eventListeners(button_element, caroussel_value_table, category_name, category_html_elements_prefix){
	//carroussel scrolling : when button_element is pressed, caroussel_value_table[0] is modificated and MultiFetchingForACategory is called 
	button_element.addEventListener("click", function(event){
		if (button_element.id.includes("left") && caroussel_value_table[0] > 0){
			caroussel_value_table[0] -= 1
			MultiFetchingForACategory(caroussel_value_table[0], category_name, category_html_elements_prefix)
			}
		else if (button_element.id.includes("right") && caroussel_value_table[0] < numberOfMoviesInACaroussel - numberOfMoviesDisplayedInACaroussel){
			caroussel_value_table[0] += 1
			MultiFetchingForACategory(caroussel_value_table[0], category_name, category_html_elements_prefix)
			}
	})
}


function openModalBoxFromCarrousselPictures(){
	//Source : https://www.w3schools.com/howto/howto_css_modals.asp
	// Get the modal
	let CarrousselHtmlElementModal = document.getElementById("CarrousselModalBox");

	// Get the pictures that open the modal, based on their class name
	let HtmlElementPicturesOppeningTheModalBox_List = document.getElementsByClassName("movie-picture"); //Returns a list of elements 
	for (let HtmlElementPictureOppeningTheModalBox of HtmlElementPicturesOppeningTheModalBox_List){
		
		// When the user clicks on the picture, fetch to get movie data and open the modal
		HtmlElementPictureOppeningTheModalBox.onclick = function() {
			
			fetch(HtmlElementPictureOppeningTheModalBox.alt) 
			.then(function(res) {
				if (res.ok) {
					//Recupération of json for the next .then()
					return res.json();
				}
			})
			.then(function(movieData) { //movieData is fetch result at json format
				console.log(movieData)

				let Carroussel_HtmlElement_Modal_moviePicture = document.getElementById("CarrousselModal-content_movie-picture"); //L’image de la pochette du film : 'image_url' -> url 
				Carroussel_HtmlElement_Modal_moviePicture.src = movieData.image_url

				let Carroussel_HtmlElement_Modal_title = document.getElementById("CarrousselModal-content_title");//Le Titre du film : 'title' -> string
				Carroussel_HtmlElement_Modal_title.textContent = "TITLE: " + movieData.title 
			
				let Carroussel_HtmlElement_Modal_genres = document.getElementById("CarrousselModal-content_genres"); //Le genre complet du film : 'genres' -> [] 
				Carroussel_HtmlElement_Modal_genres.textContent = "GENRES: " + movieData.genres
			
				let Carroussel_HtmlElement_Modal_datePublished = document.getElementById("CarrousselModal-content_date_published"); //Sa date de sortie : 'date_published' -> string 
				Carroussel_HtmlElement_Modal_datePublished.textContent = "DATE PUBLISHED: " + movieData.date_published
			
				let Carroussel_HtmlElement_Modal_rated = document.getElementById("CarrousselModal-content_rated"); //Son Rated : 'rated' -> string 
				Carroussel_HtmlElement_Modal_rated.textContent = "RATED: " + movieData.rated
			
				let Carroussel_HtmlElement_Modal_imdbScore = document.getElementById("CarrousselModal-content_imdb_score"); //Son score Imdb : ''imdb_score' -> string 
				Carroussel_HtmlElement_Modal_imdbScore.textContent = "IMDB SCORE: " + movieData.imdb_score
			
				let Carroussel_HtmlElement_Modal_directors = document.getElementById("CarrousselModal-content_directors"); //Son réalisateur : 'directors' -> [] 
				Carroussel_HtmlElement_Modal_directors.textContent = "DIRECTORS: " + movieData.directors
			
				let Carroussel_HtmlElement_Modal_actors = document.getElementById("CarrousselModal-content_actors"); //La liste des acteurs : 'actors' -> []
				Carroussel_HtmlElement_Modal_actors.textContent = "ACTORS: " + movieData.actors
			
				let Carroussel_HtmlElement_Modal_duration = document.getElementById("CarrousselModal-content_duration"); //Sa durée : 'duration' -> integer 
				Carroussel_HtmlElement_Modal_duration.textContent = "DURATION: " + movieData.duration
			
				let Carroussel_HtmlElement_Modal_countries = document.getElementById("CarrousselModal-content_countries"); //Le pays d’origine : 'countries' -> [] 
				Carroussel_HtmlElement_Modal_countries.textContent = "COUNTRIES: " + movieData.countries
			
				let Carroussel_HtmlElement_Modal_worldwideGrossIncome = document.getElementById("CarrousselModal-content_worldwide_gross_income"); //Le résultat au Box Office : 'usa_gross_income' or 'worldwide_gross_income' ? -> integer ; 
				//I suppose worldwide_gross_income 
				Carroussel_HtmlElement_Modal_worldwideGrossIncome.textContent = "WORLDWIDE GROSS INCOME (box office result): " + movieData.worldwide_gross_income
			
				let Carroussel_HtmlElement_Modal_longDescription = document.getElementById("CarrousselModal-content_long_description"); //Le résumé du film : 'description' or 'long_description' ? -> string ; 
				//I suppose 'long_description'
				Carroussel_HtmlElement_Modal_longDescription.textContent = "LONG DESCRIPTION (movie summary): " + movieData.long_description
			})
			.catch(function(err) {
				console.log("ERROR in openModalBoxFromCarrousselPictures() function") // This code is executed if an error happenned
			});
			
			CarrousselHtmlElementModal.style.display = "block";
		}
		
	// Get the <span> element that closes the modal
	let CarrousselSpan = document.getElementsByClassName("CarrousselCloseTheModalSpan")[0];

	// When the user clicks on <span> (x), close the modal
	CarrousselSpan.onclick = function() {
		CarrousselHtmlElementModal.style.display = "none";
	}
	
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == CarrousselHtmlElementModal) {
			CarrousselHtmlElementModal.style.display = "none";
			}
		} 
	}
}


function CategoryTitleInitialisation(categoryName, categoryIndex){
	//Replaces 'categorie1' by the name of the category (e.g. 'action') 
	let htmlElement_categoryTitle = document.getElementById(`category${categoryIndex}_title`)
	htmlElement_categoryTitle.textContent = categoryName
}


function carrousselInitialisation(){
	//Initialises the carroussel 
	CategoryTitleInitialisation(threeCategories[0].charAt(0).toUpperCase() + threeCategories[0].slice(1), 1)
	CategoryTitleInitialisation(threeCategories[1].charAt(0).toUpperCase() + threeCategories[1].slice(1), 2) 
	CategoryTitleInitialisation(threeCategories[2].charAt(0).toUpperCase() + threeCategories[2].slice(1), 3) 

	MultiFetchingForACategory(CarousselLag_value_bestMovies[0], "", "best-movie_picture")
	MultiFetchingForACategory(CarousselLag_value_category1[0], threeCategories[0], "category1_picture")
	MultiFetchingForACategory(CarousselLag_value_category2[0], threeCategories[1], "category2_picture")
	MultiFetchingForACategory(CarousselLag_value_category3[0], threeCategories[2], "category3_picture")
}

function carrousselScrolling(){
	//Calls the functions allowing carroussel scrolling for each carroussel

	carousselLeftAndRightsButtons_eventListeners(element_bestMovie_buttonLeft, CarousselLag_value_bestMovies, "", "best-movie_picture")
	carousselLeftAndRightsButtons_eventListeners(element_bestMovie_buttonRight, CarousselLag_value_bestMovies, "", "best-movie_picture")

	carousselLeftAndRightsButtons_eventListeners(element_category1_buttonLeft, CarousselLag_value_category1, threeCategories[0], "category1_picture")
	carousselLeftAndRightsButtons_eventListeners(element_category1_buttonRight, CarousselLag_value_category1, threeCategories[0], "category1_picture")

	carousselLeftAndRightsButtons_eventListeners(element_category2_buttonLeft, CarousselLag_value_category2, threeCategories[1], "category2_picture")
	carousselLeftAndRightsButtons_eventListeners(element_category2_buttonRight, CarousselLag_value_category2, threeCategories[1], "category2_picture")

	carousselLeftAndRightsButtons_eventListeners(element_category3_buttonLeft, CarousselLag_value_category3, threeCategories[2], "category3_picture")
	carousselLeftAndRightsButtons_eventListeners(element_category3_buttonRight, CarousselLag_value_category3, threeCategories[2], "category3_picture")
}


function openModalBox(JsonDict_MovieAllData){
	//Source : https://www.w3schools.com/howto/howto_css_modals.asp
	// Get the modal
	let HtmlElementModal = document.getElementById("ModalBox");

	// Get the button that opens the modal
	let HtmlElementButtonOppeningTheModalBox = document.getElementById("bestMovieModalButton"); 
	
	// Get the <span> element that closes the modal
	let span = document.getElementsByClassName("closeTheModalSpan")[0];
	
	// When the user clicks on the button, open the modal
	HtmlElementButtonOppeningTheModalBox.onclick = function() {
		HtmlElementModal.style.display = "block";
	}
	
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		HtmlElementModal.style.display = "none";
	}
	
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == HtmlElementModal) {
			HtmlElementModal.style.display = "none";
			}
		} 

	let HtmlElement_Modal_moviePicture = document.getElementById("modal-content_movie-picture"); //L’image de la pochette du film : 'image_url' -> url 
	HtmlElement_Modal_moviePicture.src = JsonDict_MovieAllData.image_url

	let HtmlElement_Modal_title = document.getElementById("modal-content_title");//Le Titre du film : 'title' -> string
	HtmlElement_Modal_title.textContent = "TITLE: " + JsonDict_MovieAllData.title // IT WOOOOORKS !

	let HtmlElement_Modal_genres = document.getElementById("modal-content_genres"); //Le genre complet du film : 'genres' -> [] 
	HtmlElement_Modal_genres.textContent = "GENRES: " + JsonDict_MovieAllData.genres

	let HtmlElement_Modal_datePublished = document.getElementById("modal-content_date_published"); //Sa date de sortie : 'date_published' -> string 
	HtmlElement_Modal_datePublished.textContent = "DATE PUBLISHED: " + JsonDict_MovieAllData.date_published

	let HtmlElement_Modal_rated = document.getElementById("modal-content_rated"); //Son Rated : 'rated' -> string 
	HtmlElement_Modal_rated.textContent = "RATED: " + JsonDict_MovieAllData.rated

	let HtmlElement_Modal_imdbScore = document.getElementById("modal-content_imdb_score"); //Son score Imdb : ''imdb_score' -> string 
	HtmlElement_Modal_imdbScore.textContent = "IMDB SCORE: " + JsonDict_MovieAllData.imdb_score

	let HtmlElement_Modal_directors = document.getElementById("modal-content_directors"); //Son réalisateur : 'directors' -> [] 
	HtmlElement_Modal_directors.textContent = "DIRECTORS: " + JsonDict_MovieAllData.directors

	let HtmlElement_Modal_actors = document.getElementById("modal-content_actors"); //La liste des acteurs : 'actors' -> []
	HtmlElement_Modal_actors.textContent = "ACTORS: " + JsonDict_MovieAllData.actors

	let HtmlElement_Modal_duration = document.getElementById("modal-content_duration"); //Sa durée : 'duration' -> integer 
	HtmlElement_Modal_duration.textContent = "DURATION: " + JsonDict_MovieAllData.duration

	let HtmlElement_Modal_countries = document.getElementById("modal-content_countries"); //Le pays d’origine : 'countries' -> [] 
	HtmlElement_Modal_countries.textContent = "COUNTRIES: " + JsonDict_MovieAllData.countries

	let HtmlElement_Modal_worldwideGrossIncome = document.getElementById("modal-content_worldwide_gross_income"); //Le résultat au Box Office : 'usa_gross_income' or 'worldwide_gross_income' ? -> integer ; 
	//I suppose worldwide_gross_income 
	HtmlElement_Modal_worldwideGrossIncome.textContent = "WORLDWIDE GROSS INCOME (box office result): " + JsonDict_MovieAllData.worldwide_gross_income

	let HtmlElement_Modal_longDescription = document.getElementById("modal-content_long_description"); //Le résumé du film : 'description' or 'long_description' ? -> string ; 
	//I suppose 'long_description'
	HtmlElement_Modal_longDescription.textContent = "LONG DESCRIPTION (movie summary): " + JsonDict_MovieAllData.long_description
}


function main(){
	bestMovieFetching()
	//openModalBox() for the best movie is called within bestMovieFetching()

	carrousselInitialisation()

	carrousselScrolling()

	openModalBoxFromCarrousselPictures()
}

main()
