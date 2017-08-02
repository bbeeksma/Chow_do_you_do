
$(document).ready(function(){
  $('#home').show();
  recipeController.submitListener();
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
});
