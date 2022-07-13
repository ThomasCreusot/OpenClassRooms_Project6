//Vanilla javascript asked for the project

const numberOfMoviesOnAnAPIPage = 5
const numberOfMoviesInACaroussel = 7

//import fetch from "node-fetch"; https://stackoverflow.com/questions/48433783/referenceerror-fetch-is-not-defined

//Consigne : récupérer les données des films depuis l’API à l’aide de requêtes ajax et de les afficher sur une interface web
//	J'arrive à récupérer la valeur 'count' ou "next" de : http://localhost:8000/api/v1/titles/


//Requetes : éxécuter de manière asynchrone, avec les promises (voir cours js web)

//Définir une fonction qui récupère et retourne les informations sur un film: on va s'en servir plusieurs fois ; une seule fonction, on se balladera dans les infos sont 
//forme de dictionnaire (json) avec les clés
//Définir une fonction qui récupèré et retourne le path (URI) des 7 meilleurs films : on va s'en servir plusieurs fois
//____________

//Récupérer le film qui a la meilleur note Imdb parmi tous les films
//-->récupérer son titre et le résumé du film
//-->remplacer l'HTML 'titre film' par le nom du film; pareil pour le résumé du film; pareil pour la photo

//Récupérer les 7 autres films les mieux notés (toutes catégories confondues)

//Récupérer 7 films les mieux notés de 3 autres catégories (au choix)

//Pour chaque film : fenetre modale, présente les infos : image, titre, genre, date... vérifier qu'on a tout.

//____________________________________________



//=================================================================
//=================================================================
//TESTS ET COMPREHENSION//

// Pour récupérer un objet du DOM et modifier sa valeur ou ses propriétés

//TEST 1
function test1(){
	let variableJS_de_ma_baliseHTML_test1 = document.getElementById('balise_test1');
	variableJS_de_ma_baliseHTML_test1.textContent = "mon test de changement de balise 1 avec JS a réussi"
}
//test1()



//==Récupérez des données d'un service web==
//Fetch est un ensemble d'objets et de fonctions mis à disposition par le langage JavaScript, afin d'exécuter des requêtes HTTP de manière asynchrone.
//ENVOIE DE REQUETE : Ce code nous permet d'envoyer une requête HTTP de type GET au service web se trouvant à l'adresse  http://url-service-web.com/api/users 
//fetch("http://url-service-web.com/api/users");

//==RECUPERER LES DONNEES AU FORMAT JSON
//Récupérez le résultat de la requête
// Fetch va nous renvoyer une Promise. Pour faire simple : la Promise est un objet qui fournit 
// une fonction then qui sera exécutée quand le résultat aura été obtenu, et 
//une fonction catch qui sera appelée s’il y a une erreur qui est survenue lors de la requête
//Voici comment procéder avec un service qui fait un simple echo :
//res pour response, je suppose
//rappel : à chaque promise : si c'est ok, le prochain bloc '.then' s'éxécute, sinon c'est le prochain bloc "catch" qui s'éxécute
function test2et3() {
	fetch("https://mockbin.com/request")
	.then(function(res) {
		if (res.ok) {
		return res.json(); //DONC ON A TOUT LE JSON ICI ? NON, voir apres ; ici c'est une promise (apres aussi d'ailleurs, mais c'est une promise pour savoir si on a la boone réponse et on renvoit le
		//json pour la prochaine fonction then, qui cette fois ci utilisera la valeur du json)
		}
	})
	.then(function(value) {
		console.log("Resultat du test 2: value")
		console.log(value); //la "vraie" valeur du résultat de la requete au format json est ici
		let variableJS_de_ma_baliseHTML_test2 = document.getElementById('balise_test2');
		variableJS_de_ma_baliseHTML_test2.textContent = "mon test de changement de balise 2 avec JS, depuis une fonction then. d'une fetch a réussi"
		console.log("Resultat du test 3: value.startedDateTime")
		console.log(value.startedDateTime); //la "vraie" valeur du résultat de la requete au format json est ici
		let variableJS_de_ma_baliseHTML_test3 = document.getElementById('balise_test3');
		variableJS_de_ma_baliseHTML_test3.textContent = value.startedDateTime	
	})
	.catch(function(err) {
		// Une erreur est survenue
	});
}

//test2et3()


//autre exemple du cours : Nous allons commencer par la création d'une fonction  askHello  qui va créer une requête avec fetch de type  GET  vers le service web
//Maintenant, nous voudrions récupérer la réponse du service web et l'afficher dans l'élément ayant pour ID  hello-result 
//Le service web vous retournera une réponse au format JSON, et vous aurez besoin d'afficher la propriété greetings se trouvant dans l'objet  queryString  

function test4() {
	fetch("https://mockbin.com/request?greetings=salut") //NOTE : on a modifié notre URI ! ;
	.then(function(res) {
	  if (res.ok) {
		return res.json();
	  }
	})
	.then(function(value) {
	  document
		//DONC C'EST ICI QU'ON A LA DATA QUI NOUS INTERESSE, je suppose qu'on peut l'assigner à une variable et l'utiliser plus tard
		  .getElementById("balise_test4")
		  .innerText = value.queryString.greetings;
	  console.log("test4 ok, la balise4 prend la valeur de value.queryString.greetings issue de https://mockbin.com/request?greetings=salut")
	})
	.catch(function(err) {
	  // code qui s'éxécute si une erreur est survenue
	});
  }

//test4()


//___________________________ récupérer le code qui marche ci dessus, et l'appliquer à http://localhost:8000/api/v1/titles/ ; j'ai bien 85851 qui s'affiche en bas de ma page HTML
//cette valeur c'est celle du premier count sur la page titles de l'API !!!! youhou
//je suppose qu'il va faloir récupérer le json entier; puis boucler, etc
//ne PAS OUBLIER de valider l'acces au serveur avec la console (voir readme de l'API du P6)


function test5et6avecAPIduP6() {
	fetch("http://localhost:8000/api/v1/titles/") // : Note : on pourrait mettre http://localhost:8000/api/v1/titles/?imdb_score_min=1.0 pour filtrer ?
	.then(function(res) {
	  if (res.ok) {
		return res.json();
	  }
	})
	.then(function(value) {
	    console.log("Test 5 et6 : avec l'API du p6: je vérifie que je valide mes Promises et assigne le texte 'test5 ok' à la balise HTML n° 5")
		document
		//DONC C'EST ICI QU'ON A LA DATA QUI NOUS INTERESSE, prochain objectif :  l'assigner à une variable et l'utiliser plus tard
		    .getElementById("balise_test5")
		    .innerText = "test5 ok; .then de l'API du P6 fonctionnelles";
		document
			.getElementById("balise_test6")
		    .innerText = ("id du premier film : "+ value.results[0].id);
		})
	.catch(function(err) {
	  // code qui s'éxécute si une erreur est survenue
	});
  }
  
 
//test5et6avecAPIduP6()


function test7avecAPIduP6() {
	fetch("http://localhost:8000/api/v1/titles/") // : Note : on pourrait mettre http://localhost:8000/api/v1/titles/?imdb_score_min=1.0 pour filtrer ?
	.then(function(res) {
	  if (res.ok) {
		return res.json();
	  }
	})
	.then(function(value) {
	    console.log("Test 7 : avec l'API du p6: je vérifie que je récupère la valeur de ma Promises pour l'assigner à ma balise 6 plus tard dans le code")
		ma_variable = value.results[0].id
		return value.results[0].id
	})
	.catch(function(err) {
	  // code qui s'éxécute si une erreur est survenue
	});
  }

//let test = test7avecAPIduP6()
//console.log("AZE "+ test)

//test7avecAPIduP6()
//console.log("QSD "+ ma_variable)
  
//let variableJS_de_ma_baliseHTML_test7 = document.getElementById("balise_test7")
//variableJS_de_ma_baliseHTML_test7.innerText = test
  //mon console log de la .then s'affiche bien


//si je fais let variable = test5et6avecAPIduP6
//et que je m'attends à avoir du json en retour, je fais une erreur, car je récupère en fait une promise!
//https://stackoverflow.com/questions/34094806/return-from-a-promise-then j'obtiens un "undefined" parceque je retourne une promise, et non pas une valeur

//Je sais pas pourquoi, j'ai en tete d'extraire les informations avec fetch et de les 'sortir' de la fonction then(); 
//Je raisonne comme pour l'extraction web du P2 et ça me bloque
//en fait, avec les API et fetch, je dois travailler dans la fonction then(); 
//en tout cas c'est ce qu'il fait dans le cours, et c'est ce que font les deux vidéos youtube que j'ai regardées:
//https://www.youtube.com/watch?v=2lt4HmLm8LE 
//https://www.youtube.com/watch?v=sGvEqHkDyFc

//donc  changement de stratégie: on va écrire une fonction et l'appeler DANS la fonction qui fetch, plutot que de chercher à récupérer le résultat de la fetch 

//retaffer la partie du cours p 50/67 JS web

//je pense qu'une autre possibilité c'est de mettre des asynch et await




function test8avecAPIduP6() {
	fetch("http://localhost:8000/api/v1/titles/") // : Note : on pourrait mettre http://localhost:8000/api/v1/titles/?imdb_score_min=1.0 pour filtrer ?
	.then(function(res) {
	  if (res.ok) {
		return res.json();
	  }
	})
	.then(function(value) {
	    console.log("Test 8; je console log value de l'API du P6: ")
		console.table(value) // --> j'obtiens bien mes 5 films, mais aussi les données relatives à la 'page de l'API' (coute total, la page suivante, etc)
	    console.log("Test 8; je console log value.results de l'API du P6 : ")
		console.table(value.results) // --> j'obtiens bien mes 5 films, avec l'url, le score imdb, le nombre de votes, blablabla
	})
	.catch(function(err) {
	  // code qui s'éxécute si une erreur est survenue
	});
  }

//test8avecAPIduP6()


//extrait de cours
//Cette promesse est en fait un objet Promise qui peut être  resolve  avec un résultat, ou  reject  avec une erreur.
//Lorsque l'on récupère une  Promise , on peut utiliser sa fonction  then()  pour exécuter du code dès que la promesse est résolue, et
// sa fonction  catch()  pour exécuter du code dès qu'une erreur est survenue.

//avec async et await: meme si je récupère qqe chose de ma fetch, le return sera toujours une promise !; donc il faut TRAVAILLER LA DATA DANS LA THEN() DE LA FETCH()


//

//Ok, je veux récupérer le film avec le meilleur score : pour cela je dois effectuer un tri avec l'URI
//il faut pas que je raisonne en mode "récupération de tous les films et tri sur mon pc": l'API va trier pour moi, avec un serveur bcp plus rapide soit dit en passant (enfin si elle était en ligne)
//avec autre chose que fetch on aurait pu, mais fetch retourne systematiquement une promise


//COURS : GET /users/{userId}/followers?sort=lastName&order=asc
//-->http://127.0.0.1:8000/api/v1/titles/?sort=imdb_score
//--> cet endpoint n'a pas été prévu

//DANS LA DOC DE L'API : 
//sort_by=<field> pour obtenir des films triés selon un ordre particulier. Par exemple, utiliser sort_by=title pour trier les films selon l'ordre alphabétique de teur titre et sort_by=-title pour trier les films dans le sens inverse. Il est également possible de trier par critères multiples en séparant les critères par des virgules comme dans sort_by=-year,title qui affiche d'abord les films les plus récents, puis trie les films de la même années par ordre alphabétique.
//donc : sort_by=-imdb_score



function bestMovieFetching() {
	//Requete GET avec Fetch : tous les films de l'API triés selon leur score
	fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score") 
	//Promises: si résolue: execution de .then(), sinon execution de .catch()
	.then(function(res) {
		if (res.ok) {
			//Récupération du json pour la prochaine .then())
			return res.json();
		}
	})
	.then(function(value) {
		//TITRE : Association du titre du meilleur film à la balise HTML correspondante
		document.getElementById("bestMovie_Title").textContent = value.results[0].title //results[0] : first movie is the best one
		//IMAGE
		const img = document.getElementById("bestMovie_Picture")
		img.src  = value.results[0].image_url
		img.height = "400" //défini dans le css ; partie .best-movie-container


		//note: j'avais un fond décran de div, en fait ca ne marche pas
		//const img_method2_with_div = document.getElementById("BMC") //on est sur une DIV
		//img_method2_with_div.background = url(value.results[0].image_url)
		//-->apres reflexion, peut etre en utilisant img_method2_with_div.styles.background-image ?


		//Récupération de l'URL du film pour la prochaine then
		return value.results[0].url 
	})
	.then(function(movieUrl) {
		fetch(movieUrl)
		//Vérification qu'on a bien récupéré les données sur de la page http://127.0.0.1:8000/api/v1/titles/1508669
		.then(function(res) {
			if (res.ok) {
				//Récupération du json pour la prochaine .then())
				return res.json();
			}
		})
		.then(function(value) {
			//RESUME : Association du résumé du meilleur film à la balise HTML correspondante
			document.getElementById("bestMovie_Summary").textContent = value.description 
			//Récupération de l'URL du film pour la prochaine then
		})
	})
	.catch(function(err) {
		// code qui s'éxécute si une erreur est survenue
	});
  }

bestMovieFetching()



//NOTE
//le code suivante
//.then(function(res) {
//	if (res.ok) {
//		//Récupération du json pour la prochaine .then())
//		return res.json();
//	}
//})
//peut aussi s'écrire:
//.then(res => res.json())


//FAIT : prochaine étape : réfléchir en termes de fonctions; 

//je donne une URL d'API, je veux les 7 premiers films; donc il faut parcourir la deuxieme page (avec un return et un nouveau then().)
//je peux mettre les données dans un dictionnaire

//ensuite je veux que les 4 images d'une catégorie soient changées à partir des informations dans le dictionnaire
//quand je clique sur une image, je vais vouloir qu'une page s'ouvre avec les informations du film
//quandje clique sur un bouton, je décale l'indice à partir duquel sont récupérées les infos dans le dictionnaire de ma fonction




function get_seven_best_movies_urls_from_an_API_category_URL(non_sorted_category_url){
	//BEST movies; so we add "?sort_by=-imdb_score" to the URL 
	let sorted_category_url = non_sorted_category_url + "?sort_by=-imdb_score"

	let best_movies_urls = [] // rôle : regrouper les données (l'url) de films issus de plusieurs pages ; on utilisera la fonction push() ou unshift() pour ajouter un élément à la fin/au début du tableau et popo pour supprimer le dernier élément
	let best_movies_JS_objects = [] // // rôle : regrouper les données (tout) de films issus de plusieurs pages ; pour cela, je fois visiter l'url du film

	//je fetch l'url de la catégorie
	fetch(sorted_category_url)
	.then(function(res) {
		if (res.ok) {
			//Récupération du json pour la prochaine .then())
			return res.json();
		}
	})
	//Factorisé, ce que je faisais: deux fois la même chose : importer les url des films d'une page ; je pourrai faire un while maVariable < nombre de films que je veux (7) / nombre film par page (5), alors je visite la page suivante et j'incrément mon tableau 
	.then(function(value) {
		console.log("toutes les données de la page correspondant à l'url dans laquelle je recupere 5 films"+value)
		
		//A FAIRE : TOUT CE QUI SUIT DANS CETTE THEN PEUT ETRE MIS DANS UNE FONCTION PRENANT COMME PARAMETRE 'FIRST URL TO BROWSE' et qui prendra la valeur "value"
		
		//nombre de pages visitées et à visiter ; dépend du nomrbre de films par page et du nombre de films que l'on veut afficher dans le carroussel : 5 et 7 pour l'instant
		let numberOfPageToBrowsecounter = numberOfMoviesOnAnAPIPage / numberOfMoviesInACaroussel + 1
		let numberOfPageBrowsed = 0

		let pageToBrowse = value
		console.log("pageToBrowse" + pageToBrowse)

		//tant que je n'ai pas visité toutes les pages à visiter
		while (numberOfPageBrowsed < numberOfPageToBrowsecounter){
			console.log("numberOfPageBrowsed "+numberOfPageBrowsed+" ; numberOfPageToBrowsecounter "+numberOfPageToBrowsecounter)
			
			//je récupère mes 5 urls de films de la page
			for (let i = 0; i < numberOfMoviesOnAnAPIPage; i++){ // 0,1,2,3,4 : OK
				let best_movies_url = pageToBrowse.results[i].url
				console.log("one of the best_movies_url" + best_movies_url)
				best_movies_urls.unshift(best_movies_url) // url of a movie --> in the best_movies_urls table

				//je fetch chaque URL de film pour récupérer toutes les infos de chaque film dans une liste
				fetch(best_movies_url)
				.then(function(res) {
					if (res.ok) {
						//Récupération du json pour la prochaine .then())
						return res.json();
					}
				})
				.then(function(movie) {
					console.log("movie")
					console.log("movie"+movie)
					best_movies_JS_objects.unshift(movie)

					//test pour voir ou je dois placer le code remplacant les images
					let JS_best_movie_picture1 = document.getElementById('best-movie_picture1');
					JS_best_movie_picture1.src = movie.image_url // CE TEST MARCHE !
				})

				//pageToBrowse = pageToBrowse.next
				//console.log(pageToBrowse) // REPRENDRE ICI :  CA NE MARCHE PAS; et je comprends: il faut à nouveau fetch la page à lire ! c'est ce que j'avais prévu initialement
				//la bonne nouvelle c'est que j'ai de quoi faire une fonction; maintenant il va faloir sortir cette fonction pour pouvoir faire de la récurisivité : BOUM
				//pour avancer, je travaille avec la version non factorisée
			}
		numberOfPageBrowsed ++ //on compte le nombre de pages parcourues : NE SURTOUT PAS DESACTIVER CETTE LIGNE, SINON BOUCLE WHILE INFINIE !!!
		}
		console.log("numberOfPageBrowsed" +numberOfPageBrowsed)
		console.log("best_movies_urls" + best_movies_urls)
		console.log("best_movies_JS_objects")
		console.table(best_movies_JS_objects) // REPRENDRE ICI : je n'ai pas une table qui s'affiche, donc le format de mes objets nb'est pas le bon !

		return value.next //c'était pour lancien code, mais je garde parceque j'ai une then en suivant
	})
	//VERSION NON FACTORISEE ici je travaille avec l'URL de la prochaine page; j'avais un return value.next
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
	.then(function(res) { //c'est mal placé, ca s'execute AVANT que je n'ai rempli mon tableau : dur l'enchainement des .then
		let JS_best_movie_picture1 = document.getElementById('best-movie_picture1');
		let JS_best_movie_picture2 = document.getElementById('best-movie_picture2');
		let JS_best_movie_picture3 = document.getElementById('best-movie_picture3');
		let JS_best_movie_picture4 = document.getElementById('best-movie_picture4');

		console.log("tesst")
		console.log(best_movies_JS_objects)
		JS_best_movie_picture1.src = best_movies_JS_objects[0]
		JS_best_movie_picture2.src = best_movies_JS_objects.pop()
		JS_best_movie_picture3.src = best_movies_JS_objects.pop()
		JS_best_movie_picture4.src = best_movies_JS_objects.pop()
	})


	.catch(function(err) {
		// code qui s'éxécute si une erreur est survenue
	});
}

get_seven_best_movies_urls_from_an_API_category_URL("http://127.0.0.1:8000/api/v1/titles/")




//ici je vais avoir du fetch et je vais appeler mes fonctions ci dessous ! qu'il faudra peut etre mettre au dessus du coup ^^ ca sera pratique parceque je vais faire une boucle; 
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


//________________________________________________________
//________________________________________________________
//EXECUTION PARALLELE DES PROMISES : voir page 50/67 du cours JS WEB

//je sais pas si ce sera nécéssaire...?

//Promise.all([get(url1), get(url2)])
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

