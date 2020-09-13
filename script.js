"user strict";
// set paramaters for search
function queryParms(parms) {
    const queryItems = Object.keys(parms)
        .map(key => `${encodeURIComponent(key)}=
    ${encodeURIComponent(parms[key])}`);
    return queryItems.join('&');
    console.log(queryItems);
}
//display in DOM and loop thru all data in object
function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    $('.results-listing').empty();
    $('#error').empty();

    for (i = 0; i < responseJson.data.length & i < maxResults; i++) {
        $('.results-listing').append(
            `<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3> 
            <p>${responseJson.data[i].description}</p>
                </li>`);

    }
    $('#results').removeClass('hidden');
}

// get parks and info
function getParks(urlSearch, stateArr, maxResults, apiKey) {
    const parms = {
        stateCode: stateArr,
        limit: maxResults
    }
    const queryStr = queryParms(parms);
    const url = urlSearch + '?' + queryStr + '&api_key=' + apiKey;
    console.log(url);
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson, maxResults))
        .catch(err => {
            $('#error').text(`Try Again: ${err.message}`);
        });
}
//what happens wnen user fills out form and submits
function watchForm() {
    $('form').submit(e => {
        e.preventDefault();
        console.log('itworks')
        const stateArr = $("#search-term").val().split(',');
        const maxResults = $('#js-max-results').val();
        const urlSearch = 'https://api.nps.gov/api/v1/parks';
        console.log(stateArr)
        console.log(urlSearch)
        console.log(maxResults)
        const apiKey = "y5E141jq7LCjel1HQDW6cJvUCvWv1jkJGW2WgQfQ";
        getParks(urlSearch, stateArr, maxResults, apiKey);

    });
}

$(watchForm);
