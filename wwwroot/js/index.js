'use strict';

var baseUrl = 'http://discover-soundcloud.golf1052.com';

$('#discoverButton').on('click', function () {
    removeAlerts();
    var username = $('#username').val();
    if (username == '') {
        addAlert(`You must enter a valid username.`);
        return;
    }
    var minStr = $('#min').val();
    if (minStr == '') {
        minStr = '5';
    }
    var min = parseInt(minStr);
    if (isNaN(min)) {
        addAlert('Minimum must be a number.')
        return;
    }
    if (min < 2) {
        addAlert('The minimum number of mutual followers is 2.');
        return;
    }
    startRequest();
    $.ajax({
        url: `${baseUrl}/api/soundcloud?username=${username}&min=${min}`,
        timeout: 0
    })
    .done(processData)
    .fail(function(xhr, status, error) {
        addAlert(`${status}: ${error}`);
    });
});

function startRequest() {
    $('#discoverButton').addClass('invisible');
    $('#progress-bar-div').removeClass('invisible');
}

function finishRequest() {
    $('#discoverButton').removeClass('invisible');
    $('#progress-bar-div').addClass('invisible');
}

function addAlert(text) {
    var alert = $('<div></div>').addClass('alert alert-danger').text(text);
    $('#alert-div').append([alert]);
}

function removeAlerts() {
    $('#alert-div').children().remove();
}

function processData(data) {
    var contentDiv = $('#content');
    contentDiv.children().remove();
    var progressBar = $('#progress-bar');
    progressBar.addClass('bg-success')
        .removeClass('progress-bar-striped progress-bar-animated')
    setProgressBarValue(0);
    var cardDiv = createAppend(contentDiv, 'div')
        .addClass('card-columns');
    for (var i = 0; i < data.length; i++) {
        var mutual = data[i];
        var card = createElement('div')
            .addClass('card')
            .width('20rem');
        createAppend(card, 'img')
            .addClass('card-img-top')
            .attr('src', mutual.mutual.image);
        var cardBody = createAppend(card, 'div')
            .addClass('card-body');
        var cardBodyHeader = createAppend(cardBody, 'h4')
            .addClass('card-title');
        createAppend(cardBodyHeader, 'a')
            .attr('href', mutual.mutual.url)
            .attr('target', '_blank')
            .text(mutual.mutual.username);
        createAppend(cardBody, 'p')
            .addClass('card-text')
            .text(`Mutual followers: ${mutual.followed_by.length}`);
        var toggleButtonDiv = createAppend(card, 'div')
            .addClass('text-center');
        createAppend(toggleButtonDiv, 'button')
            .addClass('btn btn-primary')
            .attr('type', 'button')
            .attr('data-toggle', 'collapse')
            .attr('data-target', `#toggle_${mutual.mutual._id}`)
            .attr('aria-expanded', false)
            .attr('aria-controls', `#toggle_${mutual.mutual._id}`)
            .text('Show/Hide followers');
        var followersDiv = createAppend(card, 'div')
            .addClass('collapse')
            .attr('id', `toggle_${mutual.mutual._id}`);
        var followers = createAppend(followersDiv, 'ul')
            .addClass('list-group list-group-flush');
        for (var j = 0; j < mutual.followed_by.length; j++) {
            var follower = mutual.followed_by[j];
            var item = createAppend(followers, 'li')
                .addClass('list-group-item');
            createAppend(item, 'a')
                .attr('href', follower.url)
                .attr('target', '_blank')
                .text(follower.username);
        }
        cardDiv.append([card]);
        setProgressBarValue((i + 1) / data.length);
    }
    progressBar.removeClass('bg-success')
        .addClass('progress-bar-striped progress-bar-animated');
    setProgressBarValue(100);
    finishRequest();
}

function setProgressBarValue(value) {
    $('#progress-bar')
        .attr('aria-valuenow', value)
        .width(`${value}%`);
}

function createAppend(obj, tag) {
    var element = createElement(tag);
    obj.append([element]);
    return element;
}

function createElement(tag) {
    return $(`<${tag}></${tag}>`);
}

function sampleData() {
    return [
        {
            "mutual": {
                "_id": 8873989,
                "url": "http://soundcloud.com/kerokerobonito",
                "username": "Kero Kero Bonito",
                "image": "https://i1.sndcdn.com/avatars-000096776526-5d3mvu-large.jpg"
            },
            "followed_by": [
                {
                    "_id": 200235,
                    "url": "http://soundcloud.com/markredito",
                    "username": "Mark Redito",
                    "image": "https://i1.sndcdn.com/avatars-000313535771-jfvy5s-large.jpg"
                },
                {
                    "_id": 92183354,
                    "url": "http://soundcloud.com/shhsecretsongs",
                    "username": "Secret Songs",
                    "image": "https://i1.sndcdn.com/avatars-000211409161-sy9y04-large.jpg"
                },
                {
                    "_id": 1571697,
                    "url": "http://soundcloud.com/absrdst",
                    "username": "ABSRDST",
                    "image": "https://i1.sndcdn.com/avatars-000314897217-8smon9-large.jpg"
                },
                {
                    "_id": 2869822,
                    "url": "http://soundcloud.com/anamanaguchi",
                    "username": "ANAMANAGUCHI",
                    "image": "https://i1.sndcdn.com/avatars-000300641951-buqamn-large.jpg"
                },
                {
                    "_id": 114629,
                    "url": "http://soundcloud.com/ryanhemsworth",
                    "username": "Ryan Hemsworth",
                    "image": "https://i1.sndcdn.com/avatars-000327156004-lvy2rf-large.jpg"
                },
                {
                    "_id": 3968267,
                    "url": "http://soundcloud.com/giraffage",
                    "username": "Giraffage",
                    "image": "https://i1.sndcdn.com/avatars-000327337191-0uih5n-large.jpg"
                },
                {
                    "_id": 18228471,
                    "url": "http://soundcloud.com/slime-girls",
                    "username": "Slime Girls",
                    "image": "https://i1.sndcdn.com/avatars-000185917602-9zvuu1-large.jpg"
                },
                {
                    "_id": 67527478,
                    "url": "http://soundcloud.com/in-love-with-a-ghost",
                    "username": "in love with a ghost",
                    "image": "https://i1.sndcdn.com/avatars-000294734092-g34d5t-large.jpg"
                },
                {
                    "_id": 2235601,
                    "url": "http://soundcloud.com/maxoelectronic",
                    "username": "Maxo",
                    "image": "https://i1.sndcdn.com/avatars-000332420364-70b6uv-large.jpg"
                },
                {
                    "_id": 48687019,
                    "url": "http://soundcloud.com/kokogane",
                    "username": "Kogane",
                    "image": "https://i1.sndcdn.com/avatars-000329325991-7gmtuy-large.jpg"
                },
                {
                    "_id": 238164376,
                    "url": "http://soundcloud.com/idolssakura",
                    "username": "🌸 IDOLS, SAKURA  🌸",
                    "image": "https://i1.sndcdn.com/avatars-000235674920-echwi8-large.jpg"
                },
                {
                    "_id": 31531137,
                    "url": "http://soundcloud.com/skylarspence",
                    "username": "SKYLAR SPENCE",
                    "image": "https://i1.sndcdn.com/avatars-000150338128-tloph8-large.jpg"
                },
                {
                    "_id": 1526116,
                    "url": "http://soundcloud.com/jaiwolfmusic",
                    "username": "Jai Wolf",
                    "image": "https://i1.sndcdn.com/avatars-000272773933-4dekp6-large.jpg"
                },
                {
                    "_id": 49295547,
                    "url": "http://soundcloud.com/macross-82-99",
                    "username": "✿ MACROSS 82-99 ✿",
                    "image": "https://i1.sndcdn.com/avatars-000310896365-nm6w4z-large.jpg"
                },
                {
                    "_id": 568232,
                    "url": "http://soundcloud.com/tomggg",
                    "username": "Tomggg",
                    "image": "https://i1.sndcdn.com/avatars-000153468386-xcqx83-large.jpg"
                },
                {
                    "_id": 7098329,
                    "url": "http://soundcloud.com/grynpyret",
                    "username": "Grynpyret",
                    "image": "https://i1.sndcdn.com/avatars-000289685825-biwhfy-large.jpg"
                },
                {
                    "_id": 87395711,
                    "url": "http://soundcloud.com/thoughts-7",
                    "username": "ConsciousThoughts",
                    "image": "https://i1.sndcdn.com/avatars-000318073933-r13nnm-large.jpg"
                }
            ]
        },
        {
            "mutual": {
                "_id": 5326994,
                "url": "http://soundcloud.com/tennysonmusic",
                "username": "Tennyson",
                "image": "https://i1.sndcdn.com/avatars-000298793823-jh9tyj-large.jpg"
            },
            "followed_by": [
                {
                    "_id": 200235,
                    "url": "http://soundcloud.com/markredito",
                    "username": "Mark Redito",
                    "image": "https://i1.sndcdn.com/avatars-000313535771-jfvy5s-large.jpg"
                },
                {
                    "_id": 32211345,
                    "url": "http://soundcloud.com/reef-loretto",
                    "username": "Reef Loretto",
                    "image": "https://i1.sndcdn.com/avatars-000190200455-3hj08a-large.jpg"
                },
                {
                    "_id": 92183354,
                    "url": "http://soundcloud.com/shhsecretsongs",
                    "username": "Secret Songs",
                    "image": "https://i1.sndcdn.com/avatars-000211409161-sy9y04-large.jpg"
                },
                {
                    "_id": 1571697,
                    "url": "http://soundcloud.com/absrdst",
                    "username": "ABSRDST",
                    "image": "https://i1.sndcdn.com/avatars-000314897217-8smon9-large.jpg"
                },
                {
                    "_id": 2869822,
                    "url": "http://soundcloud.com/anamanaguchi",
                    "username": "ANAMANAGUCHI",
                    "image": "https://i1.sndcdn.com/avatars-000300641951-buqamn-large.jpg"
                },
                {
                    "_id": 114629,
                    "url": "http://soundcloud.com/ryanhemsworth",
                    "username": "Ryan Hemsworth",
                    "image": "https://i1.sndcdn.com/avatars-000327156004-lvy2rf-large.jpg"
                },
                {
                    "_id": 3968267,
                    "url": "http://soundcloud.com/giraffage",
                    "username": "Giraffage",
                    "image": "https://i1.sndcdn.com/avatars-000327337191-0uih5n-large.jpg"
                },
                {
                    "_id": 67527478,
                    "url": "http://soundcloud.com/in-love-with-a-ghost",
                    "username": "in love with a ghost",
                    "image": "https://i1.sndcdn.com/avatars-000294734092-g34d5t-large.jpg"
                },
                {
                    "_id": 24969134,
                    "url": "http://soundcloud.com/louisthechild",
                    "username": "Louis The Child",
                    "image": "https://i1.sndcdn.com/avatars-000325947003-k3yxbu-large.jpg"
                },
                {
                    "_id": 2235601,
                    "url": "http://soundcloud.com/maxoelectronic",
                    "username": "Maxo",
                    "image": "https://i1.sndcdn.com/avatars-000332420364-70b6uv-large.jpg"
                },
                {
                    "_id": 48687019,
                    "url": "http://soundcloud.com/kokogane",
                    "username": "Kogane",
                    "image": "https://i1.sndcdn.com/avatars-000329325991-7gmtuy-large.jpg"
                },
                {
                    "_id": 31531137,
                    "url": "http://soundcloud.com/skylarspence",
                    "username": "SKYLAR SPENCE",
                    "image": "https://i1.sndcdn.com/avatars-000150338128-tloph8-large.jpg"
                },
                {
                    "_id": 1526116,
                    "url": "http://soundcloud.com/jaiwolfmusic",
                    "username": "Jai Wolf",
                    "image": "https://i1.sndcdn.com/avatars-000272773933-4dekp6-large.jpg"
                },
                {
                    "_id": 49295547,
                    "url": "http://soundcloud.com/macross-82-99",
                    "username": "✿ MACROSS 82-99 ✿",
                    "image": "https://i1.sndcdn.com/avatars-000310896365-nm6w4z-large.jpg"
                },
                {
                    "_id": 568232,
                    "url": "http://soundcloud.com/tomggg",
                    "username": "Tomggg",
                    "image": "https://i1.sndcdn.com/avatars-000153468386-xcqx83-large.jpg"
                },
                {
                    "_id": 7098329,
                    "url": "http://soundcloud.com/grynpyret",
                    "username": "Grynpyret",
                    "image": "https://i1.sndcdn.com/avatars-000289685825-biwhfy-large.jpg"
                },
                {
                    "_id": 87395711,
                    "url": "http://soundcloud.com/thoughts-7",
                    "username": "ConsciousThoughts",
                    "image": "https://i1.sndcdn.com/avatars-000318073933-r13nnm-large.jpg"
                }
            ]
        },
        {
            "mutual": {
                "_id": 7402148,
                "url": "http://soundcloud.com/tonymendez333",
                "username": "Antonio Mendez",
                "image": "https://i1.sndcdn.com/avatars-000274883855-8iru31-large.jpg"
            },
            "followed_by": [
                {
                    "_id": 200235,
                    "url": "http://soundcloud.com/markredito",
                    "username": "Mark Redito",
                    "image": "https://i1.sndcdn.com/avatars-000313535771-jfvy5s-large.jpg"
                },
                {
                    "_id": 788205,
                    "url": "http://soundcloud.com/kaytranada",
                    "username": "KAYTRANADA",
                    "image": "https://i1.sndcdn.com/avatars-000291462776-eh4b0h-large.jpg"
                },
                {
                    "_id": 1571697,
                    "url": "http://soundcloud.com/absrdst",
                    "username": "ABSRDST",
                    "image": "https://i1.sndcdn.com/avatars-000314897217-8smon9-large.jpg"
                },
                {
                    "_id": 2869822,
                    "url": "http://soundcloud.com/anamanaguchi",
                    "username": "ANAMANAGUCHI",
                    "image": "https://i1.sndcdn.com/avatars-000300641951-buqamn-large.jpg"
                },
                {
                    "_id": 114629,
                    "url": "http://soundcloud.com/ryanhemsworth",
                    "username": "Ryan Hemsworth",
                    "image": "https://i1.sndcdn.com/avatars-000327156004-lvy2rf-large.jpg"
                },
                {
                    "_id": 3968267,
                    "url": "http://soundcloud.com/giraffage",
                    "username": "Giraffage",
                    "image": "https://i1.sndcdn.com/avatars-000327337191-0uih5n-large.jpg"
                },
                {
                    "_id": 24969134,
                    "url": "http://soundcloud.com/louisthechild",
                    "username": "Louis The Child",
                    "image": "https://i1.sndcdn.com/avatars-000325947003-k3yxbu-large.jpg"
                },
                {
                    "_id": 2235601,
                    "url": "http://soundcloud.com/maxoelectronic",
                    "username": "Maxo",
                    "image": "https://i1.sndcdn.com/avatars-000332420364-70b6uv-large.jpg"
                },
                {
                    "_id": 31531137,
                    "url": "http://soundcloud.com/skylarspence",
                    "username": "SKYLAR SPENCE",
                    "image": "https://i1.sndcdn.com/avatars-000150338128-tloph8-large.jpg"
                },
                {
                    "_id": 1526116,
                    "url": "http://soundcloud.com/jaiwolfmusic",
                    "username": "Jai Wolf",
                    "image": "https://i1.sndcdn.com/avatars-000272773933-4dekp6-large.jpg"
                },
                {
                    "_id": 4652438,
                    "url": "http://soundcloud.com/lancasterr1",
                    "username": "Luis Lancaster",
                    "image": "https://i1.sndcdn.com/avatars-000214575492-nzqi5n-large.jpg"
                },
                {
                    "_id": 49295547,
                    "url": "http://soundcloud.com/macross-82-99",
                    "username": "✿ MACROSS 82-99 ✿",
                    "image": "https://i1.sndcdn.com/avatars-000310896365-nm6w4z-large.jpg"
                },
                {
                    "_id": 568232,
                    "url": "http://soundcloud.com/tomggg",
                    "username": "Tomggg",
                    "image": "https://i1.sndcdn.com/avatars-000153468386-xcqx83-large.jpg"
                },
                {
                    "_id": 7098329,
                    "url": "http://soundcloud.com/grynpyret",
                    "username": "Grynpyret",
                    "image": "https://i1.sndcdn.com/avatars-000289685825-biwhfy-large.jpg"
                },
                {
                    "_id": 87395711,
                    "url": "http://soundcloud.com/thoughts-7",
                    "username": "ConsciousThoughts",
                    "image": "https://i1.sndcdn.com/avatars-000318073933-r13nnm-large.jpg"
                }
            ]
        },
        {
            "mutual": {
                "_id": 892605,
                "url": "http://soundcloud.com/samgellaitry",
                "username": "sam gellaitry",
                "image": "https://i1.sndcdn.com/avatars-000284619476-k0exrk-large.jpg"
            },
            "followed_by": [
                {
                    "_id": 200235,
                    "url": "http://soundcloud.com/markredito",
                    "username": "Mark Redito",
                    "image": "https://i1.sndcdn.com/avatars-000313535771-jfvy5s-large.jpg"
                },
                {
                    "_id": 32211345,
                    "url": "http://soundcloud.com/reef-loretto",
                    "username": "Reef Loretto",
                    "image": "https://i1.sndcdn.com/avatars-000190200455-3hj08a-large.jpg"
                },
                {
                    "_id": 788205,
                    "url": "http://soundcloud.com/kaytranada",
                    "username": "KAYTRANADA",
                    "image": "https://i1.sndcdn.com/avatars-000291462776-eh4b0h-large.jpg"
                },
                {
                    "_id": 1571697,
                    "url": "http://soundcloud.com/absrdst",
                    "username": "ABSRDST",
                    "image": "https://i1.sndcdn.com/avatars-000314897217-8smon9-large.jpg"
                },
                {
                    "_id": 2869822,
                    "url": "http://soundcloud.com/anamanaguchi",
                    "username": "ANAMANAGUCHI",
                    "image": "https://i1.sndcdn.com/avatars-000300641951-buqamn-large.jpg"
                },
                {
                    "_id": 114629,
                    "url": "http://soundcloud.com/ryanhemsworth",
                    "username": "Ryan Hemsworth",
                    "image": "https://i1.sndcdn.com/avatars-000327156004-lvy2rf-large.jpg"
                },
                {
                    "_id": 24969134,
                    "url": "http://soundcloud.com/louisthechild",
                    "username": "Louis The Child",
                    "image": "https://i1.sndcdn.com/avatars-000325947003-k3yxbu-large.jpg"
                },
                {
                    "_id": 2235601,
                    "url": "http://soundcloud.com/maxoelectronic",
                    "username": "Maxo",
                    "image": "https://i1.sndcdn.com/avatars-000332420364-70b6uv-large.jpg"
                },
                {
                    "_id": 1526116,
                    "url": "http://soundcloud.com/jaiwolfmusic",
                    "username": "Jai Wolf",
                    "image": "https://i1.sndcdn.com/avatars-000272773933-4dekp6-large.jpg"
                },
                {
                    "_id": 4652438,
                    "url": "http://soundcloud.com/lancasterr1",
                    "username": "Luis Lancaster",
                    "image": "https://i1.sndcdn.com/avatars-000214575492-nzqi5n-large.jpg"
                },
                {
                    "_id": 49295547,
                    "url": "http://soundcloud.com/macross-82-99",
                    "username": "✿ MACROSS 82-99 ✿",
                    "image": "https://i1.sndcdn.com/avatars-000310896365-nm6w4z-large.jpg"
                },
                {
                    "_id": 568232,
                    "url": "http://soundcloud.com/tomggg",
                    "username": "Tomggg",
                    "image": "https://i1.sndcdn.com/avatars-000153468386-xcqx83-large.jpg"
                },
                {
                    "_id": 7098329,
                    "url": "http://soundcloud.com/grynpyret",
                    "username": "Grynpyret",
                    "image": "https://i1.sndcdn.com/avatars-000289685825-biwhfy-large.jpg"
                },
                {
                    "_id": 87395711,
                    "url": "http://soundcloud.com/thoughts-7",
                    "username": "ConsciousThoughts",
                    "image": "https://i1.sndcdn.com/avatars-000318073933-r13nnm-large.jpg"
                }
            ]
        },
        {
            "mutual": {
                "_id": 3436341,
                "url": "http://soundcloud.com/cashmerecat",
                "username": "CASHMERE CAT",
                "image": "https://i1.sndcdn.com/avatars-000205274564-3ma1yl-large.jpg"
            },
            "followed_by": [
                {
                    "_id": 200235,
                    "url": "http://soundcloud.com/markredito",
                    "username": "Mark Redito",
                    "image": "https://i1.sndcdn.com/avatars-000313535771-jfvy5s-large.jpg"
                },
                {
                    "_id": 788205,
                    "url": "http://soundcloud.com/kaytranada",
                    "username": "KAYTRANADA",
                    "image": "https://i1.sndcdn.com/avatars-000291462776-eh4b0h-large.jpg"
                },
                {
                    "_id": 1571697,
                    "url": "http://soundcloud.com/absrdst",
                    "username": "ABSRDST",
                    "image": "https://i1.sndcdn.com/avatars-000314897217-8smon9-large.jpg"
                },
                {
                    "_id": 2869822,
                    "url": "http://soundcloud.com/anamanaguchi",
                    "username": "ANAMANAGUCHI",
                    "image": "https://i1.sndcdn.com/avatars-000300641951-buqamn-large.jpg"
                },
                {
                    "_id": 3968267,
                    "url": "http://soundcloud.com/giraffage",
                    "username": "Giraffage",
                    "image": "https://i1.sndcdn.com/avatars-000327337191-0uih5n-large.jpg"
                },
                {
                    "_id": 24969134,
                    "url": "http://soundcloud.com/louisthechild",
                    "username": "Louis The Child",
                    "image": "https://i1.sndcdn.com/avatars-000325947003-k3yxbu-large.jpg"
                },
                {
                    "_id": 2235601,
                    "url": "http://soundcloud.com/maxoelectronic",
                    "username": "Maxo",
                    "image": "https://i1.sndcdn.com/avatars-000332420364-70b6uv-large.jpg"
                },
                {
                    "_id": 238164376,
                    "url": "http://soundcloud.com/idolssakura",
                    "username": "🌸 IDOLS, SAKURA  🌸",
                    "image": "https://i1.sndcdn.com/avatars-000235674920-echwi8-large.jpg"
                },
                {
                    "_id": 1526116,
                    "url": "http://soundcloud.com/jaiwolfmusic",
                    "username": "Jai Wolf",
                    "image": "https://i1.sndcdn.com/avatars-000272773933-4dekp6-large.jpg"
                },
                {
                    "_id": 4652438,
                    "url": "http://soundcloud.com/lancasterr1",
                    "username": "Luis Lancaster",
                    "image": "https://i1.sndcdn.com/avatars-000214575492-nzqi5n-large.jpg"
                },
                {
                    "_id": 49295547,
                    "url": "http://soundcloud.com/macross-82-99",
                    "username": "✿ MACROSS 82-99 ✿",
                    "image": "https://i1.sndcdn.com/avatars-000310896365-nm6w4z-large.jpg"
                },
                {
                    "_id": 568232,
                    "url": "http://soundcloud.com/tomggg",
                    "username": "Tomggg",
                    "image": "https://i1.sndcdn.com/avatars-000153468386-xcqx83-large.jpg"
                },
                {
                    "_id": 7098329,
                    "url": "http://soundcloud.com/grynpyret",
                    "username": "Grynpyret",
                    "image": "https://i1.sndcdn.com/avatars-000289685825-biwhfy-large.jpg"
                },
                {
                    "_id": 87395711,
                    "url": "http://soundcloud.com/thoughts-7",
                    "username": "ConsciousThoughts",
                    "image": "https://i1.sndcdn.com/avatars-000318073933-r13nnm-large.jpg"
                }
            ]
        },
        {
            "mutual": {
                "_id": 455369,
                "url": "http://soundcloud.com/mr_carmack",
                "username": "MR•CAR/\\\\ACK",
                "image": "https://i1.sndcdn.com/avatars-000182947570-23ppwl-large.jpg"
            },
            "followed_by": [
                {
                    "_id": 200235,
                    "url": "http://soundcloud.com/markredito",
                    "username": "Mark Redito",
                    "image": "https://i1.sndcdn.com/avatars-000313535771-jfvy5s-large.jpg"
                },
                {
                    "_id": 32211345,
                    "url": "http://soundcloud.com/reef-loretto",
                    "username": "Reef Loretto",
                    "image": "https://i1.sndcdn.com/avatars-000190200455-3hj08a-large.jpg"
                },
                {
                    "_id": 788205,
                    "url": "http://soundcloud.com/kaytranada",
                    "username": "KAYTRANADA",
                    "image": "https://i1.sndcdn.com/avatars-000291462776-eh4b0h-large.jpg"
                },
                {
                    "_id": 1571697,
                    "url": "http://soundcloud.com/absrdst",
                    "username": "ABSRDST",
                    "image": "https://i1.sndcdn.com/avatars-000314897217-8smon9-large.jpg"
                },
                {
                    "_id": 2869822,
                    "url": "http://soundcloud.com/anamanaguchi",
                    "username": "ANAMANAGUCHI",
                    "image": "https://i1.sndcdn.com/avatars-000300641951-buqamn-large.jpg"
                },
                {
                    "_id": 114629,
                    "url": "http://soundcloud.com/ryanhemsworth",
                    "username": "Ryan Hemsworth",
                    "image": "https://i1.sndcdn.com/avatars-000327156004-lvy2rf-large.jpg"
                },
                {
                    "_id": 3968267,
                    "url": "http://soundcloud.com/giraffage",
                    "username": "Giraffage",
                    "image": "https://i1.sndcdn.com/avatars-000327337191-0uih5n-large.jpg"
                },
                {
                    "_id": 24969134,
                    "url": "http://soundcloud.com/louisthechild",
                    "username": "Louis The Child",
                    "image": "https://i1.sndcdn.com/avatars-000325947003-k3yxbu-large.jpg"
                },
                {
                    "_id": 2235601,
                    "url": "http://soundcloud.com/maxoelectronic",
                    "username": "Maxo",
                    "image": "https://i1.sndcdn.com/avatars-000332420364-70b6uv-large.jpg"
                },
                {
                    "_id": 31531137,
                    "url": "http://soundcloud.com/skylarspence",
                    "username": "SKYLAR SPENCE",
                    "image": "https://i1.sndcdn.com/avatars-000150338128-tloph8-large.jpg"
                },
                {
                    "_id": 1526116,
                    "url": "http://soundcloud.com/jaiwolfmusic",
                    "username": "Jai Wolf",
                    "image": "https://i1.sndcdn.com/avatars-000272773933-4dekp6-large.jpg"
                },
                {
                    "_id": 4652438,
                    "url": "http://soundcloud.com/lancasterr1",
                    "username": "Luis Lancaster",
                    "image": "https://i1.sndcdn.com/avatars-000214575492-nzqi5n-large.jpg"
                },
                {
                    "_id": 49295547,
                    "url": "http://soundcloud.com/macross-82-99",
                    "username": "✿ MACROSS 82-99 ✿",
                    "image": "https://i1.sndcdn.com/avatars-000310896365-nm6w4z-large.jpg"
                },
                {
                    "_id": 7098329,
                    "url": "http://soundcloud.com/grynpyret",
                    "username": "Grynpyret",
                    "image": "https://i1.sndcdn.com/avatars-000289685825-biwhfy-large.jpg"
                }
            ]
        }
    ]
}
