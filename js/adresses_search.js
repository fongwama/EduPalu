$(document).ready(function(){
     
	 

    // loading of pharmacy json database
	var db = JsonQuery(places);
  var db_geo;

    // When search by pharmacy name
    $("#btn_search").click(function() {

        // build query, condition, name like (name.$li)
        var query = "db.where({'name.$li': /" + $("#input_name").val() + "/i}).exec()";

        // build results content (construction du résultat de la recherche)
        var content = "<ul>";

        // evaluation of builded query
        results = eval(query);

        // Construction des item de la recherche (résultat)
        for (var i=0; i < results.length; i++) {

           // row ${i}
           content += "<a href='#' class='feed'><li class='clearfix'>";
           //content +=  "<img src='img/"+results[i].photo +"' alt='thumb' class='thumbnail'>";
           content +=  "<h2>"+results[i].name +"</h2><br/>";
           content +=  "<span class='desc'>"+ results[i].address + "</span>";
           content +=  "<p class='desc'>"+ results[i].city +"</p>";
           content +=  "<span class='contact'>"+ results[i].tel1 +" | "+results[i].tel2 +"</span>"; 
           content += "</li></a>";
        }
        
        content += "</ul>";
       // alert(content);

        $("#resultat").html(content);
        //$("#results").html(content);
    });

    $("#btn_search_near").click(function() {

      //Position par defaut pour les Tests
      var lat1=-4.788426;
      var lon1=11.864629;

          var position_actuelle;

          navigator.geolocation.getCurrentPosition(function(position) 
          {
             //alert("success");
            position_actuelle = position;
            lat1 = position_actuelle.coords.latitude;
            lon1 = position_actuelle.coords.longitude;

            getPharmacies(lat1, lon1);
          }, 
          function(error) 
          {
             //alert("error");
            // error.code can be:
            //   0: unknown error
            //   1: permission denied
            //   2: position unavailable (error response from locaton provider)
            //   3: timed out
            getPharmacies(lat1, lon1);
          });

    });

    function getPharmacies(lat1, lon1)
    {

         Number.prototype.toRad = function() {
           return this * Math.PI / 180;
          }

        
        var tab_pharma_geo = [];

        //Parcourir la base_de_donnees pour calculer la distance la plus proche
        for (var i=0; i < places.length; i++) 
        {
              var lat2 = places[i].lat;
              var lon2 = places[i].lon;
              
              var R = 6371; // km (rayon)
              var dLat = ((lat2 - lat1)).toRad();
              var dLon = (lon2 - lon1).toRad(); 
              var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                      Math.sin(dLon / 2) * Math.sin(dLon / 2); 
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
              var d = R * c;
              if(d<0){
                 d = (-1*d);
              }

              var pharma = 
              {
                "distance":d,
                "id"      :places[i].id,
                "city"    :places[i].city,
                "address" :places[i].address,
                "name"    :places[i].name,
                "tel1"    :places[i].tel1,
                "tel2"    :places[i].tel2
              };

              tab_pharma_geo.push(pharma);
        }
        

        db_geo = JsonQuery(tab_pharma_geo);

        var query = "db_geo.limit(650).order({'distance':'asc'}).exec()";

        // build results content (construction du résultat de la recherche)
        var content = "<ul>";

        // evaluation of builded query
        results = eval(query);

        // Construction des item de la recherche (résultat)
        for (var i=0; i < results.length; i++) {

              var distance;
              var distance_km = results[i].distance;

              if(distance_km<1){
                // - de 1000 Mettres

                var distance_mettre = distance_km * 1000;
                distance = distance_mettre.toFixed(2) +" mèttres";
              }
              else
              {
                // + de 1000 Mettre
                var partie_decimale = distance_km % parseInt(distance_km, 10);
                if( partie_decimale > 0 ){

                    distance = parseInt(distance_km, 10)+" Km <strong>et</strong> "+(partie_decimale * 1000).toFixed(2)+" mèttre(s)";
                }
                else{
                  distance = dist_km +" Km";
                }

              }

           // row ${i}
           content += "<a href='#' class='feed'><li class='clearfix'>";
           //content +=  "<img src='img/"+results[i].photo +"' alt='thumb' class='thumbnail'>";
           content +=  "<h2>"+results[i].name +"</h2>";           
           content +=  "<span class='contact'>Distance :</span><span class='black distance'> "+ distance +"</span><br/>";
           content +=  "<span class='desc'>"+ results[i].address + "</span>";
           content +=  "<p class='desc'>"+ results[i].city +"</p>";
           content +=  "<span class='contact'>"+ results[i].tel1 +" | "+results[i].tel2 +"</span>";
           content += "</li></a>";
        }
        
        content += "</ul>";
       // alert(content);

        $("#resultat").html(content);

    }

});