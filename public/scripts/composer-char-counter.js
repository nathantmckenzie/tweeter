$(document).ready(() => {
    
    $('#tweet-text').on('input', function() {
      const value = 140 - $(this).val().length;
      const counter = $(this).parent().find('#counterNumber');
      counter.text(value);
      if (value < 0) {
        counter.addClass('red-font');
      } else {
        counter.removeClass('red-font');
      }
    });
  });


  $('#tweet-text').on('input', function() {
    const value = 140 - $(this).val().length;
    const counter  = $(this).parent().find("counterNumber");
    counter.text(value);
    if (value < 0) {
        counter.addClass('red-font');
    } else {
        counter.removeClass('red-font');
    }

  });