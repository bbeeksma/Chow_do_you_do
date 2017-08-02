$('.toggleMenu').on('click', function(){
  $('.mainNav').toggleClass('show');
  $('.toggleMenu').toggleClass('fa-toggle-down').toggleClass('fa-toggle-up');
});
$('.mainNav a').on('click', function(){
  $('.mainNav').toggleClass('show');
  $('.toggleMenu').toggleClass('fa-toggle-down').toggleClass('fa-toggle-up');

});
$(document).ready(function(){
  $('#home').show();
});
