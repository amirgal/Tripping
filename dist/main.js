const renderer = new Renderer();
const tripManager = new TripManager();
let mapManager

loadMap = function() {
    mapManager = initMap()
}

const loadPage = async function() {
    await tripManager.getTrips();
    renderer.renderMyTrips(tripManager.myTrips);
};

$("#side-bar").on("click", ".trip", function() {
  const tripId = $(this).data().id;
  const trip = tripManager.myTrips.find(trip => trip._id == tripId);
  renderer.renderTrip(trip);
});

$("#side-bar").on("click", ".trip-spot", function() {
  const spotId = $(this).data().id;
  const tripName = $(this).closest('#trip-spots').data().tripname;
  const trip = tripManager.myTrips.find(trip => trip.name == tripName);
  const spot = trip.spots.find(spot => spot._id == spotId);
  renderer.renderSpot(spot);
});

$("#side-bar").on("click", "#newTripBtn", function() {
  renderer.renderNewTrip();
});

$("#side-bar").on("click", "#saveTripBtn", function() {
  const tripName = $('#trip-name-input').val()
  const newTrip = new Trip(tripName, tripDate)
  tripManager.saveTrip(newTrip)
});

$('#side-bar').on('click', "#newSpotBtn", function() {
    markingEnabled = true                           //allow marking after clicking to create new spot
    const tripName = $(this).closest('#trip-spots').data().tripname
    const trip = tripManager.myTrips.find(trip => trip.name == tripName);
    renderer.renderNewSpot(trip)
})

$("#side-bar").on("click", "#saveSpotBtn", function() {
    const spotName = $('#new-comment-input').val();   // need to get name from coords click
    const tripName = $(this).closest('#new-spot').data().tripname
    const coords = currPosition;
    const comment = $('#new-comment-input').val();
    const photos = "";
    const newSpot = new Spot(spotName,tripName,coords,comment,photos)
    console.log(newSpot);
    tripManager.saveSpot(newSpot)
});

loadPage();
