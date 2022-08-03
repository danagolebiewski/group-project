//variables
var searchBtnEl = document.getElementById("search-btn button is-info");
var cityNameEl = document.getElementById("input-box");

//functions (pulling APIs filter out data putting into variables)

//+/- logic (displaying data for restaurants and movies. Search by Zip Code/City, State. Filter by radius specifically with Zip Code search then filter by: cuisine (drop down menu), rating/reviews, or cost. Present data: Open-now) after restaurant selection, display movie theaters based on restaurant location

//special functions (adding event listener: on search click and restaurant selection click)

var apiKey = "JQBwiKz7mElblzM0fnId15X3ngEynG51";
var lat = "";
var lng = "";

function pullResults() {
    console.log(cityNameEl.value);
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${cityNameEl.value}`)
        .then(response => response.json())
        .then(response => {
            lat = response.results[0].locations[0].displayLatLng.lat;
            lng = response.results[0].locations[0].displayLatLng.lng;

            console.log(response);
            console.log(lat, lng);

        })
        .catch(err => console.log(err));


}

function nameFunction(lng, lat) {
    fetch(`http://www.mapquestapi.com/search/v4/place?key=${apiKey}&q=restaurants&sort=relevance&location=${lng},${lat}`)
        .then(response => response.json())
        .then(response => {

            console.log(response);
        })
        .catch(err => console.log(err));
}
searchBtnEl.addEventListener('click', pullResults);
nameFunction("-104.984853", "39.738453");

;var redirectUrl = './assets/404.html';

// function errorPage() {
//   // Check the response value is equal to 404.
//   if (httpRequest.status === 404) {
//     // If the page is not on the 404 page, redirect to it.
//     document.location.replace(redirectUrl);
//   } else {
//     return response.json();
//   } 
// };
