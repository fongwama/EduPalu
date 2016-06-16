/*$(function () {

    $('.fem').click(function (event) {
        event.preventDefault();
        var c = $(this).attr('href');
        $(c).toggleClass('hidden show');
    });

});*/


$(function () {
    $("input[name='identite']").click(function () {
        if ($("#fem").is(":checked")) {
            $("#etatenceinte").show();
        } else {
            $("#etatenceinte").hide();
        }
    });
});


$(function () {
    $(".ch").click(function () {

        if($("#op6").is(":checked")){
            $("#op6Text").show();
        }else{
            $("#op6Text").hide();
        }

    });
});

$(function () {
    $(".ch2").click(function () {
        if($("#op22").is(":checked")){
            $("#select22").show();
        }else{
            $("#select22").hide();
        }

        if ($("#op32").is(":checked")) {
            $("#op32Text").show();
        }else{
            $("#op32Text").hide();
        }

        if($("#op42").is(":checked")){
            $("#op42Text").show();
        }else{
            $("#op42Text").hide();
        }

    });
});

//Filtre date


