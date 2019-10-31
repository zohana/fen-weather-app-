function performAction(e) {
  alert("bbb");
  let DARKSKY_API_KEY = "b821506019dba0bf71f144d43177fc27";
  // var baseUrl = "http://api.geonames.org/searchJSON?username=priyanka_gite&maxRows=1&q=";
  var cityName = document.getElementById("city-name").value;
  var travelDate = document.getElementById("date").value;
  console.log("cityName");
  console.log(cityName);
  alert(cityName);
  var baseUrl =
    "http://api.geonames.org/searchJSON?username=priyanka_gite&maxRows=1&q=" +
    cityName;
  //API Call
  let request = new Request(baseUrl, {
    method: "POST",
    body: cityName,
    headers: new Headers()
  });

  fetch(request)
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      let lat =  data.geonames[0].lat;
      let lng = data.geonames[0].lng;
      console.log('lat ' + lat);
      console.log('lng ' + lng);
      //fetch(`https://api.darksky.net/forecast/${DARKSKY_API_KEY}/48.85341,2.3488`,
      fetch('http://localhost:8083/destination',
      {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body:JSON.stringify({
            lat: lat,
            lng: lng
          })
        }
      ).then(response =>{
        console.log(response.body);
      }).then(data => {
          console.log("data2");
          console.log(data);
        }); 
    });

    fetch('')
}

const getWeatherData = () => {
  async url => {
    const res = await fetch(url);
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("error__");
      console.log(error);
    }
  };
};


const postData = () => {
  async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });
    try {
      const projectData = await response.body;
      return projectData;
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
};

const updateUI = () => {
  async () => {
    const request = await fetch("/all");
    try {
      const allData = await request.json();
      console.log("allData");
      console.log(allData);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
};

let handleSubmit = document
  .getElementById("generate")
  .addEventListener("click", performAction);

export { handleSubmit };
