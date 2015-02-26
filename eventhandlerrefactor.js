
var tour = {
  init: function(){
    $("#tour").on("click", "button", this.fetchPhotos);
  },
  fetchPhotos: function(){
    $.ajax('/photos.html', {
        data: {location: $("#tour").data('location')},
        success: function(response){
            $('.photos').html(response).fadein();
        },
        error:function() {
          $('.photos').html('<li>there was a problem fetching the latest photos. please try again.</li>');
        },
        timeout: 3000,
        beforesend: function() {
          $('#tour').addclass('is-fetching');
        },
        complete: function() {
          $('#tour').removeclass('is-fetching');
        }
    });
  }
}

$(document).ready(function() {
    tour.init();
});


