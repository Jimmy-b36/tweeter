$(document).ready(function () {
  $('#tweet-form-submit').on('submit', onSubmit);
  loadTweets();

});

//helper function for warnings
const warningHelpers = (form) => {
  $('.warning').remove();
  if (form === 'text=') {
    const noTextWarning = $(`<h3 class='red warning'>Nothing in the box!</h3>`);
    $(noTextWarning).insertAfter('#input-btn');
    return true;
  }
  if (form.length > 145) {
    const tooLongWarning = $(
      `<h3 class='red warning'>Too many characters!</h3>`
    );
    $(tooLongWarning).insertAfter('#input-btn');
    return true;
  }
  return false;
};

//function to creat the tweet html
const createTweetElement = (tweet) => {
  const $tweet = $(`<article class="tweet-box centered">
    <header class="new-tweet-header">
    <div class="new-tweet-header">
    <img src="${safeEscape(tweet.user.avatars)}" alt="profile-picture" />
    <p>${safeEscape(tweet.user.name)}</p>
    </div>
    <p class="handle"><b>${safeEscape(tweet.user.handle)}</b></p>
    </header>
    <div>
    <p><b>${safeEscape(tweet.content.text)}</b></p>
    </div>
    <footer class="new-tweet-footer">
    <div>
    <p>${timeago.format(safeEscape(tweet.created_at))}</p>
    </div>
    <div>
    <i class="fa-solid fa-bookmark"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart-circle-plus"></i>
    </div>
    </footer>
    </article>`);
  return $tweet;
};

// function to create the tweets html and then prepend them
const renderTweets = function (tweets) {
  const $container = $('#new-tweet-container');
  for (const tweet of tweets) {
    const newTweet = createTweetElement(tweet);
    $container.prepend(newTweet);
  }
};

//function to load the tweets on the page
const loadTweets = () => {
  $.get('/tweets/').then(function (response) {
    renderTweets(response);
  });
};

//function to submit tweets to the database
const onSubmit = function (evt) {
  evt.preventDefault();
  const data = $(this).serialize();

  if (warningHelpers(data)) return;

  $('textarea').val('');
  $('.counter').val(140);

  $.post('/tweets', data)
    .then(function (res) {
      $('.tweet-box').replaceWith(loadTweets());
    });
}

const safeEscape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};