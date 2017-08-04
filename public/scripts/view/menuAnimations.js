$(document).ready(function(){

  $('.tab-content').hide();
  $('.sign-in').show();

  $('#home').show();
  app.recipeController.submitListener();
  menuAnimations();
  $('.getRecipes').on('click', function(){
    $('.tab-content').hide();
    $('#recipe').fadeIn();
  });

  $(document).on('touchstart', '.recipe', handleTouchStart);
  $(document).on('touchmove', '.recipe', handleTouchMove);

  $('#left-recipe').on('click', console.log('stuf')); //app.Recipe.getNextRecipe(event,$(event.target).closest('div')));
  $('#right-recipe').on('click', console.log('stuf')); //app.Recipe.getPreviousRecipe(event,$(event.target).closest('div')));
});

function menuAnimations(){
  $('.toggleMenu, .mainNav a').on('click', function(){
    if ($('.fa-toggle-down, .fa-toggle-up').is(':visible')){
      $('.mainNav').toggleClass('show');
      $('.toggleMenu').toggleClass('fa-toggle-down').toggleClass('fa-toggle-up');
    }
  });
}
function formAnimations(){
  if ($('.fa-minus-square-o, .fa-plus-square-o').is(':visible')){
    $('.expandForm').toggleClass('hideMobile');
    $('.toggleForm').toggleClass('fa-minus-square-o').toggleClass('fa-plus-square-o');
  }
}

$('.toggleForm').on('click', function (){
  $('.expandForm').toggleClass('hideMobile');
  $('.toggleForm').toggleClass('fa-minus-square-o').toggleClass('fa-plus-square-o');

});
$("input[type='checkbox']").change(function(){
  $(this).parent().toggleClass('selected');
});
