$(document).ready(function(){

  $('.tab-content').hide();
  $('.sign-in').show();

  $('#home').show();
  $('#sign-in-form').submit(function(e){
    e.preventDefault();
    $('.sign-in').hide();
  });
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
function formAnimations(){
  if ($('.fa-minus-square-o, .fa-plus-square-o').is(':visible')){
    $('.expandForm').toggleClass('hideMobile').toggleClass('fa-minus-square-o').toggleClass('fa-plus-square-o');
  }
}

$('.toggleForm').on('click', function (){
  $('.expandForm').toggleClass('hideMobile');
  $('.toggleForm').toggleClass('fa-minus-square-o').toggleClass('fa-plus-square-o');

});
$("input[type='checkbox']").change(function(){
  $(this).parent().toggleClass('selected');
});
