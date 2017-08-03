//Event handlers to listen for swiping on recipe-result class

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
      //TODO:Get next recipe
      app.Recipe.getNextRecipe();
    } else {
      /* right swipe */
      console.log('swiped right');
      $(this).hide('slide', { direction: 'right' }, 200);
      //TODO:get previous recipe
      app.Recipe.getPreviousRecipe();
    }
  } else {
    if ( yDiff > 0 ) {
      /* up swipe */
      console.log('swiped up');
      $(this).hide('slide', { direction: 'up' }, 200);
      //TODO:Delete recipe
      app.Recipe.deleteRecipe();
    } else {
      /* down swipe */
      console.log('swiped down');
      $(this).hide('slide', { direction: 'down' }, 200);
      //TODO:Save Recipe
      app.Recipe.saveRecipe();
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
};
