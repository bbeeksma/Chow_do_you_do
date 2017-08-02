$('.toggleMenu').on('click', function(){
  $('.mainNav').toggleClass('show');
  $('.toggleMenu').toggleClass('fa-sort-desc').toggleClass('fa-times');
});

$(document).ready(function(){
  $('#home').show();
});
