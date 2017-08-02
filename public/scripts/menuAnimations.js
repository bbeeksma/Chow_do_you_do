
$(document).ready(function(){
  $('#home').show();
<<<<<<< 429a9004bd7d1609b741a060fabfaebcb91ee913
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
=======
  app.Recipe.fetchRandomRecipes()
>>>>>>> rendering random recipes on page load
});
