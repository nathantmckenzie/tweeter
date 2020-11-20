$(document).ready(function() {

const $form = $('.tweet-submission');
const $textArea = $('#tweet-text');
const $tweetsContainer = $('#tweets-container');

const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


const createTweetElement = function(tweet) {
  const safeHTML = `${escape(tweet.content.text)}`;
  let tweetOutput = $(`
  <section id="tweet-container">
  <br>
  <article class="tweet">
  <header class="tweet-header">
  <img class="tweet-avatar" src="${tweet.user.avatars}">
  <span class="tweet-username" src="${tweet.user.name}">
  <span class="tweet-handle" src="${tweet.user.handle}">
  </header>
  <h3>
  ${safeHTML};
  </h3>
  <p>10 days ago</p>
  </header>
   </article>
   </section>
  `);
  return tweetOutput;
}

const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    //let result = {};
    for (let tweet of tweets) {
        $tweetsContainer.prepend(createTweetElement(tweet));
    }
  }

 
const loadTweets = function() {
   $.ajax({
     url: '/tweets',
     method: "GET",
     dataType: "json",
     success: (tweets) => { renderTweets(tweets) }
   })
}

$form.on('submit', function (event) {
    event.preventDefault();
    if ($textArea.val() === '') {
        alert("Missing Input");
    } else if ($textArea.val().length > 140) {
        alert("Character Limit Exceeded");
    } else {
      const serializedData = $(this).serialize();
       $.post('/tweets', serializedData)
       .then(() => {
        $form.trigger('reset');
        loadTweets();
        console.log("Sucess: ", data);
       }).catch(function (data) {
         console.log("Error: ", data);
       });
    }
    })



});