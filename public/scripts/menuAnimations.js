/*var shoo = function (){
  $('.toggleMenu').on('click', function(){
    $('.mainNav').toggleClass('show');
    $('.toggleMenu').toggleClass('fa-toggle-down').toggleClass('fa-toggle-up');
  });
};
var pow = function (){
  $();
};*/
$('.toggleMenu').on('click', function(){
  $('.mainNav').toggleClass('show');
  $('.toggleMenu').toggleClass('fa-toggle-down').toggleClass('fa-toggle-up');
});
$(document).ready(function(){
  //later I will need to check local storage before rendering it.
  $('.sign-in').show();
  $('#home').show();
});
