$(document).ready (() => {

// Fake data taken from initial-tweets.json
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  let result = {};
  for (let tweet in tweets) {
      result = createTweetElement(tweet);
      $('.container').append(result);
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

renderTweets(data);

});