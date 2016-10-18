$(document).ready(function(){
  var tickerItems = []

  $('#ticker-save').on('click', function(){
    $('.ticker-itemInput').each(function(){
      var text = $(this).val();
      tickerItems.push(text)
    });

    console.log(tickerItems);
  });



});
