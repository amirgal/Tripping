const renderer = new Renderer();
const tripManager = new TripManager();
const geoLocation = new GeoLocation();
let mapManager;

loadMap = function() {
  mapManager = initMap();
};

const renderAllTripsMapItems = function() {
  mapManager.removeMapItems()
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
    mapManager.removeMapItems()
    mapManager.renderMapItems(trip)
    if(trip.spots.length != 0) {
      mapManager.centerMap(5,trip.spots[0].coords)
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
    const tripName = $(this).closest('#trip-spots').data().tripname;
    const trip = tripManager.myTrips.find(trip => trip.name == tripName);
    const spot = trip.spots.find(spot => spot.name == spotName);
    mapManager.centerMap(7,spot.coords)
});

$("#side-bar").on("click", "#newTripBtn", function() {
  renderer.renderNewTrip();
});

$("#side-bar").on("click", "#saveTripBtn", async function() {
  const tripName = $("#trip-name-input").val();
  const newTrip = new Trip(tripName);
  await tripManager.saveTrip(newTrip);
  renderer.renderTrip(newTrip);
});

$("#side-bar").on("click", "#newSpotBtn", function() {
  markingEnabled = true; 
  const tripName = $(this)
    .closest("#trip-spots")
    .data().tripname;
  renderer.renderSpotSearch(tripName)
});

$('#side-bar').on('click', '#spot-search-btn', async function() {
  const spotName = $('#spot-search-input').val()
  const coords = await tripManager.nameToCoords(spotName)
  mapManager.centerMap(7, coords)
})

$('#side-bar').on('click','#my-location', async function () {
  currPosition = await geoLocation.getLocation()
  markingEnabled = false
  mapManager.addNewMarker(currPosition)
})

$('#side-bar').on('click','#set-spot-coords', function() {
  const tripName = $(this).data().tripname
  const trip = tripManager.myTrips.find(trip => trip.name == tripName);
  if(!markingEnabled){    //only after click
    renderer.renderNewSpot(trip);
  }
})


$("#side-bar").on("click", "#saveSpotBtn", function() {
  const spotName = $("#spot-name-input").val();
  const tripName = $(this)
    .closest("#new-spot")
    .data().tripname;
  const coords = currPosition;
  const comment = $("#new-comment-input").val();
  const photos = "";
  const date = $('#spot-date').val()
  const newSpot = new Spot(spotName, tripName, coords, comment, photos,date);
  const trip = tripManager.myTrips.find(trip => trip.name == tripName);
  tripManager.saveSpot(newSpot);
  renderer.renderTrip(trip);
  mapManager.renderMapItems(trip);
});

$("#side-bar").on("click", "#backToTripsBtn", function() {
  renderer.renderMyTrips(tripManager.myTrips);
  renderAllTripsMapItems()
  mapManager.centerMap(2,{lat:0,lng:0})
});

$("#side-bar").on("click", "#back-to-current-trip", function() {
  const tripName = $(this)
    .closest("#new-spot")
    .data().tripname;
  const trip = tripManager.myTrips.find(trip => trip.name == tripName);
  if (
    confirm(
      "Are you sure you want to go back? All your unsaved changes will be lost"
    )
  ) {
    renderer.renderTrip(trip);
    mapManager.removeAllMarkers()
    mapManager.renderMarkers(trip);
  }
});

$("#side-bar").on("click", "#editDone", function() {
  const tripName = $(this)
  .closest("#edit-trip")
  .data().tripname;
const trip = tripManager.myTrips.find(trip => trip.name == tripName);
trip.name = $('.changeName').val()
tripManager.updateTrip(trip)
renderer.renderTrip(trip);
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
    mapManager.centerMap(2,{lat:0,lng:0})
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
  const spot = trip.spots.find(
    spot => spot.name == spotName
  );
  if (
    confirm("Are you sure you want to delete this post? this cannot be undone")
  ) {
    await tripManager.deleteSpot(spot);
    renderer.renderEditTrip(trip);
    mapManager.removeMapItems()
    mapManager.renderMapItems(trip)

  }
});

loadPage();
