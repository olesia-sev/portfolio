//flip auth
$(function() {
  $('.welcome__auth-btn').on('click', function(e) {
    e.preventDefault();

    $(this).addClass('welcome__auth-btn--active');
    $('.welcome__form--front').addClass('welcome__form--front-active');
    $('.welcome__form--back').addClass('welcome__form--back-active');
  })

  $('.to_main').on('click', function(e) {
    e.preventDefault();

    $('.welcome__auth-btn').removeClass('welcome__auth-btn--active');
    $('.welcome__form--front').removeClass('welcome__form--front-active');
    $('.welcome__form--back').removeClass('welcome__form--back-active');
  })
});

//full-screen menu по клику на бургер
$(function() {
  $('.hero__burger-menu').on('click', function(e) {
    e.preventDefault();

    $('.hero__burger-menu').toggleClass("menu-on");
    $('.full-screen-menu').toggleClass('full-screen-menu__active');
  })
});

//full-screen menu появление слева и справа + текст меню
$(function() {
  $('.hero__burger-menu').on('click', function(e) {
    e.preventDefault();

    $('.full-screen-menu__left').toggleClass('animated slideInLeft');
    $('.full-screen-menu__right').toggleClass('animated slideInRight');
    $('.full-screen-menu__item').toggleClass('zoomIn');

//close menu on ESC
    $(document).on('keydown', function(e) {
      if ( e.keyCode === 27 ) {
        $('.full-screen-menu').removeClass('full-screen-menu__active');
        $('.hero__burger-menu').removeClass("menu-on");
      }
    });
  });
});

//skiils, function on scroll
$(function() {
  var skills = $('.skills-row');

  $(window).on('scroll', function(e) {
    if (document.body.scrollTop > 120 || 
    document.documentElement.scrollTop > 120){
      $('[class^="circle"]').addClass('circle-active')
    }
  });
}) 

//google map
  function initMap() {
    var center = {lat:  59.9450154, lng: 30.3085512};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: center,
      scrollwheel: false,
      styles: [
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
          {
            "color": "#f2f2f2"
          }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
            {
             "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": 45
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
            {
              "color": "#00BFA5"
            },
            {
              "visibility": "on"
            }
          ]
        }
    ]
    });
  };


//blur
$(function() {
  var blur = (function () {
    var wrapper = document.querySelector('.blur-wrapper'),
        form = document.querySelector('.reviews__form--blur');

    return {
      set: function () {
        var imgWidth = document.querySelector('.reviews__background-wrapper').offsetWidth,
            posLeft = -wrapper.offsetLeft,
            posTop = -wrapper.offsetTop,
            blurCSS = form.style;

        blurCSS.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
        blurCSS.backgroundPosition = posLeft + 'px' + ' ' + posTop + 'px';
      }
    }    
  }());

  blur.set();

  window.onresize = function () {
    blur.set();
  }
});

//parallax index
$(function() {
  const parallaxContainer = document.getElementById('parallax');
  const layers = parallaxContainer.children;

  const moveLayers = e => {
    const initialX = (window.innerWidth / 2) - e.pageX;
    const initialY = (window.innerHeight / 2) - e.pageY;

    let i = 0;
    for (let layer of layers) {
      const divider = i / 100;
      const positionX = initialX * divider;
      const positionY = initialY * divider;
      const bottomPosition = (window.innerHeight / 2) * divider;
      const image = layer.firstElementChild;

      layer.style.transform = `translate(${positionX}px, ${positionY}px)`;
      image.style.bottom = `-${bottomPosition}px`;
      i++;
    }
  };

  window.addEventListener('mousemove', moveLayers);
});

//parallax scroll
$(function() {
  
});