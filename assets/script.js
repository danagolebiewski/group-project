//variables
var searchBtnEl = document.getElementById("search-btn button is-info");

//functions (pulling APIs filter out data putting into variables)

//+/- logic (displaying data for restaurants and movies. Search by Zip Code/City, State. Filter by radius specifically with Zip Code search then filter by: cuisine (drop down menu), rating/reviews, or cost. Present data: Open-now) after restaurant selection, display movie theaters based on restaurant location

//special functions (adding event listener: on search click and restaurant selection click)

searchBtnEl.addEventListener("click", pullResults);

var apiKey = "JQBwiKz7mElblzM0fnId15X3ngEynG51";
var cityNameEl = document.getElementsByClassName("input").value;

function pullResults() {
  // const options = {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         // cookie: 'bse=e23b4bbfcb354ffe960ef8089a0b56a7; hl=en_US; wdi=1%7C0EB04A80469F258C%7C0x1.8ba1f5731f0d8p%2B30%7Cdfa7a5fb4a61019d',
  //         'Access-Control-Allow-Origin': '*',
  //          Authorization:`Bearer ${apiKey}`
  //     }
  // };

  fetch(
    `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${cityNameEl}`
  )
    .then((response) => response.json())
    .then((response) => {
      let lat = response.results[0].locations[0].displayLatLng.lat;

      let lng = response.results[0].locations[0].displayLatLng.lng;
      console.log(lat, lng);

    //   nameFunction(lng, lat);
    })
    .catch((err) => console.log(err));
}

// function nameFunction(lng, lat) {
//   fetch(
//     `http://www.mapquestapi.com/search/v4/place?key=JQBwiKz7mElblzM0fnId15X3ngEynG51&q=restaurants&sort=relevance&location=${lng},${lat}`
//   )
//     .then((response) => response.json())
//     .then((response) => {
//       console.log(response);
//     });
// }
