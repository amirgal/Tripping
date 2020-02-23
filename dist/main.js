// const renderer = new Renderer
// const tripManager = new TripManager


const loadPage = function() {
    tripManager.getTrips()
    renderer.renderMyTrips(tripManager.myTrips)
}

$('#side-container').on('click','.trip', function() {
    const tripId = $(this).data().id
    const trip = tripManager.myTrips.find(trip => trip._id == tripId)
    tripManager.renderTrip(trip)
})

$('#side-container').on('click','.trip-spot', function() {
    const spotId = $(this).data().id
    const tripName = $(this).data().tripName
    const trip = tripManager.myTrips.find(trip => trip.name == tripName)
    const spot = trip.spots.find(spot => spot._id == spotId)
    tripManager.renderSpot(spot)
})

$('#side-container').on('click','#newTripBtn',function() {
    renderer.renderNewTrip()
})

$('#side-container').on('click', 'saveTripBtn', function() {
    
})

