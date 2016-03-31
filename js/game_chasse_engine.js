/* var parasites = {
	
	"parasites":[ 
	{
		id: "para1",
    	pos_x: 79,
    	pos_y: 69,
    	size_x: 46,
    	size_y: 46
	} 
	],
	 "image":"../images/image1.jpj"

	};

 
	
	 

*/

var BreakException= {};
var reussites_count =0;
var erreurs_count =0;
var canvas_quotient;
var paraValidees = [];
var cordonneesErreurs = [];
var cordonneesValides = [];

var butAC = "";
var togleAffichage = true;

//Choix et chargement de l'image 
// Le choix entre les trois images que nous possedons (0-2)
var choix = getRandomInt(0,0);


	//on recupere l'objet JSON du parasite choisi
var choixObjet = parasitesTab[choix];    

var myTab   = choixObjet.parasites;  //tableau JSON des positions des parasites
var myImage = choixObjet.picture;
var myWidth = choixObjet.width;
var myHeight= choixObjet.height;

//creation des references utiles
var canvas = document.getElementById('my_canvas');
var canvas_context;
var canvas_image;
var imgWidth;
var imgHeight;
var canvas_belt = $('#canvas_belt');
var image;
var textReussites = $("#valPara"), textErreurs = $("#valErreur");
var posX = $("#posX"), posY = $("#posY");


// Methodes
function chasse_para_play(){

	togleAffichage = false;
	showHide();

	canvas_quotient= 2;
	imgWidth = (choixObjet.width/canvas_quotient)+2;
	//alert(imgWidth);
	imgHeight = (choixObjet.height/canvas_quotient)+1;

	canvas.width  = imgWidth;
	canvas.height = imgHeight;
	canvas_context = canvas.getContext('2d');

	$("#my_canvas_container").css({ "width":imgWidth+10+"px"});

	canvas_image = ScaleImage(imgWidth, imgHeight, imgWidth, imgHeight, true);

	image = new Image();

	image.onload = function() {
		canvas_context.drawImage(image, canvas_image.targetleft, canvas_image.targettop ,imgWidth,imgHeight);

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

	// now figure out which one we should use
	var fScaleOnWidth = (scaleX2 > targetwidth);
	if (fScaleOnWidth) {
		fScaleOnWidth = fLetterBox;
	}
	else {
		fScaleOnWidth = !fLetterBox;
	}

	if (fScaleOnWidth) {
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
	result.targettop = Math.floor((targetheight - result.height) / 2);

	return result;
}

function drawError(TabXY){

	var radius = 9/canvas_quotient;
	canvas_context.beginPath();
	canvas_context.arc(TabXY[0]/canvas_quotient, (TabXY[1]/canvas_quotient)-1, radius, 0, 2 * Math.PI, false);
	canvas_context.fillStyle = 'red';
	canvas_context.fill();
	canvas_context.lineWidth = 0;
	canvas_context.strokeStyle = 'red';
	canvas_context.stroke();
}


/*
function drawSuccess(posX, posY, sizeX, sizeY){

	canvas_context.beginPath();
	canvas_context.rect(posX, posY,sizeX,sizeY);
	canvas_context.fillStyle = 'red';
	canvas_context.fill();
	canvas_context.lineWidth = 0;
	canvas_context.strokeStyle = 'red';
	canvas_context.stroke();

}
*/


function updateScore(){
	textReussites.text(reussites_count);
	textErreurs.text(erreurs_count);
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function renit(){

	//On reinitialise les variables à 0(Zero) ensuite on rafraichi l'affichage

	reussites_count =0;
	erreurs_count   =0;
	paraValidees    =[];
	cordonneesErreurs = [];
	togleAffichage = true;
	$('.valides').remove();
	//$('.erreurs').remove();
	//$('.valides').remove();


	updateScore();
}

function showHide(isToggle){
		if(togleAffichage){
			//si c'est true alors on cache tous les //points d'erreurs et reussites

			$('.valides').hide();
			$("#afficher").text('Afficher');

			if(isToggle){
				canvas_context.drawImage(image, canvas_image.targetleft, canvas_image.targettop ,imgWidth,imgHeight);
			}

			togleAffichage = false;
		}
		else
		{
			$('.valides').show();
			$("#afficher").text('Cacher');

			if(isToggle){
				cordonneesErreurs.forEach(function(erreurObj, index, tab){

					window.setTimeout(function(){
						drawError(erreurObj)
					}, 300);
				});
			}

			togleAffichage = true;
		}
}

function affichePosition(x,y){
	posX.text(x);
	posY.text(y);
}

function validClick(indexPara){
	       //On incremente le nombre de reussites
			reussites_count++;
			
			//On ajoute l'index actuel dans la liste des parasites déjà trouvées
			paraValidees.push(indexPara);
			
			//on crée un contour
				  //C'est ici que l'on va creer le point d'Erreur à l'endroit du click
				  var newSuccess = document.createElement('span');
				  var newSuccess  = $(newSuccess);

				  			//propriétés de positionnement de l'erreur
				  newSuccess.attr( 'class','valides' );
				  newSuccess.css({ 'top':(myTab[indexPara].pos_y/canvas_quotient)+'px', 'left':(myTab[indexPara].pos_x/canvas_quotient)+'px', 'width': myTab[indexPara].size_x/canvas_quotient, 'height':myTab[indexPara].size_y/canvas_quotient});
				  //newSuccess.css({'width': myTab[indexPara].size_x/canvas_quotient, 'height':myTab[indexPara].size_y/canvas_quotient});
				  //canvas_context.drawFocusRing(newSuccess,(myTab[indexPara].pos_x/canvas_quotient),(myTab[indexPara].pos_y/canvas_quotient),true)
				  newSuccess.appendTo(canvas_belt);

			//On actualise le Score (sur l'ecran)
			updateScore();	
}


function verification(valX, valY)
{

		valX *=canvas_quotient;
		valY *=canvas_quotient;

	   //Ce Try/Catch est importante car ça nous permet d'arreter(de sortir de) la boucle ForEach en lançant une Exception
	 try
	 {
		//On parcours le tableau des parasites
	 	myTab.forEach( function(parasite, index, tab)
	 	{		
		
			  //Si le click est valide (on a cliqué sur une parasite)
			if( (valX >= parasite.pos_x && (valX <= (parasite.pos_x + parasite.size_x))) && (valY >= parasite.pos_y && (valY <= (parasite.pos_y + parasite. size_y))))
			{
				//Si le tableau des parasites trouvés est vide
				if(paraValidees.length == 0)
				{
					validClick(index);
					
					//On sort de la boucle
					throw BreakException;
				}
				else
				{
					//Si le parasite trouvé est nouveau
					if(paraValidees.indexOf(index) == -1)
					{
					   validClick(index);
					   
					   //On sort de la boucle
					   throw BreakException;
					}
					else
					{
						// Parasite déja trouvé
					   //alert("Parasite déja trouvé ! ");   //  +myTab[index].id);
					   
					   //On sort de la boucle
					   throw BreakException;   
					}
						
				}
			}
			else  //erreur **********************************
			{

				
			   // Lorsqu'on fini de parcourrir le tableau des parasites et que les
			  //  coordonnées du "click" ne correspondent à rien
			  if((index+1) == tab.length)
			  {
				  //On incremente le nombre d'erreurs
				  erreurs_count++;

				  /*
				  //C'est ici que l'on va creer le point d'Erreur à l'endroit du click
				  var newErrorJS = document.createElement('span');
				  var newError  = $(newErrorJS);

				  			    //propriétés de positionnement
				  			   // le -10 (valY -10) depends de la taille verticale du texte(X) qui signale l'erreur
				  			  //  le -5  (valX -5)  depends de la taille horizontale du texte qui signale l'erreur
				  			 //en resumé, c'est pour mieux cadrer le point d'erreur (la hauteur du X étant superieur à la largeur)
				  newError.attr( 'class','erreurs' );
				  newError.css({ 'top':(valY-(10/canvas_quotient))/canvas_quotient+'px', 'left':(valX-(5/canvas_quotient))/canvas_quotient+'px' });

				  	//Ajout des coordonnées de l'erreur dans la liste d'érreurs

				   var myText = document.createTextNode("X");
				   var text = $(myText);


				   //On insère le texte X dans la balise <span> crée precedement
				   text.appendTo(newError);

				   //on insère l'element <span> dans le BOX qui contient le canvas (la ceinture du canvas)
				   newError.appendTo(canvas_belt);

				   */



				  	var tmpTab = [];
				    tmpTab.push(valX);  // LEFT
				  	tmpTab.push(valY);  // TOP

				  	cordonneesErreurs.push(tmpTab);
				  	drawError(tmpTab);
				  			
				  			//

				  //On rafraichi le score(sur l'ecran) pour voir notre point d'erreur
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
 	 
}


$('.valides').click(function(e){
	alert('parasite déjà trouvée !');
});

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

  // on renitialise les cordonnées à zéro, x=0, y=0
$("#my_canvas").mouseout(function(e){
	
	//On appelle la fonction d'affichage
	affichePosition(0, 0);
});

/* Reactions aux cliques */
 
	//clique sur l'image
$("#my_canvas").click(function(e){
	
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
});

	//Clique sur le button "recommencer"
$("#recommencer").click(function(e){
	renit();
	chasse_para_play();
});

	//Clique sur le button "afficher"
$("#afficher").click(function(e){

	 /*Le "true" pour signeler que l'appele vient de la methode "Afficher-Cacher"
	   et non de la methode d'initialisatio*/
	showHide(true);
});
