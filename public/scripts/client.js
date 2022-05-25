$(document).ready(function () {
  //function to creat the tweet html
  const createTweetElement = (tweet) => {
    const $tweet = $(`<article class="tweet-box centered">
    <header class="new-tweet-header">
    <div class="new-tweet-header">
    <img src="${tweet.user.avatars}" alt="profile-picture" />
    <p>${tweet.user.name}</p>
    </div>
    <p class="handle"><b>${tweet.user.handle}</b></p>
    </header>
    <div>
    <p><b>${tweet.content.text}</b></p>
    </div>
    <footer class="new-tweet-footer">
    <div>
    <p>${timeago.format(tweet.created_at)}</p>
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

  //function to load the tweets on the page
  const loadTweets = () => {
    $.ajax('/tweets', { type: 'GET' }).then(function (response) {
      for (const tweet of response) {
        const newTweet = createTweetElement(tweet);
        $('#new-tweet-container').append(newTweet);
      }
    });
  };

  //function to submit tweets to the database
  const tweetSubmit = () => {
    $('#tweet-form-submit').submit(function (e) {
      e.preventDefault();
      const form = $(this).serialize();
      if (warningHelpers(form)) return;
      $.ajax('http://localhost:8080/tweets/', { type: 'POST', data: form });
      loadTweets();
    });
  };
  tweetSubmit();
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
    const tooLongWarning = $(`<h3 class='red warning'>Too much Text!</h3>`);
    $(tooLongWarning).insertAfter('#input-btn');
    return true;
  }
  return false;
};
