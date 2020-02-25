const renderer = new Renderer();
const tripManager = new TripManager();
const geoLocation = new GeoLocation();
let mapManager;
let currPhotos = []

loadMap = function() {
  mapManager = initMap();
};


// widget.onUploadComplete(function (fileInfo) {
//   console.log('File name: ', fileInfo.name);
//   console.log('CDN URL: ', fileInfo.cdnUrl);
//   // and so on...
// });

const renderAllTripsMapItems = function() {
  mapManager.removeMapItems();
  tripManager.myTrips.forEach(trip => {
    if (trip.spots.length != 0) {
      mapManager.renderMapItems(trip);
    }
  });
};

const loadPage = async function() {
  await tripManager.getTrips();
  renderer.renderMyTrips(tripManager.myTrips);
  renderAllTripsMapItems();
};

$("#side-bar").on("click", ".trip", function() {
  const tripName = $(this).data().name;
  const trip = tripManager.myTrips.find(trip => trip.name == tripName);
  renderer.renderTrip(trip);
  mapManager.removeMapItems();
  mapManager.renderMapItems(trip);
  if (trip.spots.length != 0) {
    mapManager.centerMap(5, trip.spots[0].coords);
  }
});

$("#side-bar").on("click", "#editTrip", function() {
  const tripName = $(this)
    .closest("#trip-spots")
    .data().tripname;
  const trip = tripManager.myTrips.find(trip => trip.name == tripName);
  renderer.renderEditTrip(trip);
});

$("#side-bar").on("click", ".trip-spot", function() {
  const spotName = $(this).data().name;
  const tripName = $(this)
    .closest("#trip-spots")
    .data().tripname;
  const trip = tripManager.myTrips.find(trip => trip.name == tripName);
  const spot = trip.spots.find(spot => spot.name == spotName);
  mapManager.centerMap(7, spot.coords);
});

$("#side-bar").on("click", "#newTripBtn", function() {
  renderer.renderNewTrip();
});

$("#side-bar").on("click", "#saveTripBtn", async function() {
  const tripName = $("#trip-name-input").val();
  if (tripName.length == 0) {
    alert("Trip name is required!");
  } else {
    const newTrip = new Trip(tripName);
    await tripManager.saveTrip(newTrip);
    renderer.renderTrip(newTrip);
  }
});

$("#side-bar").on("click", "#newSpotBtn", function() {
  markingEnabled = true;
  const tripName = $(this)
    .closest("#trip-spots")
    .data().tripname;
  renderer.renderSpotSearch(tripName);
});

$("#side-bar").on("click", "#spot-search-btn", async function() {
  const spotName = $("#spot-search-input").val();
  const coords = await tripManager.nameToCoords(spotName);
  mapManager.centerMap(7, coords);
});

$("#side-bar").on("click", "#my-location", async function() {
  currPosition = await geoLocation.getLocation();
  markingEnabled = false;
  mapManager.centerMap(7, currPosition);
  mapManager.addNewMarker(currPosition);
});

$("#side-bar").on("click", "#set-spot-coords", function() {
  const tripName = $(this)
    .closest(".new-spot")
    .data().tripname;
  const trip = tripManager.myTrips.find(trip => trip.name == tripName);
  if (!markingEnabled) {
    //only after click
    renderer.renderNewSpot(trip);
    
    const multiWidget = uploadcare.MultipleWidget('[role=uploadcare-uploader][data-multiple]');
    multiWidget.onUploadComplete(data => {
      for(let i = 0 ; i < data.count ; i++) {
        currPhotos.push(`${data.cdnUrl}nth/${i}/`)
      }
    });
  }
});

$("#side-bar").on("click", "#saveSpotBtn", function() {
  const spotName = $("#spot-name-input").val();
  const tripName = $(this)
  .closest(".new-spot")
  .data().tripname;
  const coords = currPosition;
  const comment = $("#new-comment-input").val();
  const photos = currPhotos;
  const date = $("#spot-date").val();
  currPhotos = []
  if (spotName.length == 0 || comment.length == 0) {
    alert("Spot name and spot description are required!");
  } else {
    const newSpot = new Spot(spotName, tripName, coords, comment, photos, date);
    const trip = tripManager.myTrips.find(trip => trip.name == tripName);
    tripManager.saveSpot(newSpot);
    renderer.renderTrip(trip);
    mapManager.renderMapItems(trip);
  }
});

$('#map').on('click','#editedSaveSpotBtn',function(){
  if($('#edited-spot-name-input').val().length == 0 ||$('#edited-spot-comment-input').val().length == 0 ){
    alert("Spot name and spot description are required!");
  }else{
    const oldSpotName = $(this)
    .closest(".info-window-edit")
    .data().spotname;
    const tripName = $(this)
    .closest(".info-window-edit")
    .data().tripname;
    const trip = tripManager.myTrips.find(trip => trip.name == tripName);
    const spot = trip.spots.find(spot => spot.name == oldSpotName);
    spot.name = $('#edited-spot-name-input').val()
    if($('#edited-spot-date-input').val()){
      spot.date = $('#edited-spot-date-input').val()
    }
    spot.comment = $('#edited-spot-comment-input').val()
    spot.photos = currPhotos                  //added for uploading images from edit
    tripManager.updateSpot(spot)
    const html = renderer.renderSpot(spot)
    mapManager.setInfoWindowContent(html)
    currPhotos = []                           //added for uploading images from edit
  }
})

$("#side-bar").on("click", "#backToTripsBtn", function() {
  renderer.renderMyTrips(tripManager.myTrips);
  renderAllTripsMapItems();
  mapManager.centerMap(2, { lat: 35, lng: 10 });
});

$("#side-bar").on("click", "#back-to-current-trip", function() {
  const tripName = $(this)
    .closest(".new-spot")
    .data().tripname;
  const trip = tripManager.myTrips.find(trip => trip.name == tripName);
  if (
    confirm(
      "Are you sure you want to go back? All your unsaved changes will be lost"
    )
  ) {
    renderer.renderTrip(trip);
    mapManager.removeMapItems();
    mapManager.renderMapItems(trip);
    if (trip.spots.length != 0) {
      mapManager.centerMap(5, trip.spots[0].coords);
    }
  }
});

$("#side-bar").on("click", "#editDone", function() {
  const tripName = $(this)
    .closest("#edit-trip")
    .data().tripname;
  const trip = tripManager.myTrips.find(trip => trip.name == tripName);
  const newName = $(".changeName").val();
  if (newName.length == 0) {
    alert("Trip name is required!");
  } else {
    trip.name = $(".changeName").val();
    tripManager.updateTrip(trip);
    renderer.renderTrip(trip);
  }
});

$("#side-bar").on("click", "#deleteTrip", function() {
  const tripName = $(this)
    .closest("#edit-trip")
    .data().tripname;
  const trip = tripManager.myTrips.find(trip => trip.name == tripName);
  if (
    confirm("Are you sure you want to delete this trip? this cannot be undone")
  ) {
    tripManager.deleteTrip(trip);
    loadPage();
    mapManager.centerMap(2, { lat: 35, lng: 10 });
  }
});

$("#side-bar").on("click", ".deleteSpot", async function() {
  const tripName = $(this)
    .closest("#edit-trip")
    .data().tripname;
  const spotName = $(this)
    .closest(".spot")
    .data().name;
  let trip = tripManager.myTrips.find(trip => trip.name == tripName);
  const spot = trip.spots.find(spot => spot.name == spotName);
  if (
    confirm("Are you sure you want to delete this post? this cannot be undone")
  ) {
    await tripManager.deleteSpot(spot);
    renderer.renderEditTrip(trip);
    mapManager.removeMapItems();
    mapManager.renderMapItems(trip);
  }
});

$('#map').on('click','.edit-spot',function(){
  const spotName = $(this)
  .closest(".info-window")
  .data().spotname;
  const tripName = $(this)
  .closest(".info-window")
  .data().tripname;
  const tripIndex = tripManager.myTrips.findIndex(trip => trip.name == tripName)
  const spotIndex = tripManager.myTrips[tripIndex].spots.findIndex(spot => spot.name == spotName)
  const infoWindowHtml = renderer.renderEditSpot(tripManager.myTrips[tripIndex].spots[spotIndex])
  mapManager.setInfoWindowContent(infoWindowHtml)

  //added for uploading images from edit
  currPhotos = tripManager.myTrips[tripIndex].spots[spotIndex].photos
  const multiWidget = uploadcare.MultipleWidget('[role=uploadcare-uploader][data-multiple]');
    multiWidget.onUploadComplete(data => {
      for(let i = 0 ; i < data.count ; i++) {
        currPhotos.push(`${data.cdnUrl}nth/${i}/`)
      }
    });
    //added for uploading images from edit
})

loadPage();
