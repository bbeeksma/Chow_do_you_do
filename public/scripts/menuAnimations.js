
$(document).ready(function(){
  $('.tab-content').hide();
  $('#home').show();

  app.recipeController.submitListener();
  menuAnimations();
  $('.getRecipes').on('click', function(){
    $('.tab-content').hide();
    $('#recipe').fadeIn();
  });

  app.Recipe.fetchRandomRecipes();

});

function menuAnimations(){
  $('.toggleMenu, .mainNav a').on('click', function(){
    if ($('.fa-toggle-down, .fa-toggle-up').is(':visible')){
      $('.mainNav').toggleClass('show');
      $('.toggleMenu').toggleClass('fa-toggle-down').toggleClass('fa-toggle-up');
    }
  });
}

$('.toggleForm').on('click', function (){
  $('.expandForm').toggleClass('hide');
  $('.toggleForm').toggleClass('fa-minus-square-o').toggleClass('fa-plus-square-o');

});
$("input[type='checkbox']").change(function(){
  $(this).parent().toggleClass('selected');
});
