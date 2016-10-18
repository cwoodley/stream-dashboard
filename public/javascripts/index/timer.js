var socket = io('//localhost:3000');

function startTheClock(end){
  var now = moment().format('YYYY-MM-DD H:mm');
  var timeObject = moment(now).countdown(end,countdown.HOURS|countdown.MINUTES, NaN, 2);

  $('#timer .hours').text(timeObject.hours + 'h');
  $('#timer .minutes').text(timeObject.minutes + 'm');

}

socket.on('timerFinish', function (data) {
  startTheClock(data);
  setInterval(function() {startTheClock(data)}, 60000);
});
