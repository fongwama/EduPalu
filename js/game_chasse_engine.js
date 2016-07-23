var reussites_count =0;
var erreurs_count =0;
var canvas_quotient;

var paraIndexValides = [];

var coordonneesErreurs = [];
var coordonneesValides = [];

var butAC = "";
var togleAffichage = true;



// shuffle pictures
var pictures_order = shuffle_index(pictures);
var picture;
var picture_objects;

 
var totalCanvasPara  = $('#val_total_para');


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

var posX = $("#posX"), posY = $("#posY");
var timer_view = document.getElementById("question_timer_value");

//Chrono
var sec = 0;
var tempo; // le retardateur

var is_game_over = false;



$(document).ready(function() {
    // run game when the DOM is fully loaded
    chasse_para_play();
});

// Methodes
function shuffle_index(a){
    var temp_array = new Array();
    var len = a.length;
    // fill table
    for (idx=0; idx<len; idx++) {
        temp_array.push(idx);
    }
    // shuffle table
    for (x=0; x<len; x++) {
        var i = Math.floor(len * Math.random());
        var j = Math.floor(len * Math.random());
        var t = temp_array[i];
        temp_array[i] = temp_array[j];
        temp_array[j] = t;
    }
    return temp_array;
}

function chasse_para_play(){
    // get index of the first picture
    picture_idx = pictures_order.pop();
    // update picture object
    picture = pictures[picture_idx];
    picture_objects = picture.objects;
    
    // hide next button
    $('#next').css({'display': 'none'});
    is_game_over = false;
    
    // display welcome message
    $('#message').html('Cliquez ou appuyez sur les parasites le plus vite possible.');

	canvas_container_width = $('#my_canvas_container').css('width');

	canvas_quotient = 2;
	imgWidth = (picture.width/canvas_quotient)+2;
	//alert(canvas_container_width);
	imgHeight = (picture.height/canvas_quotient)+1;

	canvas.height = imgHeight;
	canvas_context= canvas.getContext('2d');

	canvas_scaled_image_dim = ScaleImage(imgWidth, imgHeight, imgWidth, imgHeight, true);
	image = new Image();	

	//on enleve le "px" inclu dans la valeur recuperée
	if(parseInt(canvas_container_width, 10)<imgWidth){
		canvas.width = parseInt(canvas_container_width, 10);
		$('.buttons_container').css('max-width',canvas_container_width+'px');

		//mise à jour du tableau de parasites (parasite presents dans le canvas)
		picture_objects = getCanvasParasites();

	}
	else{
		canvas.width = imgWidth;
		$('.buttons_container').css({'width':imgWidth+'px','left':15});
	}

    // update time allowed to find parasites
    sec = (time_per_para * picture_objects.length) +1;
    // update number of visible parasites to find
	totalCanvasPara.text(picture_objects.length);

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


	image.src = 'data/'+picture.filename;
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

	erreurs_count  = 0;
    paraIndexValides   = [];
	sec = picture.time+1;

	// On initialise à  picture_objects ici pour prendre en compte le click sur le button "recommencer".
	picture_objects = picture.parasites;
	

	updateScore();
}

// display parasites not found by user
// dotted blue lines
function showMissedParasites(){
	var timeAnim = 500;
	picture_objects.forEach(function(parasiteObj, index, tab){

		if(paraIndexValides.indexOf(index) == -1){
				
			window.setTimeout(function()
			{
				canvas_context.beginPath();
				canvas_context.lineWidth=2/canvas_quotient;
				canvas_context.strokeStyle="blue";
				canvas_context.setLineDash([3,2.5,3,2.5]);
				canvas_context.rect((picture_objects[index].pos_x)/canvas_quotient, (picture_objects[index].pos_y+1)/canvas_quotient, (picture_objects[index].size_x)/canvas_quotient, (picture_objects[index].size_y+1)/canvas_quotient);
				canvas_context.stroke();

			}, timeAnim);

		 timeAnim +=1200/(picture_objects.length - paraIndexValides.length);
		}
		
	});
}

function affichePosition(x,y){
	posX.text(x);
	posY.text(y);
}

//Cette fonction sert à dessiner(afficher) le contour sur le parasite
function validClick(indexPara){
	       			
			//On recupere le parasite dans le tableau(picture_objects) et on l'ajoute dans la liste des parasites trouvées
			var tmpPara = picture_objects[indexPara];
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
	 	picture_objects.forEach( function(parasite, index, tab)
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
					if(paraIndexValides.indexOf(index) == -1){
					   validClick(index);
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
	 	});  //End forEach
	 }
	 catch(e)
	 {
		if (e!==BreakException) throw e;
	 }

	 // All parasites are found. End of game.
	if(coordonneesValides.length == picture_objects.length){
		clearTimeout(tempo);
		game_over(true);
	}
}

function getCanvasParasites(){

	var myTmpTab = [];
	var canvasWidth = canvas.width;

	picture_objects.some(
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
		game_over(false);
	}
}


//Game finish
function game_over(success){
	is_game_over = true;
    if (success == false) {
    	$('#message').html("Désolé, vous n'avez pas trouvé tous les parasites.");
        showMissedParasites();
    } else {
        $('#message').html("Bravo, vous avez trouvé tous les parasites.");
        // update score
        // score_new = score_old + time_left - 2 x errors
        var score = parseInt($('#score_value').text()) + parseInt(sec) - 2 * erreurs_count;
        // no negativ score ;-)
        if (score < 0) {
            score = 0;
        }
        $('#score_value').html( score );
    }
    
    // display next button
    if (pictures_order.length != 0) {
        $('#next').css({'display': 'inline-block'});
        $('#message').html( $('#message').text() + " Réessayez avec une nouvelle image.");
    }

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

// go to next picture
$("#next").click(function(e){
    renit();
    chasse_para_play();
});
