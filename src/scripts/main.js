window.$ = window.jQuery = require('./jquery/jquery-1.11.2.min.js');
require('./bootstrap/bootstrap-3.3.2.min.js');
require('./bootstrap/bootstrap-datepicker-1.3.1.min.js');


$(document).on('ready', function() {
    

    $.ajax({
        url: 'https://spreadsheets.google.com/feeds/list/1eos1SKS1ujsa0cdI1oSRVK3LqlVFXOMXfUw15p2tuho/1/public/values?alt=json-in-script&callback=?',
        type: 'get',
        dataType: "jsonp",
        success: function(json) {
            console.log(json);
        }
    });

    var m_names = new Array("January", "February", "March",
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December");
    var today = new Date();
    var pad = function(x) {
        if (x < 10) return '0' + x;
        else return x;
    };

    $('#workout').on('submit', function(e) {
        e.preventDefault();

        var a = $('#when-picker').datepicker('getDate');
        a = a.getFullYear() + '-' + pad(a.getMonth() + 1) + '-' + pad(a.getDate());
        var b = $('input:radio[name="what"]:checked').val();
        var c = $('#length').val();

        $.ajax({
            url: "https://docs.google.com/forms/d/16A4RNnGW-r5gRl-OeNsvSBD0aC_JlLUpiGgfhELabsM/formResponse",
            data: {
                'entry.802321403': a,
                'entry.1254473399': b,
                'entry.1755032875': c
            },
            type: "POST",
            dataType: "xml",
            statusCode: {
                0: function() {
                    //Success message
                },
                200: function() {
                    alert("!");
                }
            }
        });
    });

    $('#when-picker')
        .datepicker({
            "endDate": today
        })
        .on('changeDate', function(e) {
            var d = e.date;
            $('#when').val(d.getDate() + "-" + m_names[d.getMonth()] + "-" + d.getFullYear());
        });
    $('#when-picker').datepicker('update', new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    $('#when').val(today.getDate() + "-" + m_names[today.getMonth()] + "-" + today.getFullYear());

    var isValid = function() {
        return $('input[name="what"]:checked').length > 0 && $('#length').val() !== "";
    };

    $('#length,input[name="what"]').on('change keyup', function() {
        console.log("event");
        if (isValid()) {
            $('#subBtn').removeAttr('disabled');
        }
        else {
            $('#subBtn').attr('disabled', 'disabled');
        }
    });
});
