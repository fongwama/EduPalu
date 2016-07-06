'use strict';
$(document).ready(function(){

    //Add pharmacies
    $(".btnAjouter").on('click', function(e){
        e.defaultPrevented;

        //Je récupère les champs obligatoire

        var $this = $('#form_pharmacie');
        var nom = $('#nom').val();
        var adresse = $('#adresse').val();
        var ville = $('#ville').val();
        var quartier = $('#quartier').val();
        var message = "";

        if( nom === "" || adresse === "" || ville === "" || quartier === ""){
            alert('Les champs doivent êtres remplis');
        }else{
            $.ajax({
                url: $this.attr('action'),
                type: 'post',
                data: $this.serialize(),
                dataType: 'json',
                success: function(res){
                   /* $.each(res, function(i, element){
                        message = element.message;
                    });*/
                    window.location.href=window.location.href;
                    /*alert(message);*/
                }
            })
        }
        return false;
    })

    //Update pharmacies


})