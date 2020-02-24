const renderer = new Renderer();
const tripManager = new TripManager();
let mapManager;

loadMap = function() {
  mapManager = initMap();
};

const renderAllTripMarkers = function() {
  mapManager.removeAllMarkers()
  tripManager.myTrips.forEach(trip => {
    if (trip.spots.length != 0) {
      mapManager.renderMarkers(trip);
    }
  });
};

const loadPage = async function() {
  await tripManager.getTrips();
  renderer.renderMyTrips(tripManager.myTrips);
  renderAllTripMarkers();
};

$("#side-bar").on("click", ".trip", function() {
    const tripName = $(this).data().name;
    const trip = tripManager.myTrips.find(trip => trip.name == tripName);
    renderer.renderTrip(trip);
    mapManager.removeAllMarkers()
    mapManager.renderMarkers(trip)
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

$('#side-bar').on('click','#set-spot-cords', function() {
  const tripName = $(this).data().tripname
  const trip = tripManager.myTrips.find(trip => trip.name == tripName);
  renderer.renderNewSpot(trip);
})

$("#side-bar").on("click", "#saveSpotBtn", function() {
  const spotName = $("#spot-name-input").val();
  const tripName = $(this)
    .closest("#new-spot")
    .data().tripname;
  const coords = currPosition;
  const comment = $("#new-comment-input").val();
  const photos = "";
  const newSpot = new Spot(spotName, tripName, coords, comment, photos);
  const trip = tripManager.myTrips.find(trip => trip.name == tripName);
  tripManager.saveSpot(newSpot);
  renderer.renderTrip(trip);
  mapManager.renderMarkers(trip);
});

$("#side-bar").on("click", "#backToTripsBtn", function() {
  renderer.renderMyTrips(tripManager.myTrips);
  renderAllTripMarkers()
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
  }
});

loadPage();
