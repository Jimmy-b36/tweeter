$(document).ready(function () {
  const $textInput = $(this).find('textarea')
  $textInput.on('input', () => {
    let counter = $(this).find('output')
    counter.val(140 - $textInput.val().length);
  });

  charCounterWarnings()
});


const charCounterWarnings = () => {
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
}