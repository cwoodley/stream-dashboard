$(document).ready(function(){

  $('#timers .time').timepicker({
    'timeFormat': 'g:ia'
  });

  $('#timers .date').datepicker({
    'format': 'yyyy-mm-dd',
    'autoclose': true
  });

  function formatEndingTime(){
    var timeEnd = moment($('#timeEnd').val(),'HH:mm:a').format('HH:mm');
    var dateEnd = $('#dateEnd').val();
    var endTimeDate = dateEnd + " " + timeEnd;

    $('#timerFinish').val(endTimeDate)
    console.log('end time: ' + endTimeDate)
  }

  $('#setTime').on('click', function(){
    formatEndingTime()
  });
  
});
