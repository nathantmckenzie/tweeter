
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  let result = {};
  for (let tweet in tweets) {
      result = createTweetElement(tweet);
      $('#tweets-container').append(result);
  }
  return result; 
}

const createTweetElement = function(tweet) {
  let $tweet = $(`
  <br>
  <article class="tweet">
  <header class="tweet-header">
  <img class="tweet-avatar" src="${tweet.user.avatars}">
  <span class="tweet-username" src="${tweet.user.name}">
  <span class="tweet-handle" src="${tweet.user.handle}">
  <h3>
  ${tweet.content.text};
  </h3>
  <p>10 days ago</p>
  </header>
   </article>
  `);
  return $tweet;
}

const tweetSubmit = function() {
    $('.tweet-submission').on('submit', function (event) {
    const text = $(this).serialize();
    event.preventDefault();
    })
    if ($('#tweet-text').val() === '') {
        alert("Missing Input");
    } else if ($('#tweet-text').val().length > 140) {
        alert("Character Limit Exceeded");
    } else {
       $.ajax({
           type: "POST",
           url: "/tweets",
           data: text
       }).then(function (data) {
        $('.tweet-submission').trigger('reset')
       })
    }
}

const loadTweets = function() {
   $.ajax({
     type: "GET",
     url: '/tweets',
     dataType: 'json'
   }).then(function (data) {
     renderTweets(data);
   })

}



$(document).ready (() => {

});