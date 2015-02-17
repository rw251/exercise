window.$ = window.jQuery = require('./jquery/jquery-1.11.2.min.js');
require('./bootstrap/bootstrap-3.3.2.min.js');
require('./bootstrap/bootstrap-datepicker-1.3.1.min.js');

$(document).on('ready', function(){
    var m_names = new Array("January", "February", "March", 
    "April", "May", "June", "July", "August", "September", 
    "October", "November", "December");
    var today = new Date();
    
    $('#workout').on('submit', function(e){
        e.preventDefault();
        
        alert('submitted!');
    });
   
   $('#when-picker')
    .datepicker({
        "endDate" : today
    })
    .on('changeDate', function(e){
        var d = e.date;
        $('#when').val(d.getDate() + "-" + m_names[d.getMonth()] + "-" + d.getFullYear());
    });
    $('#when-picker').datepicker('update', new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    $('#when').val(today.getDate() + "-" + m_names[today.getMonth()] + "-" + today.getFullYear());
});
