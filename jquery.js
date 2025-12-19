$(document).ready(function(){
    console.log("Ready");
    $("p").click(function(){
        $(this).hide();
    });

    $("input").click(inputClicked);

});

function inputClicked() {
    $(this).hide();
}