'use strict';

var baseUrl = 'http://localhost:5000';

$('#discoverButton').on('click', function () {
    removeAlerts();
    var username = $('#username').val();
    if (username == '') {
        addAlert(`You must enter a valid username.`);
        return;
    }
    var min = $('#min').val();
    if (min == '') {
        min = '2';
    }
    if (min == '1') {
        addAlert('The minimum number of mutual followers is 2.');
        return;
    }
    $.ajax({
        url: `${baseUrl}/api/soundcloud?username=${username}&min=${min}`,
        timeout: 0
    })
    .done(function(data) {

    })
    .fail(function(xhr, status, error) {
        addAlert(`${status}: ${error}`);
    });
});

function startRequest() {
    $('#discoverButton').addClass('invisible');
    $('#progress-bar').removeClass('invisible');
}

function addAlert(text) {
    $('#alert-div').append('div').addClass('alert alert-danger').text(text);
}

function removeAlerts() {
    $('#alert-div').children().remove();
}
