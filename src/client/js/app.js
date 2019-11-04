var performAction = function(e) {
  event.preventDefault();

  var cityName = document.getElementById("city-name").value;
  var travelDate = document.getElementById("departure-date").value;
  var returnDate = document.getElementById("comeback-date").value;

  Client.validationsForPlace(cityName);
  Client.validateForDate(travelDate);
  Client.validateForDate(returnDate);
  Client.validateDateInput(travelDate, returnDate);

  //date in unix format to send as a query parameter for darksky api
  var dateInUnix = new Date(travelDate).getTime() / 1000;

  //dynamically create and get html elements
  let wrapper = document.getElementById("each-trip-wrapper");
  let infoDiv = document.createElement("div");
  var picDiv = document.createElement("div");
  infoDiv.className = "info";
  infoDiv.setAttribute("id", "information");

  // geoname api
  var baseUrl =
    "http://api.geonames.org/searchJSON?username=priyanka_gite&q=" + cityName;

  //set the headers for geonames api
  let request = new Request(baseUrl, {
    method: "POST",
    body: cityName,
    headers: new Headers()
  });

  //chain of requestes to render/get data
  if (
    cityName !== "" &&
    travelDate !== "" &&
    returnDate !== "" &&
    returnDate <= travelDate === false
  ) {
    fetch(request)
      .then(resp => resp.json())
      .then(data => {
        if (data.totalResultsCount === 0) {
          alert("Please check the city name and try again");
          return null;
        }
        let lat = data.geonames[0].lat;
        let lng = data.geonames[0].lng;
        let country = data.geonames[0].countryName;

        fetch("http://localhost:8083/destination", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            latitude: lat,
            longitude: lng,
            time: dateInUnix
          })
        })
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            //today's date in utc format
            var toD = new Date()
              .toJSON()
              .slice(0, 10)
              .replace(/-/g, "-"); //2019/11/01;
            var getTodaysDate = new Date(toD);
            var getDepatureDate = new Date(travelDate);
            var getReturnDate = new Date(returnDate);

            //calculate the number of days to stay
            var totalDaysStay = dateDiffInDays(getDepatureDate, getReturnDate);

            //calculate number of days left to travel
            var daysLeftToTravel = dateDiffInDays(
              getTodaysDate,
              getDepatureDate
            );

            //convert farhenite to celcius degrees - high temp
            let highTempInCelcius =
              Math.round(((data.currently.temperature - 32) * 5) / 9) +
              `<sup>o</sup>` +
              "C";

            //convert farhenite to celcius degrees - low temp
            let lowTempInCelcius =
              Math.round(((data.currently.apparentTemperature - 32) * 5) / 9) +
              `<sup>o</sup>` +
              "C";

            //get elements indside info div
            infoDiv.innerHTML = `<div class="item" id="weather-information"> 
                                <h3>My trip to ${capitalize(
                                  cityName
                                )}, ${country}</h3>
                                <h3>Departing date is ${travelDate}</h3>
                                
                                
                                <button class="save btn" onclick="Client.removeTrip(this)">remove trip</button>
                                  <p>${capitalize(
                                    cityName
                                  )} is ${daysLeftToTravel} day(s) away</p>
                                  <p>You will be staying in ${cityName} for ${totalDaysStay} day(s)</p>
                                  <p>Typical weather for then is</p>
                                  <p>High: ${highTempInCelcius}, Low: ${lowTempInCelcius}</p>
                                  <p>${data.currently.summary} </p>
                                </div>                            
                              `;
            infoDiv.append(picDiv);
            wrapper.append(infoDiv);
          });
      });
    //fetch to display the city information
    fetch("http://localhost:8083/destination-pic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        destination: cityName,
        image_type: "photo",
        category: "places, nature, buildings, people"
      })
    })
      .then(response => response.json())
      .then(data => {
        picDiv.className = "image";
        //check if data is null
        //if(data.total === 0) { return null}
        if (data === undefined || data === null) return null;
        //if the image is unavailable, get the preview image
        if (data.total <= 0) {
          picDiv.innerHTML = `<img src=${data.hits[0].previewURL} alt=${cityName} />`;
        } else {
          picDiv.innerHTML = `<img src=${data.hits[0].largeImageURL} alt=${cityName} />`;
        }
      });
  } else {
    return null;
  }
};

//calculate the days left
function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

//capitalize first letter
const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

//remove my trip from the list
const removeTrip = function removeTrip(button) {
  //remove parent's parent node
  button.parentNode.parentNode.parentNode.removeChild(
    button.parentNode.parentNode
  );
};

//disable yesterday's dates in calender
let onLoad = (window.onload = function() {
  let departureDateInput = document.getElementById("departure-date");
  let comebackDateInput = document.getElementById("comeback-date");

  const cur_date = new Date();
  const cur_month =
    cur_date.getMonth() > 9
      ? cur_date.getMonth() + 1
      : "0" + (cur_date.getMonth() + 1);
  const cur_day =
    cur_date.getDate() > 9 ? cur_date.getDate() : "0" + cur_date.getDate();

  const dateStr = cur_date.getFullYear() + "-" + cur_month + "-" + cur_day;

  departureDateInput.setAttribute("min", dateStr);
  comebackDateInput.setAttribute("min", dateStr);
});

let handleSubmit = document
  .getElementById("generate")
  .addEventListener("click", performAction);

export { handleSubmit, removeTrip, onLoad };
