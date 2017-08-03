$('.recipe-result').on('touchstart', handleTouchStart);
$('.recipe-result').on('touchmove', handleTouchMove);

var xDown = null;
var yDown = null;

function handleTouchStart(event) {
  xDown = event.touches[0].clientX;
  yDown = event.touches[0].clientY;
};

function handleTouchMove(event) {
  if ( ! xDown || ! yDown ) {
    return;
  }

  var xUp = event.touches[0].clientX;
  var yUp = event.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
    if ( xDiff > 0 ) {
          /* left swipe */
      console.log('swiped left');
      $(this).hide('slide', { direction: 'left' }, 200);

    } else {
      /* right swipe */
      console.log('swiped right');
      $(this).hide('slide', { direction: 'right' }, 200);
    }
  } else {
    if ( yDiff > 0 ) {
      /* up swipe */
      console.log('swiped up');
      $(this).hide('slide', { direction: 'up' }, 200);
    } else {
      /* down swipe */
      console.log('swiped down');
      $(this).hide('slide', { direction: 'down' }, 200);
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
};
