const renderer = new Renderer();
const tripManager = new TripManager();

const loadPage = async function() {
  await tripManager.getTrips();
  renderer.renderMyTrips(tripManager.myTrips);
};

$("#side-bar").on("click", ".trip", function() {
  const tripId = $(this).data().id;
  const trip = tripManager.myTrips.find(trip => trip._id == tripId);
  tripManager.renderTrip(trip);
});

$("#side-bar").on("click", ".trip-spot", function() {
  const spotId = $(this).data().id;
  const tripName = $(this).data().tripName;
  const trip = tripManager.myTrips.find(trip => trip.name == tripName);
  const spot = trip.spots.find(spot => spot._id == spotId);
  tripManager.renderSpot(spot);
});

$("#side-bar").on("click", "#newTripBtn", function() {
  renderer.renderNewTrip();
});

$("#side-bar").on("click", ".saveTripBtn", function() {
  const tripName = "";
  const tripDate = "";
  // const newTrip = new Trip(tripName, tripDate)
  // tripManager.saveTrip(newTrip)
});

$("#side-bar").on("click", ".saveSpotBtn", function() {
  const spotName = "";
  const tripName = "";
  const coords = "";
  const comment = "";
  const photos = "";
  // const newSpot = new Spot(spotName,tripName,coords,comment,photos)
  // tripManager.saveSpot(newSpot)
});

loadPage();
