let parks;
let map;
function initMap() {
    console.log("I was called")
    var wlg = { lat: -41.2826, lng: 174.78 };
    map = new google.maps.Map(document.getElementById('map'), { zoom: 15, center: wlg });
    var marker = new google.maps.Marker({ position: wlg, map: map });
  }

const filtered = (suburb) => parks.reduce((acc, item) => {
if (item.suburb === suburb) {
    acc.push(item);
}
return acc;
}, []);

const parseResponse = json => {
    const features = json.features;
    parks = features.map(item => ({
      name: item.properties.name,
      suburb: item.properties.suburb,
      lat: item.geometry.coordinates[1],
      long: item.geometry.coordinates[0],
    }));
    console.log(filtered("Karori"));
}

fetch('https://opendata.arcgis.com/datasets/f43ee88a2fb04c6daa39272f4b5bff77_1.geojson').then(response =>  response.json())
.then(json => parseResponse(json)).then(() => document.getElementById('dropdown').disabled = false);
   
document.getElementById("dropdown").addEventListener("change", (event) => {
    const suburb = event.currentTarget.value;
    console.log(suburb);
    const filteredParks = filtered(suburb);
    console.log(filteredParks);

    for (var i = 0; i < filteredParks.length; i++) {
        var coords = filteredParks[i];
        var latLng = new google.maps.LatLng(coords.lat,coords.long);
        console.log("Coords =", coords)
        console.log(latLng)
        console.log(map);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: coords.name,
          icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        });
      }
})

function filtersPopup(){
    document.getElementById("myModal").style.display="block";
  }