


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

//using $.each
$('button').on('click', function() {
  $.ajax('/cities/deals', {
    success: function(result) {
      $.each(result, function(index, dealItem){
      	return console.log(dealItem);
      })
    }
  });
});

$('button').on('click', function() {
  $.ajax('/cities/deals', {
    success: function(result) {
      $.each(result, function(index, dealItem) {
        var deal = $(".deal-" + index);
        deal.find('h3').html(dealItem.name);
        deal.find('p').html(dealItem.price);
      });
    }
  });
});


// use $.getJSON
$('button').on('click', function() {
  $.getJSON('/cities/deals', function(result) {
      $.each(result, function(index, dealItem) {
        var dealElement = $('.deal-' + index);
        dealElement.find('.name').html(dealItem.name);
        dealElement.find('.price').html(dealItem.price);
      });
    })
  });

// using $.map()
$('.update-available-flights').on('click', function() {
  $.getJSON('/flights/late', function(result) {
    $.map(result, function(flight, index){
    	return console.log(flight);
    })
  });
});

$('.update-available-flights').on('click', function() {
  $.getJSON('/flights/late', function(result) {
    var flightElements = $.map(result, function(flightItem, index){
    var listItem = $('<li> </li>');
    listItem.append(flightItem.flightNumber + " " + flightItem.time);
    return listItem;
    });
    $('.flight-times').html(flightElements);
  });
});

//using detach();
$('.update-available-flights').on('click', function() {
  $.getJSON('/flights/late', function(result) {
    var flightElements = $.map(result, function(flightItem, index){
      var flightEl = $('<li>'+flightItem.flightNumber+'-'+flightItem.time+'</li>');
      return flightEl;
    });
    $('.flight-times').detach()
    				.html(flightElements)
    				.appendTo('.flights');
  });
});


$(document).ready(function(){
  // Get Weather
  $('button').on('click', function() {
    var results = $(this).closest('li').find('.results');
    results.append('<p>Weather: 74&deg;</p>');
    $(this).off('click');
  });
});

// Namespacing event handlers
$(document).ready(function(){
  // Get Weather
  $('button').on('click.weather', function() {
    var results = $(this).closest('li').find('.results');
    results.append('<p>Weather: 74&deg;</p>');
    $(this).off('click.weather');
  });

   // Show Photos
  $('button').on('click.photos', function() {
    var tour = $(this).closest('li');
    var results = tour.find('.results');
    results.append('<p><img src="/assets/photos/'+tour.data('loc')+'.jpg" /></p>');
    $(this).off('click.photos');
  });
  $('button').trigger('click');
});

// Using custom events
$(document).ready(function(){
  // Get Weather
  $('button').on('show.weather', function() {
    var results = $(this).closest('li').find('.results');
    results.append('<p>Weather: 74&deg;</p>');
    $(this).off('click.weather');
  });

  // Show Photos
  $('button').on('click.photos', function() {
    var tour = $(this).closest('li');
    var results = tour.find('.results');
    results.append('<p><img src="/assets/photos/'+tour.data('loc')+'.jpg" /></p>');
    $(this).off('click.photos');
    $(this).trigger('show.weather');
  });
});

// Creating a plugin
$.fn.photofy = function(){
  console.log(this);
  }

$(document).ready(function() {
	$('.tour').photofy();
});

// Iterate with each
$.fn.photofy = function() {
  this.each(function(){
  	console.log(this);
  })
}

$(document).ready(function() {
  $('.tour').photofy();
});

$.fn.photofy = function() {
  this.each(function() {
    var tour = $(this);
    var show = function(e) {
      e.preventDefault();
      tour.addClass('is-showing-photofy');
    }
      tour.on('click.photofy', '.see-photos', show)
    })
  };


$(document).ready(function() {
  $('.tour').photofy();
});

// Using $.extend()
$.fn.photofy = function(options) {
  this.each(function() {
    var settings = $.extend({count: 3, tour: $(this)}, options);
    var show = function(e) {
      e.preventDefault();
      settings.tour
               .addClass('is-showing-photofy')
               .find('.photos')
               .find('li:gt('+(settings.count-1)+')').hide();
     }

     settings.tour.on('click.photofy', '.see-photos', show);
  });
}

$(document).ready(function() {
  $('.tour').photofy({ count: 1});
});

$.fn.photofy = function(options) {
  this.each(function() {
    var show = function(e) {
      e.preventDefault();
      settings.tour
              .addClass('is-showing-photofy')
              .find('.photos')
              .find('li:gt('+(settings.count-1)+')')
              .hide();
    }
    var settings = $.extend({
      count: 3,
      tour: $(this)
    }, options);
    settings.tour.on('click.photofy', '.see-photos', show);
    settings.tour.on('show.photofy', show);
  });
}

$(document).ready(function() {
  $('.tour').photofy({ count: 1});

  $('.show-photos').on('click', function(e) {
    e.preventDefault();
    $('.tour').trigger('show.photofy');
  });
});

// Internal Triggers
$.fn.photofy = function(options) {
  this.each(function() {
    var remove = function(e){
    e.preventDefault();
    settings.tour.fadeOut().off('.photofy');
    }
    var show = function(e) {
      e.preventDefault();
      settings.tour
              .addClass('is-showing-photofy')
              .find('.photos')
              .find('li:gt('+(settings.count-1)+')')
              .hide();
    }
    var settings = $.extend({
      count: 3,
      tour: $(this)
    }, options);
    settings.tour.on('click.photofy', '.see-photos', show);
    settings.tour.on('show.photofy', show);
    settings.tour.on('click.photofy', '.hide-tour', remove);
  });
}

$(document).ready(function() {
  $('.tour').photofy({ count: 1});

  $('.show-photos').on('click', function(e) {
    e.preventDefault();
    $('.tour').trigger('show.photofy');
  });
});


// PROMISES //
// Reusable AJAX

Vacation = {
  getPrice: function(location){
  var promise = $.ajax('/vacation/prices', {
      data: {q: location},
      success: function(result){
        $('.price').text(result.price);
      }})
   return promise;
  }
}

$(document).ready(function() {
  $('button').on('click', function(){
    var location = $('.location').text();
    Vacation.getPrice(location).done(function(result){
    	$('.price').text(result.price);
    })
  });
});

// Create custom promise using $.Deferred()
var Vacation = {
  getPrice: function(location){
   var promise = $.Deferred();
   $.ajax('/vacation/prices', {
     data: {q: location},
     success:function(result){
     	promise.resolve(result.price)
     }
   });
   return promise;
  }
}
$(document).ready(function() {
  $('button').on('click', function(){
    var location = $('.location').text();
    Vacation.getPrice(location).done(function(result){
    	$('.price').text(result);
    })
  });
});

// Add an error handler using promise.reject()
var Vacation = {
  getPrice: function(location){
    var promise = $.Deferred();
    $.ajax('/vacation/prices', {
      data: {q: location},
      success: function(result){
        promise.resolve(result.price);
      },
      error: function(){
        var error = 'invalid location';
        promise.reject(error);
      }
    });
    return promise;
  }
}

$(document).ready(function() {
  $('button').on('click', function(){
    var location = $('.location').text();
    Vacation.getPrice(location).done(function(result){
      $('.price').text(result)})
      .fail(function(error){
      	console.log(error);
    });
  });
});

// Using $.when().then() to ensure multiple calls are rendered in the html at the same time.
$(document).ready(function() {
  $('button').on('click', function(){
    var tour = $(this).parent();
    var location = tour.data('location');
    var resultDiv = tour.find('.results').empty();
    $.when(Vacation.getPrice(location),
           Photo.getPhoto(location)
    ).then(function(priceResult, photoResult){
      $('<p>$'+priceResult+'</p>').appendTo(resultDiv);
      $('<img />').attr('src', photoResult).appendTo(resultDiv);
    });
  });
});

