$(document).ready(function () {
  charCounter()
  charCounterWarnings()
  toggleTextArea()
});

const charCounter = () => {
  const $textInput = $(document).find('textarea')
  $textInput.on('input', () => {
    let counter = $(document).find('output')
    counter.val(140 - $textInput.val().length);
  });
}

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

// function to show and hide input area
const toggleTextArea = () => {
  const $inputArea = $('main section').first()
  $('#compose').on('click', () => {
    $inputArea.slideToggle(700);
  })
}
