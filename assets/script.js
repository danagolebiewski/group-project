//variables
var searchBtnEl = document.getElementById("search-btn button is-info");
var cityNameEl = document.getElementById("inputInput");
var restaurantEl = document.getElementById("restaurant");
var btn = document.createElement("button");

//functions (pulling APIs filter out data putting into variables)

//+/- logic (displaying data for restaurants and movies. Search by Zip Code/City, State. Filter by radius specifically with Zip Code search then filter by: cuisine (drop down menu), rating/reviews, or cost. Present data: Open-now) after restaurant selection, display movie theaters based on restaurant location

//special functions (adding event listener: on search click and restaurant selection click)

var apiKey = "JQBwiKz7mElblzM0fnId15X3ngEynG51";
var apiKeyBing = "Aopp0CnJgRFrESVuZ-oS2AEfd7f2ydTjP2S_dm4uVahSSWfS1D0ydLGwQxGV3B21";

function pullResults() {
    console.log(cityNameEl.value);
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${cityNameEl.value}`)
        .then(response => response.json())
        .then(response => {
            let lat = response.results[0].locations[0].displayLatLng.lat;
            let lng = response.results[0].locations[0].displayLatLng.lng;
            restaurantQuery(lng, lat);
        })
        .catch(err => console.log(err));

}

function restaurantQuery(lng, lat) {
    fetch(`http://www.mapquestapi.com/search/v4/place?key=${apiKey}&q=restaurants&sort=relevance&location=${lng},${lat}`)
        .then(response => {
            errorPage(response);
            console.log(response);
            return response.json()
        })
        .then(response => {

            let addressArray = [];
            console.log(response);
            // response = JSON.stringify(response);
            for (let index = 0; index < response.results.length; index++) {
                let address = response.results[index].displayString;
                // addressArray[index] = address[index];
                btn = document.createElement("button");
                addressArray.push(address);
                btn.append(addressArray[index]);
                restaurantEl.append(btn);
            }
        })
        .catch(err => console.log(err));
}
searchBtnEl.addEventListener('click', pullResults);

var redirectUrl = './assets/404.html';

function errorPage(request) {
    console.log('Hello')
    if (request.status === 404) {
        document.location.replace(redirectUrl);
    }
};

function movieQuery() {

    console.log("helloworld");

}

btn.addEventListener('click', movieQuery);