//variables
var searchBtnEl = document.getElementById("search-btn button");
var cityNameEl = document.getElementById("inputInput");
var restaurantEl = document.getElementById("restaurant");
var btn = document.createElement("button");
var movieEl = document.getElementById("movie");
var meow = moment();
var rightMeow = moment(meow, moment.ISO_8601);
var apiKey = "JQBwiKz7mElblzM0fnId15X3ngEynG51";
var apiKeyBing = "Aopp0CnJgRFrESVuZ-oS2AEfd7f2ydTjP2S_dm4uVahSSWfS1D0ydLGwQxGV3B21";
var moveTheaterEl = document.getElementById("movie_theaters");

//functions (pulling APIs filter out data putting into variables)

//+/- logic (displaying data for restaurants and movies. Search by Zip Code/City, State. Filter by radius specifically with Zip Code search then filter by: cuisine (drop down menu), rating/reviews, or cost. Present data: Open-now) after restaurant selection, display movie theaters based on restaurant location

//special functions (adding event listener: on search click and restaurant selection click)



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
            return response.json()
        })
        .then(response => {
            for (let index = 0; index < response.results.length; index++) {
                let address = response.results[index].displayString;

                btn = document.createElement("button");
                btn.append(address);
                restaurantEl.append(btn);
                restaurantEl.addEventListener('click', latitAndLongi);
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

// function movieQuery(event) {

//     var settings = {
//         "url": "https://api-gate2.movieglu.com/filmsNowShowing/?n=10",
//         "method": "GET",
//         "timeout": 0,
//         "headers": {
//             "api-version": "v200",
//             "Authorization": "Basic REVOVjoyanJib1FKb0s0V1Q=",
//             "client": "DENV",
//             "x-api-key": "4eguyQkKb3aZtkn8n0OU76IH6fjo1J1a1JSs2zLW",
//             "device-datetime": rightMeow,
//             "territory": "US",
//         },
//     };

//     $.ajax(settings).done(function (response) {
//         for (let index = 0; index < response.films.length; index++) {

//             var newimgEl = document.createElement("img");
//             newimgEl.setAttribute("src", response.films[index].images.poster[1].medium.film_image);
//             movieEl.append(newimgEl);
//         }
//     });
// }
function latitAndLongi() {
    console.log(cityNameEl.value);
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${cityNameEl.value}`)
        .then(response => response.json())
        .then(response => {
            let lat = response.results[0].locations[0].displayLatLng.lat;
            let lng = response.results[0].locations[0].displayLatLng.lng;
            cinemaLocation(lat, lng);
        })
        .catch(err => console.log(err));
}

function cinemaLocation(lat, lng){
    var settings = {
        "url": "https://api-gate2.movieglu.com/cinemasNearby/?n=10",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "api-version": "v200",
            "Authorization": "Basic REVOVjoyanJib1FKb0s0V1Q=",
            "client": "DENV",
            "x-api-key": "4eguyQkKb3aZtkn8n0OU76IH6fjo1J1a1JSs2zLW",
            "device-datetime": rightMeow,
            "territory": "US",
            "geolocation": `${lat};${lng}`, 
        },
    };
    $.ajax(settings).done(function (response){

        for (let index = 0; index < response.cinemas.length; index++) {
            
            let cinemaId = response.cinemas[index].cinema_id;
            let cinemaName = response.cinemas[index].cinema_name;
            let cinemaAddy = response.cinemas[index].address;
            let cinemaCity = response.cinemas[index].city;
            let cinemaState = response.cinemas[index].state;
            let cinemaZip = response.cinemas[index].postcode;

            let properAddress = cinemaName + " " + cinemaAddy + " " + cinemaCity + ", " + cinemaState + " " + cinemaZip;

            

            btn = document.createElement("button");
            btn.setAttribute("id", cinemaId);
            btn.append(properAddress);
            moveTheaterEl.append(btn);
            moveTheaterEl.addEventListener('click', moviesAndTimes);
           
        }
        }
    )
}
function moviesAndTimes(event){
    console.log(event.target.id);
}
