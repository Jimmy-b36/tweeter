$(document).ready(function () {
  $('#tweet-text').on('input', () => {
    $('.counter').val(140 - $('#tweet-text').val().length);
  });
});

$(document).ready(function () {
  $('#tweet-text').on('keydown keyup change', function (event) {
    if ($(this).val().length > 140) {
      $('.counter').addClass('red');
    } else {
      $('.counter').removeClass('red');
    }

    if (
      $(this).val().length >= 145 &&
      event.keyCode !== 46 && // keycode for delete
      event.keyCode !== 8 // keycode for backspace
    ) {
      event.preventDefault();
    }
  });
});
