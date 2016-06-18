/*www.fongwama.com @2015*/

var reussites_count =0;
var erreurs_count =0;
var canvas_quotient;

var paraIndexValides = [];

var coordonneesErreurs = [];
var coordonneesValides = [];

var butAC = "";
var togleAffichage = true;

 //Choix et chargement de l'image
// Le choix entre les differentes images que nous possedons
var choix = getRandomInt(0,0);


	//on recupere l'objet JSON aléatoirement choisi choisi
var choixObjet = parasitesTab[choix];    
var totalCanvasPara  = $('#val_total_para');

var myTab   = choixObjet.parasites;  //tableau JSON des positions des parasites
var myImage = choixObjet.picture;
var myWidth = choixObjet.width;
var myHeight= choixObjet.height;

//creation des references utiles
var canvas = document.getElementById('my_canvas');
var canvas_context;
var canvas_scaled_image_dim;
var imgWidth;
var imgHeight;
var canvas_belt = $('#canvas_belt');
var canvas_container_width;
var image;
var image_error;
var error_width, error_height, error_margin;
var image_timer_stoped = new Image();
var textReussites = $("#valPara"), textErreurs = $("#valErreur");
var text_felicitations = $('#question');
var posX = $("#posX"), posY = $("#posY");
var timer_view = document.getElementById("question_timer_value");

//Chrono
var sec = choixObjet.time+1; //on recupere le temps de Jeu par defaut
var tempo; // le retardateur

var is_game_over = false;

$(document).ready(function() {
    // run game when the DOM is fully loaded
    chasse_para_play();
});


// Methodes
function chasse_para_play(){

	togleAffichage = false;
    is_game_over = false;

	canvas_container_width = $('#my_canvas_container').css('width');

	//alert(canvas_container_width);

	showHide();

	canvas_quotient= 2;
	imgWidth = (choixObjet.width/canvas_quotient)+2;
	//alert(canvas_container_width);
	imgHeight = (choixObjet.height/canvas_quotient)+1;

	canvas.height = imgHeight;
	canvas_context= canvas.getContext('2d');

	canvas_scaled_image_dim = ScaleImage(imgWidth, imgHeight, imgWidth, imgHeight, true);
	image = new Image();

	//on enleve le "px" inclu dans la valeur recuperée
	if(parseInt(canvas_container_width, 10)<imgWidth){
		canvas.width = parseInt(canvas_container_width, 10)
		$('.buttons_container').css('max-width',canvas_container_width+'px');

		//mise à jour du tableau de parasites (parasite presents dans le canvas)
		myTab = getCanvasParasites();

		//Changement du temps de jeu (5 secondes pour chaque parasite)
		sec =  (5 * myTab.length) +1;
	}
	else{
		canvas.width = imgWidth;
		$('.buttons_container').css({'width':imgWidth+'px','left':15});
	}

	totalCanvasPara.text(myTab.length);

	//Alignement dynamique des buttons du bas
	var tmpCanvas = $(canvas);
	var childPos  = tmpCanvas.offset();
	var parentPos = tmpCanvas.parent().offset();
 	var canvasOffsetLeft = parseInt(childPos.left - parentPos.left,10);
	$('.buttons_container').css('left',canvasOffsetLeft);
	$('#extra_infos').css('left',canvasOffsetLeft);

	//Alignement dynamique du chronometre
 	var canvasOffsetRight = $(canvas_belt).width() - (canvasOffsetLeft + tmpCanvas.outerWidth());
	$('#question_timer').css('right',canvasOffsetRight);
	

	image.onload = function() {
		//canvas_context.drawImage(image, canvas_image.targetleft, canvas_image.targettop ,imgWidth,imgHeight);
		canvas_context.drawImage(image, canvas_scaled_image_dim.targetleft, canvas_scaled_image_dim.targettop ,imgWidth,imgHeight);
		
		countdown();
		//image_timer_stoped.src = 'img/ic_timer.png';
	};


	image.src = 'img/'+choixObjet.picture;
}

function ScaleImage(srcwidth, srcheight, targetwidth, targetheight, fLetterBox) {

	var result = { width: 0, height: 0, fScaleToTargetWidth: true };

	if ((srcwidth <= 0) || (srcheight <= 0) || (targetwidth <= 0) || (targetheight <= 0)) {
		return result;
	}

	// scale to the target width
	var scaleX1 = targetwidth;
	var scaleY1 = (srcheight * targetwidth) / srcwidth;

	// scale to the target height
	var scaleX2 = (srcwidth * targetheight) / srcheight;
	var scaleY2 = targetheight;

	 //en: now figure out which one we should use
	// fr: Ici on fait notre choix
	var fScaleOnWidth = (scaleX2 > targetwidth);
	if (fScaleOnWidth) {
		fScaleOnWidth = fLetterBox;
	}
	else {
		fScaleOnWidth = !fLetterBox;
	}

	if (fScaleOnWidth) 	{
		result.width = Math.floor(scaleX1);
		result.height = Math.floor(scaleY1);
		result.fScaleToTargetWidth = true;
	}
	else {
		result.width = Math.floor(scaleX2);
		result.height = Math.floor(scaleY2);
		result.fScaleToTargetWidth = false;
	}
	result.targetleft = Math.floor((targetwidth - result.width) / 2);
	result.targettop  = Math.floor((targetheight -result.height)/ 2);

	return result;
}

function drawError(TabXY){

	//on utilise le meme Context (canvas_context)
	if (image_error == null) { 
            
            //1ère usage de l'image
            image_error = new Image();
            image_error.src = 'img/ic_echecs.png';

            error_width  = 20/canvas_quotient;
            error_height = 35/canvas_quotient;
            error_margin = 5*canvas_quotient;

	    image_error.onload = function(){
			canvas_context.drawImage(image_error,(TabXY[0]-(canvas_quotient*4))/canvas_quotient, (TabXY[1]-error_margin)/canvas_quotient, error_width, error_height);
		};
    }
    else{
    	    //L'image ayant déjà été chargée en mémoire, on la reutilisa sans la charger à nouveau. (HTML5)
    	    canvas_context.drawImage(image_error,(TabXY[0]-(canvas_quotient*4))/canvas_quotient, (TabXY[1]-error_margin)/canvas_quotient, error_width, error_height);
    } 
}

function drawSuccess(parasite){

	canvas_context.beginPath();
			canvas_context.lineWidth=3/canvas_quotient;
			canvas_context.strokeStyle="green";
			canvas_context.rect((parasite.pos_x)/canvas_quotient, (parasite.pos_y+1)/canvas_quotient, (parasite.size_x)/canvas_quotient, (parasite.size_y+1)/canvas_quotient);
			canvas_context.stroke();
}

function updateScore(){
	
	textReussites.text(coordonneesValides.length);
	textErreurs.text(erreurs_count);
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renit(){
	//On reinitialise les variables à 0(Zero) ensuite on rafraichi l'affichage

	coordonneesErreurs =[];
	coordonneesValides =[];

	togleAffichage = true;
	erreurs_count  = 0;
    paraIndexValides   = [];
	sec = choixObjet.time+1;

	text_felicitations.text('Cliquez ou appuyez sur les parasites le plus vite possible.'); 
	updateScore();
}

function showHide(isToggle){

		if(togleAffichage){
			
			//On change la valeur du text dans le button Afficher/Cacher
			 $("#afficher").text('Afficher');

			//on redessine l'image de la lame qui est sauvegardée dans la variable "image"
			if(isToggle){
				canvas_context.drawImage(image, canvas_scaled_image_dim.targetleft, canvas_scaled_image_dim.targettop ,imgWidth,imgHeight);
			}

			//On signale à notre code que l'etat est maintenant "Cacher"
			togleAffichage = false;
		}
		else
		{
			// L'opposé de ce qui précede -> (if)
			$("#afficher").text('Cacher');

			if(isToggle){
				coordonneesErreurs.forEach(function(erreurObj, index, tab){

					window.setTimeout(function(){
						drawError(erreurObj);
					}, 15);
				});

				coordonneesValides.forEach(function(parasiteObj, index, tab){

					window.setTimeout(function(){
						drawSuccess(parasiteObj);
					}, 10);
				});
			}
			togleAffichage = true;
		}
}

function affichePosition(x,y){
	posX.text(x);
	posY.text(y);
}

	//Cette fonction sert à dessiner(afficher) le contour sur le parasite
function validClick(indexPara){
	       			
			//On recupere le parasite dans le tableau(myTab) et on l'ajoute dans la liste des parasites trouvées
			var tmpPara = myTab[indexPara];
			coordonneesValides.push(tmpPara);

			 // - Pour verifier facilement le "Parasite deja trouvé" il faut un tableau d'index 
			//  - sans ce tableau, on va boucler coordoneesValides en comparant par example les "id"
			paraIndexValides.push(indexPara);

			//On envoi le parasite à la fonction drawSuccess qui se charge de le dessiner sur le canvas.
			drawSuccess(tmpPara);

			//On actualise le Score (sur l'ecran)
			updateScore();	
}


function verification(valX, valY)
{

		valX *=canvas_quotient;
		valY *=canvas_quotient;

	  //Ce Try/Catch est tres importante(indispensable) car ça nous permet d'arreter(de sortir de) la
	 // boucle ForEach en lançant une Exception
	 try
	 {
		//On parcours le tableau des parasites
	 	myTab.forEach( function(parasite, index, tab)
	 	{
			//Si le click est valide (on a cliqué sur une parasite)
			if(    (valX >= parasite.pos_x && (valX <= (parasite.pos_x + parasite.size_x)))
				&& (valY >= parasite.pos_y && (valY <= (parasite.pos_y + parasite.size_y))))
			{
				//Si le tableau des parasites trouvés est vide
				if(coordonneesValides.length == 0)
				{
					validClick(index);
					
					//On sort de la boucle
					throw BreakException;
				}
				else
				{
					//Si le parasite trouvé est nouveau
					if(paraIndexValides.indexOf(index) == -1)					{
					   validClick(index);
					}
					else{
						// Parasite déja trouvé
					   alert("Parasite déja trouvé ! ");   //  +myTab[index].id);
					}

					//On sort de la boucle
					throw BreakException;
				}
			}
			else  //erreur **********************************
			{
			   // Lorsqu'on fini de parcourrir le tableau des parasites et que les
			  //  coordonnées du "click" ne correspondent à rien
			  if((index+1) == tab.length){

				    //On incremente le nombre d'erreurs
				    erreurs_count++;

				  	var tmpTab = [];
				    tmpTab.push(valX);  // LEFT
				  	tmpTab.push(valY);  // TOP

				  	coordonneesErreurs.push(tmpTab);

				  	//on dessine l'erreur sur le canvas
				  	drawError(tmpTab);

				    //On rafraichi le score(sur l'ecran) pour voir notre nombre d'erreurs
				    updateScore();
			  }  
			} 

		/* sleep(1);  ici je veux faire reposer le thread
		   (Permettre au jeu de ne point planter le navigateur quelque soit le nombre de parasites   valides à rechercher sur l'image.
		   Meme si l'on a autour d'une 1000 parasites.
		*/	

	 	});  //End forEach
	 }
	 catch(e)
	 {
		if (e!==BreakException) throw e;
	 }

	 //On a trouvé tous les parasites, fin du jeu
	if(coordonneesValides.length == myTab.length){
		clearTimeout(tempo);
		game_over();
	}
}

function getCanvasParasites(){

	var myTmpTab = [];
	var canvasWidth = canvas.width;

	myTab.some(
		function(parasiteObj, index, tab){
					 
				if( intersect(parasiteObj, canvasWidth) ){
					//alert('appartient '+index);
					myTmpTab.push(parasiteObj);
				}
	});

	return myTmpTab;
}


function intersect(parasite, canvasWidth) {

	//On considere un parasite si au moins "1/4" (le quart) de sa taille est visible dans le canvas.
	return ( ((parasite.pos_x/canvas_quotient) +  ((parasite.size_x/canvas_quotient)/4))  < canvasWidth);

	/* Vu que nous redimensionnant l'image seulement sur l'axe horizontal (X), nous prenons en compte juste la coordonnée X du parasite*/
}


function BreakException(message){
	//alert(message);
}


function countdown(){

	sec--;

	timer_view.innerHTML = (
			"0"+(parseInt(sec/60))+
			":"+
			((sec % 60) <10 ? "0"+(sec%60) :(sec%60))
	);

	if(sec>0)
	{
		tempo=setTimeout('countdown()',1000);
	}
	else
	{
		clearTimeout(tempo);
		game_over();
	}
}


//Game finish
function game_over(){
	is_game_over = true;
	//$('#ic_image_timer').attr({'src':"img/ic_timer.png"});
	$('#afficher').show();
	$('#recommencer').show();
	$('#quitter').css('margin-top','5px');
	//$("#comment_1").html("<p>Le jeu est terminé !</p>");

	//var score = coordonneesValides.length / choixObjet.entries * 100;
	/*
	if (score>=0 && score<50){
		msg = "Essayez de rejouer. Vous allez certainement vous améliorez";
	}
	else if (score>=50 && score<75){
		msg = "Vous avez fait un bon score mais vous pouvez sans doute faire mieux. Réessayez !";
	}
	else if (score>=75 ){
		score = "Bravo. Vous avez une bonne connaissance du paludisme.";
	}*/
	var temp_ecoule = "";
	if(sec==0)
		temp_ecoule="Temps écoulé ,";

	text_felicitations.html(temp_ecoule+"Bravo ou Desolé, encore entrain de travailler sur ce message &#x263A");
	text_felicitations.focus();
}

	//recuperation du positionnement de la souri lors du survol
$("#my_canvas").mousemove(function(e){
	
	//on recupere l'offset : valeur d'ecartement de l'image
	var $os = $(this).offset();
	
	//on recupere la valeur du scroll de la page
	var scrollTop  = $(window).scrollTop();
	var scrollLeft = $(window).scrollLeft();
	
	//On recupère avec précision la valeur X et Y du surVole(hover) 
	var valX = parseInt(e.clientX - $os.left + scrollLeft, 10);
	var valY = parseInt(e.clientY - $os.top  + scrollTop,  10);
	
	//On appelle la fonction d'affichage
	affichePosition(valX, valY);
});

	//on renitialise les coordonnées à zéro, x=0, y=0
$("#my_canvas").mouseout(function(e){
	
	//On appelle la fonction d'affichage
	affichePosition(0, 0);
});

/* Reactions aux cliques */
 
	//clique sur l'image
$("#my_canvas").click(function(e){

	 //Cette condition nous permet d'afficher les points
	// au cas l'on clique sur l'image pendant que c'est en moder caché
	if ( ! togleAffichage)
	{
		showHide(true)
	}

	if(!is_game_over)
	{
		//on recupere l'offset : valeur d'ecartement de l'image
		var $os = $(this).offset();

		//on recupere la valeur du scroll de la page
		var scrollTop  = $(window).scrollTop();
		var scrollLeft = $(window).scrollLeft();

		//On recupère avec précision la valeur X et Y du cliqué
		var valX = parseInt(e.clientX - $os.left + scrollLeft, 10);
		var valY = parseInt(e.clientY - $os.top  + scrollTop,  10);

		//var val = "X:"+parseInt(e.clientX - $os.left + scrollLeft, 10)+"\nY:"+ parseInt(e.clientY - $os.top + scrollTop, 10);
		//alert(val);

		//On appelle la fonction de verification
		verification(valX, valY);
	}

});

	//Clique sur le button "recommencer"
$("#recommencer").click(function(e){
	renit();


	clearTimeout(tempo)
	setTimeout(function(){
		chasse_para_play();
	}, 500);
});

	//Clique sur le button "afficher"
$("#afficher").click(function(e){

	 /*Le "true" pour signeler que l'appele vient de la methode "Afficher-Cacher"
	   et non de la methode d'initialisatio*/
	showHide(true);
});
