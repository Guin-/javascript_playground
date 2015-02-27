


function Tour(price) {
  console.log("A new Tour was created");
  this.cost = function(nights){
    console.log(nights * price);
  }
}
$(document).ready(function() {
  var tour = new Tour(100);
  tour.cost(4);
});

/*
 Up until this point we've only had 1 tour on the page at once,
 so we were able to hardcode a good deal of the DOM elements.
 Let's work on refactoring our code to work with multiple tours
 on the page. We're showing our tour JavaScript object we made in
 the reference.js file here, but it's not being loaded into the page.
 For starters, create a new Tour function that takes in a jQuery
 object as a parameter. Create a new instance of a Tour on
 document.ready, passing in a jQuery object for the #paris location.
 Within the function, call console.log with the passed in DOM element.
 */

function Tour(el){
	console.log(el);
}

$(document).ready(function() {
	var paris = new Tour($('#paris'));
});

function Tour(el) {
  this.el = el;
  this.fetchPhotos = function(){};
  this.el.on("click", "button", this.fetchPhotos);
}
$(document).ready(function() {
  var paris = new Tour($('#paris'));
});

/*
 The biggest change is that we can't query the DOM directly --
 instead we'll have to base all DOM queries off of el, the element
 representing the current tour.

 Update the data option to take in the data from the current tour
 -- tour.el.
 Add a context option to the ajax call, giving it a context of tour.
 After that, within your callbacks, you'll be able to reference the
 current tour element using this.el rather than #tour.
 Lastly, instead of finding all .photos only find .photos within the
 current this.el element.
 */


function Tour(el) {
  var tour = this;
  this.el = el;
  this.fetchPhotos = function() {
    $.ajax('/photos.html', {
      context: tour,
      data: {location: el.data('location')},
      success: function(response) {
        this.el.find('.photos').html(response).fadeIn();
      },
      error: function() {
        this.el.find('.photos').html('<li>There was a problem fetching the latest photos. Please try again.</li>');
      },
      timeout: 3000,
      beforeSend: function() {
        this.el.addClass('is-fetching');
      },
      complete: function() {
        this.el.removeClass('is-fetching');
      }
    });
  };
  this.el.on('click', 'button', this.fetchPhotos);
}
$(document).ready(function() {
  var paris = new Tour($('#paris'));
  var london = new Tour($('#london'));
});


$(document).ready(function() {
  $('form').on("submit", function(event){
  	event.preventDefault();
  })
});


$(document).ready(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    $.ajax('/book', {
      type: 'POST',
      data: $('form').serialize()
    })
  });
});

$(document).ready(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    $.ajax('/book', {
      type: 'POST',
      data: $('form').serialize(),
      success: function(result){
      	$('form').remove();
        $('.tour').html(result);
      }
    });
  });
});

$(document).ready(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    var form = $(this);
    $.ajax('/book', {
      type: 'POST',
      data: $('form').serialize(),
      dataType: 'json',
      success: function(result) {
        form.remove();
        var msg = $('<p></p>');
        msg.append("Description: " + result.description + " for " + result.nights + " nights");
        $('.tour').html(msg);
      }
    });
  });
});

//Remove hardcoded url and type
//
$(document).ready(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    var form = $(this);
    $.ajax($('form').attr('action'), {
      type: $('form').attr('method'),
      data: $('form').serialize(),
      dataType: 'json',
      success: function(response) {
        $('.tour').html('<p></p>')
                  .find('p')
                  .append('Trip to ' + response.description)
                  .append(' at $' + response.price)
                  .append(' for ' + response.nights + ' nights')
                  .append('. Confirmation: ' + response.confirmation);
      }
    });
  });
});





