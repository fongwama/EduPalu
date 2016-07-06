$(document).ready(function(){

    // create field with all address data
    for (var i=0; i < places.length; i++) 
    {
        places[i].address_full = places[i].address1 + places[i].address2 + places[i].city;
        places[i].address_full = places[i].address_full.toLowerCase();
    };
    
    // loading of pharmacy json database
  var db = JsonQuery(places);
    var db_geo;
    
    // When search by pharmacy name
    $("#btn_search").click(function() {

        // clean input field
        var query_field = $("#input_name").val().trim().toLowerCase(); 
        // build query, condition, name like (name.$li)
        re = new RegExp(query_field, "i");
        var query = "db.where({'name.$li': " + re + "}).or({'address_full.$li': " + re + "}).exec()";

        // build results content (construction du résultat de la recherche)
        var content = "";

        // evaluation of builded query
        results = eval(query);

        // Construction des item de la recherche (résultat)
        for (var i=0; i < results.length; i++) {
           // row ${i}
           content += "<div class='place'>";
           content += "<h2>"+results[i].name +"</h2>";
           content += "<div class='address'>"+ results[i].address1 + "</div>";
           content += "<div class='address'>"+ results[i].address2 + "</div>";
           content += "<div class='city'>"+ results[i].city +"</div>";
           content += "<a class='tel' href='tel:"+ results[i].tel1 +"'>"+ results[i].tel1 +"</a>";
           content +=  "&nbsp; <a class='tel' href='tel:"+ results[i].tel2 +"'>"+ results[i].tel2 +"</a>";
           content += "</div>";
        };

        $("#results").html(content);
    });

    $("#btn_search_near").click(function() {
        
        $("#results").html("Veuillez autoriser la géolocalisation et patientez quelques instants...");
        
        navigator.geolocation.getCurrentPosition(
            getNearestPlaces, 
            failGeolocation, {enableHighAccuracy:true, timeout:8000});
        // {enableHighAccuracy:true, timeout:5000}
          
    });

    function failGeolocation(error)
    {
        content = "L'application ne peut trouver la pharmacie la plus proche. :-( <br />";
        content += "Avez-vous bien autorisé la géolocalisation ? <br /><br />";
        content += "code erreur : " + error.code;
        $("#results").html(content);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from locaton provider)
        //   3: timed out
    };

    function getNearestPlaces(position)
    {
        lat1 = position.coords.latitude;
        lon1 = position.coords.longitude;
        $("#results").html("Position trouvée !");
        Number.prototype.toRad = function() {
           return this * Math.PI / 180;
        };
        
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
              };

              var pharma = 
              {
                "distance":d,
                "id"      :places[i].id,
                "city"    :places[i].city,
                "address1" :places[i].address1,
                "address2" :places[i].address2,
                "name"    :places[i].name,
                "tel1"    :places[i].tel1,
                "tel2"    :places[i].tel2
              };

              tab_pharma_geo.push(pharma);
        };
        

        db_geo = JsonQuery(tab_pharma_geo);

        var query = "db_geo.limit(10).order({'distance':'asc'}).exec()";

        // build results content (construction du résultat de la recherche)
        var content = "";

        // evaluation of builded query
        results = eval(query);

        // Construction des item de la recherche (résultat)
        for (var i=0; i < results.length; i++) {

            var distance;
            var distance_km = results[i].distance;

            if(distance_km < 1){
                // - de 1000 mètres
                distance = (distance_km * 1000).toFixed(0) +" mètres";
            }
            else
            {
                // + de 1000 mètres
                var partie_decimale = distance_km % parseInt(distance_km, 10);
                if( partie_decimale > 0 ){

                    distance = parseInt(distance_km, 10)+" km et "+(partie_decimale * 1000).toFixed(0)+" mètres";
                }
                else{
                  distance = dist_km +" Km";
                };

            };

            content += "<div class='place'>";
            content += "<h2>"+results[i].name +"</h2>";           
            content += "<div class='distance'>distance :</span><span class='black distance'> "+ distance +"</div>";
            content += "<div class='address'>"+ results[i].address1 + "</div>";
            content += "<div class='address'>"+ results[i].address2 + "</div>";
            content += "<div class='city'>"+ results[i].city +"</div>";
            content += "<a class='tel' href='tel:"+ results[i].tel1 +"'>"+ results[i].tel1 +"</a>";
            content += "&nbsp; <a class='tel' href='tel:"+ results[i].tel2 +"'>"+ results[i].tel2 +"</a>";
            content += "</div>";
        };
        
        $("#results").html(content);

    }

});
