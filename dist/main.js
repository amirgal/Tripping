// const mapManager = new MapManager
// const renderer = new Renderer
// const tripManager = new tripManager


async const loadPage = function() {
    initMap()
    await tripManager.getTrips()
    renderer.renderMyTrips(tripManager.myTrips)
}



// //display trip on trip click
// $('#side-container').on('click','.tripBtn', function() {

// })

// //Start new trip click -> displays new trip page
// $('#newTripBtn').on('click',function() {
//     renderer.renderNewTrip()
// })

