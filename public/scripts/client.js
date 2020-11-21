$(document).ready(function() {

const $errorShort = $('#error-short');
const $errorLong = $('#error-long');
const $form = $('.tweet-submission');
const $textArea = $('#tweet-text');
const $tweetsContainer = $('#tweets-container');
const $newTweet = $('.new-tweet');
const $counter = $('.counter');
const newTweet = function() {
  $newTweet.on('click', function() {
    $textArea.focus();
  })
}

newTweet();
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const safeHTML = `${escape(tweet.content.text)}`;
  let $tweetOutput = $(`
  <article class="tweet">
  <header class="tweet-header">
    <img class="tweet-avatar" src="${tweet.user.avatars}" />
    <span class="tweet-username">${tweet.user.name}</span>
    <span class="tweet-handle">${tweet.user.handle}</span>
    </header>
  <h3>${safeHTML}</h3>
  <footer class="tweet-footer">
    <h4 class="tweet-date">10 days ago</h4>
    <div class="tweet-icons">
      <i class="fa fa-flag"></i>
      <i class="fa fa-heart"></i>
      <i class="fa fa-retweet"></i>
    </div>
    </footer>
  </article> 
  `);
  return $tweetOutput;
}

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    $tweetsContainer.prepend(createTweetElement(tweet));
  }
}

const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: "GET",
    dataType: "json",
    success: (tweets) => {
      renderTweets(tweets)
    }
  })
}
loadTweets();

$form.on('submit', function(event) {
  event.preventDefault();
  $errorShort.slideUp(1000);
  $errorLong.slideUp(1000);
  if ($textArea.val().length <= 0) {
    $errorShort.slideDown(1000);
    /*$errorMessage.slideDown(1000);*/
  } else if ($textArea.val().length > 140) {
    $errorLong.slideDown(1000);
  } else {
    const serializedData = $(this).serialize();
    $.post('/tweets', serializedData)
      .then((data) => {
        $form.trigger('reset');
        $counter.val(140);
        loadTweets();
        console.log("Sucess: ", data);
      }).catch(function(data) {
        console.log("Error: ", data);
      });
  }
})
});
