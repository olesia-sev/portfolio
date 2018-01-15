//preloader
var preloader = document.getElementById("preloader"),
  preloaderText = document.getElementById("preloader__text"),
  preloaderProgress = 0,
  preloaderInterval = setInterval(function() {
    preloaderText.textContent =
      (preloaderProgress <= 9 ? "0" : "") + (preloaderProgress++) + "%";

    if (preloaderProgress === 100) {
      setTimeout(function() {
        preloader.setAttribute("style", "display: none;");

        $('body').children().removeClass('visually-hidden');

        $(window).on("scroll", showSkills);
      }, 0);

      clearInterval(preloaderInterval);
    }
  }, 100 / 240);

window.onload = function() {
  clearInterval(preloaderInterval);

  $('body').children().removeClass('visually-hidden');

  preloaderText.textContent = "100%";

  setTimeout(function() {
    preloader.setAttribute("style", "display: none;");
    $(window).on("scroll", showSkills);
  }, 100);
};

//flip auth
$(function() {
  $(".welcome__auth-btn").on("click", function(e) {
    e.preventDefault();

    $(this).addClass("welcome__auth-btn--active");
    $(".welcome__form--front").addClass("welcome__form--front-active");
    $(".welcome__form--back").addClass("welcome__form--back-active");
  });

  $(".to_main").on("click", function(e) {
    e.preventDefault();

    $(".welcome__auth-btn").removeClass("welcome__auth-btn--active");
    $(".welcome__form--front").removeClass("welcome__form--front-active");
    $(".welcome__form--back").removeClass("welcome__form--back-active");
  });
});

//full-screen menu по клику на бургер
$(function() {
  $(".hero__burger-menu").on("click", function(e) {
    e.preventDefault();

    $(".hero__burger-menu").toggleClass("menu-on");
    $(".full-screen-menu").toggleClass("full-screen-menu__active");
  });
});

//full-screen menu появление слева и справа + текст меню
$(function() {
  $(".hero__burger-menu").on("click", function(e) {
    e.preventDefault();

    $(".full-screen-menu__left").toggleClass("animated slideInLeft");
    $(".full-screen-menu__right").toggleClass("animated slideInRight");
    $(".full-screen-menu__item").toggleClass("animated zoomIn");

    //close menu on ESC
    $(document).on("keydown", function(e) {
      if (e.keyCode === 27) {
        $(".full-screen-menu").removeClass("full-screen-menu__active");
        $(".hero__burger-menu").removeClass("menu-on");
      }
    });
  });
});

// skills, function on scroll
function showSkills() {
  $(".skills-list__item").each(function() {
    if ($(window).scrollTop() > $(this).offset().top - ($(window).height() / 2)) {
      $(this)
        .find('[class^="circle"]')
        .addClass("circle-active");
    }
  });
}

//google map
function initMap() {
  var center = { lat: 59.9450154, lng: 30.3085512 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: center,
    scrollwheel: false,
    styles: [
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [
          {
            color: "#f2f2f2"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "all",
        stylers: [
          {
            saturation: -100
          },
          {
            lightness: 45
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
          {
            visibility: "simplified"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          {
            color: "#00BFA5"
          },
          {
            visibility: "on"
          }
        ]
      }
    ]
  });
}

//blur
$(function() {
  var blur = (function() {
    var wrapper = document.querySelector(".blur-wrapper"),
      form = document.querySelector(".reviews__form--blur");

    return {
      set: function() {
        var imgWidth = document.querySelector(".reviews__background-wrapper")
            .offsetWidth,
          posLeft = -wrapper.offsetLeft,
          posTop = -wrapper.offsetTop,
          blurCSS = form.style;

        blurCSS.backgroundSize = imgWidth + "px" + " " + "auto";
        blurCSS.backgroundPosition = posLeft + "px" + " " + posTop + "px";
      }
    };
  })();

  blur.set();

  window.onresize = function() {
    blur.set();
  };
});

//parallax index
$(function() {
  const parallaxContainer = document.getElementById("parallax");
  const layers = parallaxContainer.children;

  const moveLayers = e => {
    const initialX = window.innerWidth / 2 - e.pageX;
    const initialY = window.innerHeight / 2 - e.pageY;

    let i = 0;
    for (let layer of layers) {
      const divider = i / 100;
      const positionX = initialX * divider;
      const positionY = initialY * divider;
      const bottomPosition = window.innerHeight / 2 * divider;
      const image = layer.firstElementChild;

      layer.style.transform = `translate(${positionX}px, ${positionY}px)`;
      image.style.bottom = `-${bottomPosition}px`;
      i++;
    }
  };

  window.addEventListener("mousemove", moveLayers);
});

//parallax scroll
$(function() {});

// Slider
(function($) {
  "use strict";
  var slider = {
    init: function() {
      $(".slider__menu--prev").on("click", this.prevSlide);
      $(".slider__menu--next").on("click", this.nextSlide);
    },
    prevSlide: function(event) {
      event.preventDefault();

      var thumbIndex = $(this)
          .parent()
          .find("img.slider__thumb--visible")
          .data("slide-thumb"),
        $targetSlide = $(".slider").find('[data-slide="' + thumbIndex + '"]'),
        prevIndex =
          thumbIndex - 1 <= 0
            ? $(this)
                .parent()
                .find("img").length
            : thumbIndex - 1,
        $targetThumb = $(this)
          .parent()
          .find('img[data-slide-thumb="' + prevIndex + '"]');

      $(this)
        .parent()
        .find("img.slider__thumb--visible")
        .removeClass("slider__thumb--visible");

      $(".slider__slide--active").removeClass("slider__slide--active");

      $targetThumb.addClass("slider__thumb--visible");

      $targetSlide.addClass("slider__slide--active");

      $(".slider__menu--next")
        .parent()
        .find("img.slider__thumb--visible")
        .removeClass("slider__thumb--visible");

      var nextIndex =
        thumbIndex + 1 >
        $(this)
          .parent()
          .find("img").length
          ? 1
          : thumbIndex + 1;

      $(".slider__menu--next")
        .parent()
        .find('img[data-slide-thumb="' + nextIndex + '"]')
        .addClass("slider__thumb--visible");
    },
    nextSlide: function(event) {
      event.preventDefault();

      var thumbIndex = $(this)
          .parent()
          .find("img.slider__thumb--visible")
          .data("slide-thumb"),
        $targetSlide = $(".slider").find('[data-slide="' + thumbIndex + '"]'),
        nextIndex =
          thumbIndex + 1 >
          $(this)
            .parent()
            .find("img").length
            ? 1
            : thumbIndex + 1,
        $targetThumb = $(this)
          .parent()
          .find('img[data-slide-thumb="' + nextIndex + '"]');

      $(this)
        .parent()
        .find("img.slider__thumb--visible")
        .removeClass("slider__thumb--visible");

      $(".slider__slide--active").removeClass("slider__slide--active");

      $targetThumb.addClass("slider__thumb--visible");

      $targetSlide.addClass("slider__slide--active");

      $(".slider__menu--prev")
        .parent()
        .find("img.slider__thumb--visible")
        .removeClass("slider__thumb--visible");

      var prevIndex =
        thumbIndex - 1 <= 0
          ? $(this)
              .parent()
              .find("img").length
          : thumbIndex - 1;

      $(".slider__menu--prev")
        .parent()
        .find('img[data-slide-thumb="' + prevIndex + '"]')
        .addClass("slider__thumb--visible");
    }
  };

  $(document).ready(function() {
    slider.init();
  });
})(jQuery);
