//flip auth
$(function() {
  $('.welcome__auth-btn').on('click', function(e) {
    e.preventDefault();

    $(this).toggleClass('welcome__auth-btn--active');

    $('.welcome__form--front').toggleClass('welcome__form--front-active');

    $('.welcome__form--back').toggleClass('welcome__form--back-active');
  })
});

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