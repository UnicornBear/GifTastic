$(document).ready(function() {
    createButtons(searchArray, 'searchButton','#giphyArea');
    console.log( "ready!" );
});


var searchArray = ['workaholics','workaholics season','blake henderson','adam demamp','anders holmvik','alice murphy','jillian belk'];

// create button function
function createButtons(searchArray, classToAdd, giphyArea){
    $('#giphyArea').empty();
    for (var i=0; i<searchArray.length; i++){
        var button = $('<button type="button" class="btn btn-success">');
            button.addClass(classToAdd);
            button.attr('data-type',searchArray[i]);
            button.text(searchArray[i]);
        $('#giphyArea').append(button);
    }
}

//on click button function
$(document).on('click','.searchButton',function(){
    var type = $(this).data('type');
    console.log(type);
    var apiKey = 'AsbqGUIofQTkBuNBIUMh1tuT1P40Cdp1';
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=' + apiKey + '&limit=10';
    console.log(queryURL);

    // ajax to get data via API
    $.ajax({
        url:queryURL,
        method: 'get' })
        .done(function(response){
            console.log(response)
        
        for(var i=0; i < response.data.length; i++){
            var searchDiv = $('<div class="search-item">');
            var rating = response.data[i].rating;
            // var shortURL = response.data[i].bitly_url;
            var p = $('<p>').text('rating: '+rating);
                p.addClass('rating');
            // var q = $('<p>').text('URL: '+ shortURL);
            //collect animated and still version of the giphy
            var still = response.data[i].images.fixed_width_still.url;
            var animated = response.data[i].images.fixed_width.url;
            var image = $('<img>');
                image.attr('src',still);
                image.attr('data-still',still); 
                image.attr('data-animate',animated);
                image.attr('data-state','still');
                image.addClass('searchImage');
                // image.addClass("rounded", "rounded float-left");    
                image.addClass('')

            searchDiv.append(p);
            searchDiv.append(image);
            $('#giphyReturn').append(searchDiv);
        }
    })
})


$('#addSearch').on('click',function() { 
    var newGiphy = $('input').eq(0).val();
    searchArray.push(newGiphy);
    createButtons(searchArray, 'searchButton', '#giphyArea');
    return false;   
})



// When the user clicks on a picture, this will either start or stop the animation of that picture.  
$(document).on('click','.searchImage',function(){
    var state = $(this).attr('data-state');
    if(state == 'still')
        {
            $(this).attr('src',$(this).data('animate'));
            $(this).attr('data-state','animate');
        } else {
            $(this).attr('src',$(this).data('still'));
            $(this).attr('data-state','still');    
        }
})



// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

