// const mapManager = new MapManager
// const renderer = new Renderer
const tripManager = new TripManager()


const loadPage = async function() {
    // initMap()
    await tripManager.getTrips()
    // renderer.renderMyTrips(tripManager.myTrips)
    // await tripManager.getTrips()
    // let t1 = new Trip("alon",new Date())
    // await tripManager.saveTrip(t1)
    // let s1 = new Spot("dsdsd","alon", {lat:3, lng:6},"dskjdskjdsa")
    // await tripManager.saveSpot(s1)
    const updated = tripManager.myTrips[0].spots[0]
    updated.coords = {lat:38.00,lng:33.000}
    console.log(updated);
    
    await tripManager.updateSpot(updated)

}

loadPage()

// //display trip on trip click
// $('#side-container').on('click','.tripBtn', function() {

// })

// //Start new trip click -> displays new trip page
// $('#newTripBtn').on('click',function() {
//     renderer.renderNewTrip()
// })

