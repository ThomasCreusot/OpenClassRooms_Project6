//Vanilla javascript asked for the project

const numberOfMoviesOnAnAPIPage = 5
const numberOfMoviesInACaroussel = 7
const numberOfMoviesDisplayedInACaroussel = 4



let CarousselLag_value_bestMovies = [0] // table: reference is passed, and not only the value --> for caroussel function
let CarousselLag_value_category1 = [0]
let CarousselLag_value_category2 = [0]
let CarousselLag_value_category3 = [0]



let element_bestMovie_buttonLeft = document.getElementById("best-movie_button-left"); // On récupère l'élément sur lequel on voudra agir
let element_bestMovie_buttonRight = document.getElementById("best-movie_button-right"); 

let element_category1_buttonLeft = document.getElementById("category1_button-left"); 
let element_category1_buttonRight = document.getElementById("category1_button-right"); 

let element_category2_buttonLeft = document.getElementById("category2_button-left"); 
let element_category2_buttonRight = document.getElementById("category2_button-right"); 

let element_category3_buttonLeft = document.getElementById("category3_button-left"); 
let element_category3_buttonRight = document.getElementById("category3_button-right"); 


//POUR L'IMAGE DU MEILLEUR FILM
//Récupérer le film qui a la meilleure note Imdb parmi tous les films
//-->récupérer son titre et le résumé du film
//-->remplacer l'HTML 'titre film' par le nom du film; pareil pour le résumé du film; pareil pour la photo

//POUR LES CARROUSSELS DES CATEGORIES
//Définir une fonction qui a partir d'une URL de catégorie:
//-Parcourt plusieurs pages en utilisant la valeur de 'next'
//Execute une autre fonction qui : Récupère les informations de chaque film et les enregistre dans un tableau 
//-Le tableau sera trié en fonction de la valeur de 'imdb_score' de chaque film
//Récupérer les 7 autres films les mieux notés (toutes catégories confondues, ou d'une catégorie donnée)

//Pour chaque film : fenetre modale, présente les infos : image, titre, genre, date... vérifier qu'on a tout.


//____________________________________________

//NOTES SUR LES FONCTIONS FETCH ET ASYNCHRONES

// Fetch va nous renvoyer une Promise. Pour faire simple : la Promise est un objet qui fournit 
// une fonction then qui sera exécutée quand le résultat aura été obtenu, et 
// une fonction catch qui sera appelée s’il y a une erreur qui est survenue lors de la requête
// rappel : à chaque promise : si c'est ok, le prochain bloc '.then' s'éxécute, sinon c'est le prochain bloc "catch" qui s'éxécute

//function fonctionDuCours(){
//fetch("https://mockbin.com/request")
//  .then(function(res) {
//    if (res.ok) {
//      return res.json(); //a promise
//    }
//  })
//  .then(function(value) {
// 		//Do something with value here    
//		return value; //a promise
//  .then(function(nextValue) {
// 		//Do something with nextValue here    
//  })
//  .catch(function(err) {
//    // Une erreur est survenue
//  });
//}

//Je ne m'en sors pas pour récupérer un résultat de fonction asynchrone, donc je décide d'enchainer les then().
//async function functionDuCoursQuiRecupDuFetch() {
//	const url = "https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1";
//	const response = await fetch(url);
//	return response;
//}
//myReturn = functionDuCoursQuiRecupDuFetch()
//console.table(myReturn.value) //je récupère une Promise et n'arrive pas à accéder à sa valeur.


//Cette promesse est en fait un objet Promise qui peut être  resolve  avec un résultat, ou  reject  avec une erreur.
//The Promise.resolve() function is the most concise way to create a fulfilled promise that contains the given value. 
//For example, suppose you wanted to create a promise that is fulfilled with the string 'Hello, World': 
//  const p = Promise.resolve('Hello, World');
//  const str = await p //plus tard dans le code 

//de ce que je comprends : avec async et await: meme si je récupère qqe chose de ma fetch, le return sera toujours une promise !; donc il faut TRAVAILLER LA DATA DANS LA THEN() DE LA FETCH()


//NOTE
//je garde la premiere notation pour vérifier le OK !
//le code suivante
//.then(function(res) {
//	if (res.ok) {
//		//Récupération du json pour la prochaine .then())
//		return res.json();
//	}
//})
//peut aussi s'écrire:
//.then(res => res.json())

//____________________________________________


function bestMovieFetching() {
	//Requete GET avec Fetch : tous les films de l'API triés selon dans l'ordre décroissant de leur score 
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

		//note: j'avais un fond décran de div, en fait ca ne marche pas
		//const img_method2_with_div = document.getElementById("BMC") //on est sur une DIV
		//img_method2_with_div.background = url(value.results[0].image_url)
		//-->apres reflexion, peut etre en utilisant img_method2_with_div.styles.background-image ?

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
			//RESUME : Association of the best movie summary to the corresponding HTML balise 
			document.getElementById("bestMovie_Summary").textContent = value.description 

			//value = json with all data related to the film : I use it for the modal box
			openModalBox(value)

		})
	})
	
	.catch(function(err) {
		console.log("ERROR in bestMovieFetching() function") // This code is executed if an error happenned
	});
}




//dernière idée/compréhension que j'ai : Définir une fonction qui fetch; l'éxécuter deux fois au sein de promise.all()
//on travaillera le tableau des résultats dans la fonction promise.all

//let movies_JS_objects_list = [] // // rôle : regrouper les données (tout) de films issus de plusieurs pages ; pour cela, je fois visiter l'url du film

//function get_best_movies_information_from_an_API_category_page_URL_in_a_list(CategoryUrlToBeFetched){
//
//	//console.log("Category Url To Be Fetched" + CategoryUrlToBeFetched)
//
//	fetch(CategoryUrlToBeFetched) 
//
//	.then(function(res) {
//		if (res.ok) {
//			return res.json();
//		}
//	})
//	
//	.then(function(value) {
//		//Manipulation of value of the fetch result from the first page to fetch
//
//		//RECUPERATION OF THE 5 FILMS OF THE FIRST FETCH AS JS OBJECTS
//		for (let movieIndexOnCategoryPage = 0; movieIndexOnCategoryPage < numberOfMoviesOnAnAPIPage; movieIndexOnCategoryPage++){ // 0,1,2,3,4 : OK
//			//FILMS OBJECTS
//			let movie_JS_object = value.results[movieIndexOnCategoryPage]
//			movies_JS_objects_list.unshift(movie_JS_object)
//
//			//FILMS URLs
//			//let movie_url = value.results[movieIndexOnCategoryPage].url
//			//movies_urls_list.unshift(movie_url) 
//
//		}
//		//console.log("fetch results : movies as JS objects list "+movies_JS_objects_list)
//		//console.log("fetch results : movie as JS object : ID "+movies_JS_objects_list[0].id)
//
//		return value
//	})
//
//	
//	.catch(function(err) {
//		// code qui s'éxécute si une erreur est survenue
//		console.log("ERROR in get_best_movies_information_from_an_API_category_page_URL_in_a_list() function")
//	});
//}




async function MultiFetchingForACategory(CarousselLag, genreToFetch, prefix_of_the_HtmlElements_IDs_for_a_category_carroussel){ // genre = "" --> all movies
	let movies_JS_objects_list = []
	
	let response = await Promise.all([ 
		//.then((value)=> value.json()) correspond à :
			//.then(function(res) {
			//	if (res.ok) {
			//		return res.json();
			//	}
			//})
		
		//version initiale :
		//fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre="+genreToFetch).then((value)=> value.json())
		fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre="+genreToFetch)
		.then((value)=> value.json())
		.catch(function(err) {console.log("ERROR in get_best_movies_information_from_an_API_category_page_URL_in_a_list() function")})
		, 
		fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre="+genreToFetch+"&page=2")
		.then((value)=> value.json())
		.catch(function(err) {console.log("ERROR in get_best_movies_information_from_an_API_category_page_URL_in_a_list() function")})
	])
	//console.log(response) // j'ai bel et bien un tableau avec les informations qui m'interessent ici !
	//console.log(response[0].results) // j'ai bel et bien un tableau avec les informations qui m'interessent ici ! 
	//console.log(response[0].results[0])
	//console.log(response[0].results[1])

	//console.log(response[1].results) 

	//boucle a faire : pour chaque élément du tableau 'response'; puis pour chaque élément de tableau result (au sein de l'élément response) : unshifter la table mytable
	for (let i in response){
		//console.log(i) // for each API page which has been fetched
		for (let j in response[i].results){
			//console.log("page "+i+" movie "+j) // for each movie of each API page which has been fetched
			movies_JS_objects_list.unshift(response[i].results[j])
		}
	}

	movies_JS_objects_list.sort((a, b) => a.imdb_score - b.imdb_score)
	movies_JS_objects_list.reverse()


	
	for (let movies_JS_object of movies_JS_objects_list){
		//console.log(movies_JS_object.id +" "+ movies_JS_object.imdb_score)
		carousselPicturesUpdate_AfterButtonClick(CarousselLag, prefix_of_the_HtmlElements_IDs_for_a_category_carroussel, movies_JS_objects_list) //il y a un truc pas logique ici : movies_JS_object n'est pas utilisé??
		
	}
	//DisplayModalBoxFromCarrousselPictures(CarousselLag, prefix_of_the_HtmlElements_IDs_for_a_category_carroussel, movies_JS_objects_list) // premier test de modale pour chaque image : A SUPPRIMER

	//TEST DE FENETRE MODALE POUR LE CARROUSSEL
	//j'ai mes informations relatives à chaque film dans movies_JS_objects_list
	//a noter que lorsque je clique sur un bouton gauche/droite, les valeurs dans ce tableau changent et correspondent aux films de la catégorie !
		//il ne faudrait pas que lorsque je clique sur l'image 2 de la catégorie1, j'ai les infos de l'image 2 d'une autre catégorie !
		//pour cela, je pense que si je place l'appel de la fonction qui ouvre la fenetre modale au bon endroit ca devrait aller.
		//je dois donc appeler la fonction d'ouverture de la fenetre modale juste apres la mise à jour du carroussel


			//étape par étape : récupérer une image au format 'objet JS'
	//let JS_best_movie_picture0 = document.getElementById("best-movie_picture0"); 
	//JS_best_movie_picture0.src = category_movies_JS_objects_list[0].image_url
	//-->ce code a été automatisé pour chaque image et correspond à carousselPicturesUpdate_AfterButtonClick : J'ARRIVE A RECUPERER LA BONNE IMAGE POUR LA BONNE POSITION, ALORS JE DEVRAIS Y ARRIVER AVEC LES AUTRES INFOS !
	//REPRENDRE ICI : 
	//c'est juste qu'au lieu d'avoir JS_best_movie_picture0.src = category_movies_JS_objects_list[0].image_url, on aura quelque chose du genre
	//MonElementDeLaFenetreModale.textContent = category_movies_JS_objects_list[0].LInformationQuiNousInteresse

	console.log(movies_JS_objects_list) //

}


//reprendre ici : pour décaler les images du caroussel , je vais rappeler les fonctions ci dessous apres écoute d'un évènement : jouer avec la variable 'CarousselLag'
//je pourrai meme simplifier je pense, afin d'éviter de fetch à chaque fois. mais ca implique de sortir le tableau des films hors de la promise.all et des fetch, et cela je n'essaie plus !
//donc se concenter de ré-éxécuter les fonctiosn ci dessous : ) !

//4* MultiFetchingForACategory(CarousselLag_value_bestMovies[0], "", "best-movie_picture") --> déplacé dans la main


//**************************************************** */


//MultiFetchingForACategory appelle carousselPicturesUpdate_AfterButtonClick; cela ne changera pas car je dois travailler dans le promise.all
//donc je vais écouter un évènement, modifier la valeur de CarousselLag (qu'il faudra que je fournisse comme argument à ces 2 fonctions) ; puis appeler MultiFetchingForACategory

//le décalage est spécifique à une catégorie; donc je ne vais pas utiliser la classe "button-left" pour écouter l'évènement.
//j'ajoute l'id "best-movie_button-left" 


//8 elements getElementbyID déplacés en haute




//==========TEST NON FONCTIONNEL : LA VALEUR DE caroussel_value_id n'est modifiée qu'au sein de la fonction, meme avec un return 
//async function carousselLeftButtons_eventListeners(button_element, caroussel_value_id, category_name, category_html_elements_prefix){
//	button_element.addEventListener("click", function(event){
//	if (caroussel_value_id > 0){
//		caroussel_value_id -= 1
//		console.log(caroussel_value_id) //reprendre ici : si je mets un décalage initial de 1, je vois qu'en fait ce n'est pas la valeur initiale de caroussel_value_id qui est modifiée ! mais oui, expliqué dans le cours, le truc des variables passées par valeur ou par références
//		//utiliser un tableau ? ESSAYER AVEC UN RETURN et variable = fonction()
//		MultiFetchingForACategory(caroussel_value_id, category_name, category_html_elements_prefix)
//		}
//	console.log(caroussel_value_id)
//	return caroussel_value_id //sinon, la valeur initiale de caroussel_value_id n'est pas modifiée, on le voit si on met 1 comme valeur par défaut au décalage du carroussel
//	})
//}
//
//async function carousselRightButtons_eventListeners(button_element, caroussel_value_id, category_name, category_html_elements_prefix){
//	button_element.addEventListener("click", function(event){
//	if (caroussel_value_id < numberOfMoviesInACaroussel - numberOfMoviesDisplayedInACaroussel){
//		caroussel_value_id += 1
//		console.log(caroussel_value_id)
//		MultiFetchingForACategory(caroussel_value_id, category_name, category_html_elements_prefix)
//		}
//	console.log(caroussel_value_id) // promise
//	return caroussel_value_id
//	})
//}
//CarousselLag_value_bestMovies = carousselLeftButtons_eventListeners(element_bestMovie_buttonLeft, CarousselLag_value_bestMovies, "", "best-movie_picture")
//CarousselLag_value_bestMovies = carousselRightButtons_eventListeners(element_bestMovie_buttonRight, CarousselLag_value_bestMovies, "", "best-movie_picture")

//j'essaie de n'avoir qu'une fonction pour les deux boutons du coup : mais je vais quand meme devoir l'appeler deux fois: stop, JE DOIS AVANCER.
function carousselLeftAndRightsButtons_eventListeners(button_element, caroussel_value_table, category_name, category_html_elements_prefix){
	//carroussel scrolling : when button_element is pressed, caroussel_value_table[0] is modificated and MultiFetchingForACategory is called 
	//note : MultiFetchingForACategory() is called twice: redundant code : in order to evitate fetch when caroussel_value_table < 0 or > 7
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


//8* carousselLeftAndRightsButtons_eventListeners(element_bestMovie_buttonLeft, CarousselLag_value_bestMovies, "", "best-movie_picture") --> déplacé dans la main





//carousselLeftButtons_eventListeners(element_bestMovie_buttonLeft, CarousselLag_value_bestMovies, "", "best-movie_picture")
//carousselLeftButtons_eventListeners(element_category1_buttonLeft, CarousselLag_value_category1, "action", "category1_picture")
//carousselLeftButtons_eventListeners(element_category2_buttonLeft, CarousselLag_value_category2, "comedy", "category2_picture")
//carousselLeftButtons_eventListeners(element_category3_buttonLeft, CarousselLag_value_category3, "fantasy", "category3_picture")

//carousselRightButtons_eventListeners(element_bestMovie_buttonRight, CarousselLag_value_bestMovies, "", "best-movie_picture")
//carousselRightButtons_eventListeners(element_category1_buttonRight, CarousselLag_value_category1, "action", "category1_picture")
//carousselRightButtons_eventListeners(element_category2_buttonRight, CarousselLag_value_category2, "comedy", "category2_picture")
//carousselRightButtons_eventListeners(element_category3_buttonRight, CarousselLag_value_category3, "fantasy", "category3_picture")

//========== end of the test



//MODEL for one left button
//addEventListener(<event>, <callback>) (doc) prend en paramètres le nom de l'événement à écouter (voici la liste des événements existants), et la fonction à appeler dès que l'événement est exécuté. 
//element_bestMovie_buttonLeft.addEventListener("click", function(event){
//if (CarousselLag_value_bestMovies > 0){
//	CarousselLag_value_bestMovies -= 1
//	MultiFetchingForACategory(CarousselLag_value_bestMovies, "", "best-movie_picture")
//}
//})

//MODEL for one right button
//element_bestMovie_buttonRight.addEventListener("click", function(event){
//if (CarousselLag_value_bestMovies < numberOfMoviesInACaroussel - numberOfMoviesDisplayedInACaroussel){
//	CarousselLag_value_bestMovies += 1
//	MultiFetchingForACategory(CarousselLag_value_bestMovies, "", "best-movie_picture")
//}
//})

//MODELs applicated to all buttons : for one right button
//si contient left: -1; si contient right : +1
//si contient "best movies", parametres = tic et tac, si conteitn category1, parametres = action et category1_picture, etc. 
//--> utiliser switch case break ?
//posibilité d'organiser un dictionnaire 'categoriesParameters avec nom du carroussel value de la catégorie, le nom de la catégorie, le nom du prefixeHTML, etc


//element_category1_buttonLeft.addEventListener("click", function(event){
//	MultiFetchingForACategory(CarousselLag_value_category1 -= 1, "action", "category1_picture")
//})

//element_category1_buttonRight.addEventListener("click", function(event){
//	MultiFetchingForACategory(CarousselLag_value_category1 += 1, "action", "category1_picture")
//})

//element_category2_buttonLeft.addEventListener("click", function(event){
//	MultiFetchingForACategory(CarousselLag_value_category2 -= 1, "comedy", "category2_picture")
//})

//element_category2_buttonRight.addEventListener("click", function(event){
//	MultiFetchingForACategory(CarousselLag_value_category2 += 1, "comedy", "category2_picture")
//})

//element_category3_buttonLeft.addEventListener("click", function(event){
//	MultiFetchingForACategory(CarousselLag_value_category3 -= 1, "fantasy", "category3_picture")
//})

//element_category3_buttonRight.addEventListener("click", function(event){
//	MultiFetchingForACategory(CarousselLag_value_category3 += 1, "fantasy", "category3_picture")
//})
//============================================================


//===TEST : DOES NOT WORK===//
///function fetching(url){
///	let a = 1
//	fetch(url) 
//	.then(function(res) {
//		if (res.ok) {
//			return res.json();
//		}
//	})
//	.then(function(data) {
//		console.log("ok")
//		a=2
//		return a
//	})
//	.catch(function(err) {
//		// code qui s'éxécute si une erreur est survenue
//		return "ERROR "
//	});
//	//return "test out of .then"
//}

//const1 = fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=")
//const2 = fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=&page=2")

//Promise.all([const1, const2])
//	.then((values) => {
//	console.log("understanding promise.all")
//	console.log(values) // j'ai les réponses des fetchs
//});
//=================================//

// TEST : WORKS ! //
async function testing_2022_08_01(){
	mytable = []
	
	let response = await Promise.all([ // c'est l'await qui manquait !
		fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=").then((value)=> value.json()), 
		fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=&page=2").then((value)=> value.json())
	])
	console.log(response) // j'ai bel et bien un tableau avec les informations qui m'interessent ici !
	console.log(response[0].results) // j'ai bel et bien un tableau avec les informations qui m'interessent ici ! 
	console.log(response[0].results[0])
	console.log(response[0].results[1])

	console.log(response[1].results) 

	mytable.unshift(response[0].results[0])
	mytable.unshift(response[0].results[1])
	mytable.unshift(response[1].results[0])
	mytable.unshift(response[1].results[1])

	console.log(mytable)
	console.log(mytable[0].id)

}

//testing_2022_08_01()







//function youtube(){
//	let youtube1 = fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=");
//	let youtube2 = fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=&page=2");
//	array_of_promises = [youtube1, youtube2]
//	Promise.all(array_of_promises) //ici ce sont des réponses et on va appeler une méthode pour passer en json
//	.then(files => { //executé une fois que les promesess sont ok
//		files.forEach(file => {
//			process (file.json());
//		})
//		//files[0].json() // c'est toujours une promesse.
//		//files[1].json()
//	}
//	)
//	.catch(err => {
//
//	});
//
//	let process = (promess) => {
//		promess.then(data => {
//			console.log("data"+data)
//		})
//	}
//}
//youtube()


function carousselPicturesUpdate_AfterButtonClick(CarousselLag, prefix_of_the_HtmlElements_IDs_for_a_category_carroussel, category_movies_JS_objects_list){
	//Raplaces pictures of a given caroussel, according to a given CarousselLag 
	//CarousselLag = 0 	//lag = décalage

	for (let PicturePositionInCarroussel = 0; PicturePositionInCarroussel < numberOfMoviesDisplayedInACaroussel ; PicturePositionInCarroussel++){ //numberOfMoviesDisplayedInACaroussel = 4 
		let JS_movie_picture = document.getElementById(`${prefix_of_the_HtmlElements_IDs_for_a_category_carroussel}${PicturePositionInCarroussel}`); // --> on cherche best-movie_picture0, best-movie_picture1, etc
		JS_movie_picture.src = category_movies_JS_objects_list[PicturePositionInCarroussel+CarousselLag].image_url

		//pour mon second test de modale pour chaque image, je modifie également le .alt de l'image
		JS_movie_picture.alt = category_movies_JS_objects_list[PicturePositionInCarroussel+CarousselLag].url
	}
}

//===================
//PREMIER TEST POUR LA MODALE DE CHAQUE IMAGE : INSERER LA FONCTION DisplayModalBoxFromCarrousselPictures DANS LA PROMISE.ALL
// DisplayModalBoxFromCarrousselPictures(CarousselLag, prefix_of_the_HtmlElements_IDs_for_a_category_carroussel, movies_JS_objects_list)
//function DisplayModalBoxFromCarrousselPictures(CarousselLag, prefix_of_the_HtmlElements_IDs_for_a_category_carroussel, category_movies_JS_objects_list){
//	//for each picture : an event -> a modal box
//
//	//parcourir chaque image d'un caroussel avec une boucle for
//	for (let PicturePositionInCarroussel = 0; PicturePositionInCarroussel < numberOfMoviesDisplayedInACaroussel ; PicturePositionInCarroussel++){ //numberOfMoviesDisplayedInACaroussel = 4 
//		//on créé un objet javascript correspondant à une balise HTML; on parcourt chaque caroussel (également)
//		let JS_movie_picture = document.getElementById(`${prefix_of_the_HtmlElements_IDs_for_a_category_carroussel}${PicturePositionInCarroussel}`); // --> on cherche best-movie_picture0, best-movie_picture1, etc
//		console.log(`${prefix_of_the_HtmlElements_IDs_for_a_category_carroussel}${PicturePositionInCarroussel}`)
//		//dans l'autre fonction on modifiati l'image, et maintenant on veut créer une fenetre modale si on clique.
//		//JS_movie_picture.src = category_movies_JS_objects_list[PicturePositionInCarroussel+CarousselLag].image_url
//
//
//
//
//		// Get the modal
//		let HtmlElementModal = document.getElementById("ModalBox");
//
//		// Get the button that opens the modal --> on peut garder la fonction d'ouverture de modale du meilleur film, mais il faut se débrouiller pour passer l'element en argument de la fonction, tout le reste devrait etre commun
//		let HtmlElementButtonOppeningTheModalBox = JS_movie_picture //MODIFIE PAR RAPPORT A L'ORGINALE document.getElementById("bestMovieModalButton"); //Essayer avec la classe image également; lorsque je serai dans le caroussel
//		
//		// Get the <span> element that closes the modal
//		let span = document.getElementsByClassName("closeTheModalSpan")[0];
//		
//		// When the user clicks on the button, open the modal
//		HtmlElementButtonOppeningTheModalBox.onclick = function() {
//			HtmlElementModal.style.display = "block";
//		}
//		
//		// When the user clicks on <span> (x), close the modal
//		span.onclick = function() {
//			HtmlElementModal.style.display = "none";
//		}
//		
//		// When the user clicks anywhere outside of the modal, close it
//		window.onclick = function(event) {
//			if (event.target == HtmlElementModal) {
//				HtmlElementModal.style.display = "none";
//				}
//			} 
//
//
//		let HtmlElement_Modal_moviePicture = document.getElementById("modal-content_movie-picture"); //L’image de la pochette du film : 'image_url' -> url 
//		HtmlElement_Modal_moviePicture.src = category_movies_JS_objects_list[0].image_url //-> j'ai l'affiche de film de la catégorie 2 qui sort partout ?_? donc il semblerait que je n'ai pas une mise en mémoire de mes requetes/fonctions comme je le pensais
//
//
//	}
//}
//===================



//===================
//SECOND TEST POUR LA MODALE DE CHAQUE IMAGE : Enregistrer l'url du film dans le alt de la balise html de l'image et fetcher à nouveau pour mettre à jour les infos de la modale.





function openModalBoxFromCarrousselPictures(){



	//Source : https://www.w3schools.com/howto/howto_css_modals.asp
	// Get the modal
	let CarrousselHtmlElementModal = document.getElementById("CarrousselModalBox");

	// Get the button that opens the modal
	//TEST WITH ONE PICTURE : 
	//let HtmlElementPictureTestOppeningTheModalBox = document.getElementById("best-movie_picture3"); 
	//console.log(HtmlElementPictureTestOppeningTheModalBox.alt)
	let HtmlElementPicturesOppeningTheModalBox_List = document.getElementsByClassName("movie-picture"); //Retournera la liste des éléments qui correspondent
	for (let HtmlElementPictureOppeningTheModalBox of HtmlElementPicturesOppeningTheModalBox_List){
		let HtmlElementPictureTestOppeningTheModalBox = HtmlElementPictureOppeningTheModalBox

		// Get the <span> element that closes the modal
		let CarrousselSpan = document.getElementsByClassName("CarrousselCloseTheModalSpan")[0];
		
		// When the user clicks on the button, open the modal
		HtmlElementPictureTestOppeningTheModalBox.onclick = function() {
			
			fetch(HtmlElementPictureTestOppeningTheModalBox.alt) 
			.then(function(res) {
				if (res.ok) {
					//Recupération of json for the next .then()
					return res.json();
				}
			})
			.then(function(movieData) { //value is fetch result at json format
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
				console.log("ERROR in ...() function") // This code is executed if an error happenned
			});
			
			
			CarrousselHtmlElementModal.style.display = "block";
		}
		
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

openModalBoxFromCarrousselPictures()



//POUR LA PRESENTATION DE SOUTENANCE : j'ai deux logiques différentes: soit j'ai les données dans une .then() et j'appelle une fonction de modale (best movie)
	//soit je stocke l'url du film dans une propriete de la balise html, puis je fetch lors du clic sur le bouton (en lo'ccurence l'image de caroussel)




//=======================CARROUSSEL=======================

function carrousselInitialisation(){
	MultiFetchingForACategory(CarousselLag_value_bestMovies[0], "", "best-movie_picture")
	MultiFetchingForACategory(CarousselLag_value_category1[0], "action", "category1_picture")
	MultiFetchingForACategory(CarousselLag_value_category2[0], "comedy", "category2_picture")
	MultiFetchingForACategory(CarousselLag_value_category3[0], "fantasy", "category3_picture")
}

function carrousselScrolling(){
	carousselLeftAndRightsButtons_eventListeners(element_bestMovie_buttonLeft, CarousselLag_value_bestMovies, "", "best-movie_picture")
	carousselLeftAndRightsButtons_eventListeners(element_bestMovie_buttonRight, CarousselLag_value_bestMovies, "", "best-movie_picture")

	carousselLeftAndRightsButtons_eventListeners(element_category1_buttonLeft, CarousselLag_value_category1, "action", "category1_picture")
	carousselLeftAndRightsButtons_eventListeners(element_category1_buttonRight, CarousselLag_value_category1, "action", "category1_picture")

	carousselLeftAndRightsButtons_eventListeners(element_category2_buttonLeft, CarousselLag_value_category2, "comedy", "category2_picture")
	carousselLeftAndRightsButtons_eventListeners(element_category2_buttonRight, CarousselLag_value_category2, "comedy", "category2_picture")

	carousselLeftAndRightsButtons_eventListeners(element_category3_buttonLeft, CarousselLag_value_category3, "fantasy", "category3_picture")
	carousselLeftAndRightsButtons_eventListeners(element_category3_buttonRight, CarousselLag_value_category3, "fantasy", "category3_picture")
}





function openModalBox(JsonDict_MovieAllData){
	//Source : https://www.w3schools.com/howto/howto_css_modals.asp
	// Get the modal
	let HtmlElementModal = document.getElementById("ModalBox");

	// Get the button that opens the modal
	let HtmlElementButtonOppeningTheModalBox = document.getElementById("bestMovieModalButton"); //Essayer avec la classe image également; lorsque je serai dans le caroussel
	
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



	//TEST FOR DISPLAYING INFORMATION RELATED TO THE BEST MOVIE INT THE MODAL BOX
	//OU SONT LES INFOS ?  
	//-> dans bestMovieFetching; je dois travailler dans la fonction .then()
	//donc la fonction que je suis en train de rédiger va etre executée dans cette .then
	//autre idée: lors de la fetch, je peux garder l'url du film dans une variable propre à la balise HTML (en modificant sa classe par exemple, meme si ca me paraitre vraiment risqué et pas propre)
	
	//apres, pas obligé de mettre l'ouverture de fenetre modale dans la fetch ? bah si en fait parceque j'arrivais pas à sortir les valeurs.
	
		//i will receive (from the fetch related to the best movie) : a json dict with all data related to the film : I use it for the modal box



	//OU EST CE QUE JE VEUX ENVOYER LES INFOS ? LISTE DES IDs : 
	//"modal-content_movie-picture" //L’image de la pochette du film : 'image_url' -> url 
	//"modal-content_title" //Le Titre du film : 'title' -> string 
	//"modal-content_genres" //Le genre complet du film : 'genres' -> [] 
	//"modal-content_date_published" //Sa date de sortie : 'date_published' -> string 
	//"modal-content_rated" //Son Rated : 'rated' -> string 
	//"modal-content_imdb_score" //Son score Imdb : ''imdb_score' -> string 
	//"modal-content_directors" //Son réalisateur : 'directors' -> [] 
	//"modal-content_actors" //La liste des acteurs : 'actors' -> []
	//"modal-content_duration" //Sa durée : 'duration' -> integer 
	//"modal-content_countries" //Le pays d’origine : 'countries' -> [] 
	//"modal-content_worldwide_gross_income" //Le résultat au Box Office : 'usa_gross_income' or 'worldwide_gross_income' ? -> integer ; i suppose worldwide_gross_income 
	//"modal-content_long_description" //Le résumé du film : 'description' or 'long_description' ? -> string ; I suppose 'long_description'

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


//openModalBox()

//REPRENDRE ICI : j'arrive à faire la fenetre modale du meilleur film.
//objectif : maintenant c'est quand on clique sur une 'image' que je veux une fenetre modale.  ces "images" sont bel et bien des images en termes de balises HTML
//le truc c'est qu'il faut tenir compte du décalage du carroussel, ce qui m'interesse c'est l'information relative à la balise image, et non pas la balise image elle meme
//saaaaaaauf si je stocke l'url du film dans la balise alt de la balise image
//voir si je ne peuxpas intervenir dans la promise.all, quand meme, ce serait beaucoup plus simple !
//ou voir meme si je ne peux pas intervenir dans la fonction carousselPicturesUpdate_AfterButtonClick() ! : D --> non, les infos sont dans multifetching c'est sur.. wow : SCHEMA !

//--> tester : intervenir dans multifethcing, utiliser la valeur du décalage du caroussel pour savoir a quel index de tableau on a : 
//si je clique sur la 3eme image en partant de la gauche, avec un décalage de 1 ; je dois choisir le film à la position 3 (en absolu, dans le code) (4eme position dans le tableu en partant de 0)







function main(){
	bestMovieFetching()
	//get_seven_best_movies_urls_from_an_API_category_URL("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score")

	//MultiFetchingForACategory("") // genre = "" --> all movies
	//a transformer en fonction dédiée; je passerai le tableau à cette fonction
	//setTimeout(function() { //attend 1000 ms avant d'afficher le tableau, pour s'assurer qu'il est rempli; j'aurai préféré attendre que les promesses soient toutes ok, mais ça ne semble pas marcher comme je l'entends : /
	//	//let movieTest = movies_JS_objects_list[0]
	//	//console.log(movieTest.id)  // j'affiche bel et bien un ID : YES !
	//	movies_JS_objects_list.sort((a, b) => a.imdb_score - b.imdb_score)
	//	movies_JS_objects_list.reverse()
		//console.log(movies_JS_objects_list)
	//	carousselPicturesUpdate_AfterButtonClick("best-movie_picture", movies_JS_objects_list)
	//}, 1000);

	
	//CARROUSSEL INITIALISATION
	carrousselInitialisation()

	//CARROUSSEL SCROLLING
	carrousselScrolling()

}

main()


//===========================================


//CODE PRé MACHé pour remplacement d'images, etc : D


//code de remplacement d'image : voir ci dessous: version fonction et factorisé
		//let button_lag_for_carroussel = 0 //sera modifié lorsque l'on clique sur un bouton; ajouter condition if pour que cette variable ne soit pas <0 ou > nombre de films enregistrés (7) - nombre de flms dans caroussel (3)
		//test pour voir ou je dois placer le code remplacant les images
		//let JS_best_movie_picture1 = document.getElementById('best-movie_picture0');
		//JS_best_movie_picture1.src = best_movies_JS_objects[0+button_lag_for_carroussel].image_url // CE TEST MARCHE ! mettre le tableau en return et mettre un then juste apres, au meme niveau d'intentation
		//let JS_best_movie_picture2 = document.getElementById('best-movie_picture1');
		//JS_best_movie_picture2.src = best_movies_JS_objects[1+button_lag_for_carroussel].image_url 
		//let JS_best_movie_picture3 = document.getElementById('best-movie_picture2');
		//JS_best_movie_picture3.src = best_movies_JS_objects[2+button_lag_for_carroussel].image_url
		//let JS_best_movie_picture4 = document.getElementById('best-movie_picture3');
		//JS_best_movie_picture4.src = best_movies_JS_objects[3+button_lag_for_carroussel].image_url





		//VERSION NON FACTORISEE pour fetcher : ici je travaille avec l'URL de la prochaine page; j'avais un return value.next
		//.then(function(nextUrl) {
		//	console.log(nextUrl)
		//	
		//	"fetch au sein d'un then"
		//	fetch(nextUrl)
		//	.then(function(res) {
		//		if (res.ok) {
		//			return res.json();
		//		}
		//	})
		//	.then(function(valueNextUrl) {
		//		for (let i = 0; i < numberOfMoviesOnAnAPIPage; i++){ // 0,1,2,3,4 : OK
		//			let best_movies_url = valueNextUrl.results[i].url
		//			best_movies_urls.unshift(best_movies_url) // url of a movie --> in the best_movies_urls table

					//je fetch chaque URL de film pour récupérer toutes les infos de chaque film dans une liste
		//			fetch(best_movies_url)
		//			.then(function(res) {
		//				if (res.ok) {
		//					//Récupération du json pour la prochaine .then())
		//					return res.json();
		//				}
		//			})
		//			.then(function(movie) {
		//				//console.log("movie"+movie)
		//				best_movies_JS_objects.unshift(movie)
		//			})
		//		}
		//	console.log(best_movies_urls)
		//	console.log("aaaaaaaaaaaaaa")
		//	})
		//
		//ce code ne s'éxécute pas... sans dout à cause du fetch dans le then
		//console.log("numberOfPageBrowsed" +numberOfPageBrowsed)
		//console.log("best_movies_urls" + best_movies_urls)
		//console.log("best_movies_JS_objects")
		//console.log(best_movies_JS_objects)
		//console.log("bbbbbb")
		
		//return "ok" //il me faut bien un return .??
		//})


		//ICI : associer l'image de chaque URL a une image HTML; garder en tete que les boutons doivent permettre de parcourir le carroussel
		//j'utilise un then, parceque je veux etre sur d'avoir mon tableau rempli
		//.then(function(res) { //c'est mal placé, ca s'execute AVANT que je n'ai rempli mon tableau : dur l'enchainement des .then
		//	let JS_best_movie_picture1 = document.getElementById('best-movie_picture1');
		//	let JS_best_movie_picture2 = document.getElementById('best-movie_picture2');
		//	let JS_best_movie_picture3 = document.getElementById('best-movie_picture3');
		//	let JS_best_movie_picture4 = document.getElementById('best-movie_picture4');

		//	console.log("tesst")
		//	console.log(best_movies_JS_objects)
		//	JS_best_movie_picture1.src = best_movies_JS_objects[0]
		//	JS_best_movie_picture2.src = best_movies_JS_objects.pop()
		//	JS_best_movie_picture3.src = best_movies_JS_objects.pop()
		//	JS_best_movie_picture4.src = best_movies_JS_objects.pop()
		//})







//FONCTION POUR AUTOMATISER LE CHANGEMENT D'IMAGES DU CARROUSSEL ; 
//note : ici j'ai une table d'adresses url d'images; on pourra simplement utiliser une table qui conteient TOUTES les infos des films et récupérer l'url de l'image : D!
//let newPictureUrlTableTEST = ["image_de_film_factice_higher_rated_movie.png", "image_de_film_factice_higher_rated_movie2.png"]

//function carousselLagingAfterButtonClick(HtmlElementsIdPrefix, newPictureUrlTable){ 
//	//lag = décalage
//	CarousselLag = 1
//	for (let PicturePositionInCarroussel = 0; PicturePositionInCarroussel < numberOfMoviesDisplayedInACaroussel ; PicturePositionInCarroussel++){ //numberOfMoviesDisplayedInACaroussel = 4 
//		let JS_best_movie_picture = document.getElementById(`${HtmlElementsIdPrefix}${PicturePositionInCarroussel}`); // --> on cherche best-movie_picture1, best-movie_picture2, etc
//		console.log(JS_best_movie_picture)
//		JS_best_movie_picture.src = newPictureUrlTable[PicturePositionInCarroussel+CarousselLag]
//	}
//}
//carousselLagingAfterButtonClick("category1_picture", newPictureUrlTableTEST)





//je vais avoir du fetch et je vais appeler mes fonctions ci dessous ! qu'il faudra peut etre mettre au dessus du coup ^^ ca sera pratique parceque je vais faire une boucle; 
//histoire de compléter les 4 images d'un coup (et du coup toutes les pages html dédiées à chaque film (1;2;3;4 : pour chaque catégorie))

//note: ce quil fait : https://www.youtube.com/watch?v=nYY3IQWSUWY
//ajuste la taille du container à 800px * nombre d'images
//créé les 5 images et les intègre dans des divs, dans le container avec la classe "photo"
//sauf que j'ai plusieurs items; je reste sur mon idée mais je garde en tete

function get_a_movie_picture_url_from_movie_at_json_format(movie_url){
	
}

function get_a_movie_title_from_movie_at_json_format(){
	
}

function get_a_movie_year_from_movie_at_json_format(){
		
}
//etc.....


//________________________________________________________
//________________________________________________________
//EXECUTION PARALLELE DES PROMISES : voir page 50/67 du cours JS WEB

//je sais pas si ce sera nécéssaire...?


//-->la fonction  then()  recevra les résultats de toutes les  Promise  sous forme d'un tableau : allResults = [ [ getResult1, getResult2 ], postResult ]

//Promise.all([get(url1), get(url2)])  // on pourrait mettre fetch à la place de get ..?
//    .then(function(results) {
//        return Promise.all([results, post(url3)]];
//    })
//    .then(function(allResults) {
//        // We are done here !
//    });

//Ici, nous utilisons la fonction  Promise.all  qui prend en paramètre une liste de  Promise  (cela peut aussi être de simples valeurs qui sont alors transformées en  Promise  résolues), 
//et qui permet de toutes les exécuter en parallèle et de retourner une nouvelle  Promise  qui sera résolue quand toutes les  Promise  seront résolues.

//-->la fonction  then()  recevra les résultats de toutes les  Promise  sous forme d'un tableau : allResults = [ [ getResult1, getResult2 ], postResult ]

//________________________________________________________
//________________________________________________________

//endpoint (URL) = nom de domaine + path (URI))
//URI : identifiant de ressource uniforme = moyen d'identifier une ressource
//exemple URI = /characters

//endpoint est une URL/URI qui fait partie d’une API; c'est l’adresse complète du fichier
//endpoint = nom de domaine + URI

//données d'une API en XML ou JSON

//________________________________________________________

//Possibilité de créer des classes en JS; les objets JavaScript sont écrits en JSON 
// on a déja du JSON, mais pourrait servir


//class className {
//	constructor(property1,property2){
//		this.property1 = 100; // commentaire
//		this.property2 = 200; // commentaire
//	}
//}

//let instance = new className(property1,property2)



//o	accéder aux données dans un objet 
//avec la notation pointée (dot notation)
//	let bookTitle = classInstance.title;
//avec la notation bracket (bracket notation) : L'intérêt ici c’est qu’on va pouvoir mettre entre bracket une variable
//	let bookTitle = classInstance["title"];  


//Tableau 
//	let guests = [];
//accéder aux éléments de ce tableau par leur indice (N'oubliez pas de démarrer à l'indice  0  !) :
//	let firstGuest = guests[0]; // "Sarah Kate"


//	nomTableau.length : nombre d’éléments qu’il contient (sans parenthèses ?)
//	nomTableau.push(« aze ») : ajouter un élément à la fin d'un tableau
//	nomTableau.unshift(variable) : ajouter votre élément au début du tableau
//	nomTableau.pop(): ajouter votre élément au début du tableau



//let element_of_the_page = document.getElementById("ballPlayer1"); // On récupère l'élément sur lequel on voudra agir

//document.addEventListener("keypress", function(event){
		//......
 //       })

