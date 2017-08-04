$(document).ready(function(){
  $('#sign-in-form').submit(function(e){
    e.preventDefault();
    //$('#submit-username').attr('disabled', 'disabled');
    var username = $('#username').val();
    window.localStorage.setItem('userName', username);
    submitUser(username);
    $('.sign-in').hide();

    $('.mainNav').find('[data-content=home]').click();
  });
  function submitUser (username) {
    $.post('/users',{user_name: username});
  }
});
