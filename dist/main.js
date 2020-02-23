const renderer = new Renderer
const tripManager = new TripManager


const loadPage = async function() {
    await tripManager.getTrips()
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

$('#side-container').on('click', '.saveTripBtn', function() {
    const tripName = ''
    const tripDate = ''
    // const newTrip = new Trip(tripName, tripDate)
    // tripManager.saveTrip(newTrip)
})

$('#side-container').on('click','.saveSpotBtn', function() {
    const spotName = ''
    const tripName = ''
    const coords = ''
    const comment = ''
    const photos =''
    // const newSpot = new Spot(spotName,tripName,coords,comment,photos)
    // tripManager.saveSpot(newSpot)
})

const trip = new Trip('brazil', new Date())
const coords = {lat:0, lng:0}
trip.coords = coords

tripManager.saveTrip(trip)

loadPage()