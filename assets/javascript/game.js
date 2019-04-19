$( document ).ready(function() {
    createButtons(searchArray, 'searchButton','#giphyArea');
    console.log( "ready!" );
});


var searchArray = ['dog','cat','bird'];

// create button function
function createButtons(searchArray, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();
    for (var i=0; i<searchArray.length; i++){
        var a = $('<button type="button" class="btn btn-success">');
        a.addClass(classToAdd);
        a.attr('data-type',searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
}

//on click button function
$(document).on('click','.searchButton',function(){
    var type = $(this).data('type');
    console.log(type);
    var apiKey = 'AsbqGUIofQTkBuNBIUMh1tuT1P40Cdp1';
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=' + apiKey + '&limit=10';

    $.ajax({url:queryURL,method: 'get'})
        .done(function(response){
            console.log(response)
        
        for(var i=0; i < response.data.length; i++){
            var searchDiv = $('<div class="search-item">');
            var rating = response.data[i].rating;
            var p = $('<p>').text('rating: '+rating);
            //collect animated and still version of the giphy
            var still = response.data[i].images.fixed_height_still.url;
            var animated = response.data[i].images.fixed_height.url;
            var image = $('<img>');
            image.attr('src',still);
            image.attr('data-still',still);
            image.attr('data-animate',animated);
            image.attr('data-state','still');
            image.addClass('searchImage');
            searchDiv.append(p);
            searchDiv.append(image);
            $('#searches').append(searchDiv);
        }
    })
})




