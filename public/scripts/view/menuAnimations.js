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

  $(document).on('click', '.mainNav li', function(e){
    if($(e.target).data('content') === 'home'){
      console.log('fire that shit');
      app.Recipe.getSavedRecipies();
    }
    else if ($(e.target).data('content') === 'recipes') {
      app.Recipe.all = [];
    }
  });

  $('#left-recipes').on('click', function(e){
    app.Recipe.getNextRecipe($(e.target).closest('div').next());
  });
  $('#right-recipes').on('click', function(e){
    app.Recipe.getPreviousRecipe($(e.target).closest('div').next());
  });

  $('#left-home').on('click', function(e){
    app.Recipe.getNextRecipe($(e.target).closest('div').next());
  });
  $('#right-home').on('click', function(e){
    app.Recipe.getPreviousRecipe($(e.target).closest('div').next());
  });

  $('#delete').on('click', function(e){
    console.log(JSON.stringify(app.Recipe.all[Math.abs(app.Recipe.currentRecipe % app.Recipe.all.length)]));
    app.Recipe.deleteRecipe(JSON.stringify(app.Recipe.all[Math.abs(app.Recipe.currentRecipe % app.Recipe.all.length)]));
  });
  $('#save-recipes').on('click', function(e){
    app.Recipe.saveRecipe(JSON.stringify(app.Recipe.all[Math.abs(app.Recipe.currentRecipe % app.Recipe.all.length)]));
  });

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
