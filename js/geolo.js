/* PLACES EDUPALU FONGWAMAA v.1.0 by © 2015 TRESOR NGASSAKI SITA(http://www.fongwama.com) 

*/

var previousPosition = null;

var lat=-4.2660956;
var lng=15.294359799999999;


/**
*Fonction d'initialisation de la carte Google Maps
*/
function initialize() {

	 document.getElementById("titre").innerHTML=titre;

    if(auteur!=""){
	     msg=document.createElement("span");
	     msg.id="author";
	     msg.innerHTML="<br />"+auteur;
	     document.getElementById("titre").appendChild(msg);
    }
    document.getElementById("instructions").innerHTML=consigne;


    map = new google.maps.Map(document.getElementById("map_canvas"), {
        zoom: 19,
        center: new google.maps.LatLng(lat, lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });   
}




/**
*test de compatibilité du navigateur avec la géolocalisation HTML
*/   
if (navigator.geolocation)
    var watchId = navigator.geolocation.watchPosition(successCallback, null, {enableHighAccuracy:true});
else
    alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");



/**
*la méthode panTo() permet de centrer la carte sur de nouvelles coordonnées
*/
function successCallback(position){
  map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
  
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 
    map: map
  }); 

  if (previousPosition){
    var newLineCoordinates = [
       new google.maps.LatLng(previousPosition.coords.latitude, previousPosition.coords.longitude),
       new google.maps.LatLng(position.coords.latitude, position.coords.longitude)];
     
    var newLine = new google.maps.Polyline({
      path: newLineCoordinates,        
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    newLine.setMap(map);
  }

  previousPosition = position;
}   

