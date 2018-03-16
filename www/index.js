
vote = function (value) {
    fetch(`vote?yes=${value}`, {
            method: 'get',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            credentials: 'include'
        })
        .then(function (data) {
            console.log('Request succeeded with response status ', data.status);
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}
// Check if browser supports EventSource
if (!!window.EventSource) {
    // Start the event source at the URL specified by the server
    var source = new EventSource('/stream')
    let statusEl = document.getElementById('status');
    let votesEl = document.getElementById('votes');

    // On message, do something
    source.addEventListener('message', function (e) {
        votes = JSON.parse(e.data);
        votesEl.innerText = "Yes: " + votes.yes + ", No: " + votes.no;
    }, false)

    // On Connection Open
    source.addEventListener('open', function (e) {
        statusEl.innerText = "Connected";
    }, false)

    // On Connection Error
    source.addEventListener('error', function (e) {
        if (e.target.readyState == EventSource.CLOSED) {
            statusEl.innerText = "Disconnected";
        } else if (e.target.readyState == EventSource.CONNECTING) {
            statusEl.innerText = "Connecting...";
        }
    }, false)
} else {
    console.log("Your browser doesn't support SSE")
}