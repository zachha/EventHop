($ => {
  "use strict";

  // Scroll using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(() => {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Close responsive menu when scroll trigger is clicked
  $('.js-scroll-trigger').click(() => {
    $('.navbar-collapse').collapse('hide');
  });

  // Use Bootstrap JS scrollspy with jQuery
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
   let navbarCollapse = () => {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Hide navbar when modals trigger
  $('.portfolio-modal').on('show.bs.modal', e => {
    $(".navbar").addClass("d-none");
  })
  $('.portfolio-modal').on('hidden.bs.modal', e => {
    $(".navbar").removeClass("d-none");
  })
})(jQuery);

//
//Front end login receive signature
//
$('#login_form').on('submit', event =>{
      event.preventDefault();
      $.post("http://localhost:8080/auth",{email:$('#email').val(),password:$('#password').val()},
        (data,status) => {
          
          $.get("http://localhost:8080/user")
          .done(res => {
              console.log(res);
            });
        }).fail(xhr =>console.log(JSON.parse(xhr.responseText).message));
    });



//
//google maps api for create group
//

// use the different category buttons to reload the map based on location types
            $("#cafes").on('click', () => initMap('cafe'));
            $("#bar").on('click', () => initMap('bar'));
            $("#art_gallery").on('click', () => initMap('art_gallery'));
            $("#restaurant").on('click', () => initMap('restaurant'));
            $("#movie_theater").on('click', () => initMap('movie_theater'));
            $("#spa").on('click', () => initMap('spa'));
            $("#create_title_button").on("click", () => {
              console.log($('#group_title_input').val());
              $('#create-group-title').text($('#group_title_input').val());
            });
            var initMap = (category) => {
              $(".placeInfo").remove();
              // Create the map.
              this.durham = { lat: 35.997, lng: -78.904 };
              map = new google.maps.Map(document.getElementById('map'), {
                center: durham,
                zoom: 15
              });
              // Create the places service.
              this.service = new google.maps.places.PlacesService(map);
              this.getNextPage = null;
              this.moreButton = document.getElementById('more');
              // Perform a nearby search.
              service.nearbySearch(
                { location: durham, radius: 1800, type: [category] },
                function (results, status, pagination) {
                  if (status !== 'OK') return;
                  createMarkers(results);
                });
            }
            var createMarkers = (places) => {
              this.bounds = new google.maps.LatLngBounds();
              this.placesList = document.getElementById('places');
              $('#map-select').empty()
              for (let i = 0, place; place = places[i]; i++) {
                this.image = {
                  url: place.icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
                };
                this.marker = new google.maps.Marker({
                  map: map,
                  icon: image,
                  title: place.name,
                  position: place.geometry.location
                });                  
                $('#map-select').append($('<option>', {
                  value: place.name,
                  text: place.name
                }));
                console.log(place.rating);
                console.log(place.photos["0"].getUrl);
                bounds.extend(place.geometry.location);
              }
                map.fitBounds(bounds);
            }
