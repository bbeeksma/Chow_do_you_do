$(document).ready(function(){
  //later I will need to check local storage before rendering it.
  $('.sign-in').show();
  $('#home').show();
  $('#sign-in-form').submit(function(e){
    e.preventDefault();
    $('.sign-in').hide();
  });
  app.recipeController.submitListener();
  $('.toggleMenu').on('click', function(){
    $('.mainNav').toggleClass('show');
    $('.toggleMenu').toggleClass('fa-toggle-down').toggleClass('fa-toggle-up');
  });
  $('.mainNav a').on('click', function(){
    $('.mainNav').toggleClass('show');
    $('.toggleMenu').toggleClass('fa-toggle-down').toggleClass('fa-toggle-up');
  });
  $('.getRecipes').on('click', function(){
    $('.tab-content').hide();
    $('#recipe').fadeIn();
  });

  app.Recipe.fetchRandomRecipes();

});
$('.toggleForm').on('click', function (){
  $('.expandForm').toggleClass('hide');
  $('.toggleForm').toggleClass('fa-minus-square-o').toggleClass('fa-plus-square-o');

});
$("input[type='checkbox']").change(function(){
  $(this).parent().toggleClass('selected');
});
