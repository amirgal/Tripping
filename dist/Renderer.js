class Renderer {
    constructor(){
        this.allTripsTemplate = Handlebars.compile($("#all-trips-template").html())
        this.addTripTemplate = Handlebars.compile($("#add-trip-template").html())
        this.mainTripTemplate = Handlebars.compile($("#main-trip-template").html())
        this.mainSpotTemplate = Handlebars.compile($("#main-spot-template").html())
    }
    
    renderMyTrips(trips) {
        $('#side-header').empty().append('<h3>My Trips</h3>')
        const newHTML = this.allTripsTemplate({trip: trips});
        $('#side-container').empty().append(newHTML);
        $('#side-footer').empty().append('<button id="newTripBtn">Start New Trip</button>')
    }

    renderNewTrip() {
        $('#side-header').empty().append('<h3>Create New Trip</h3>')
        const newHTML = this.addTripTemplate();
        $('#side-container').empty().append(newHTML);
        $('#side-footer').empty().append('<button id="backToTripsBtn">Go Back</button><button id="saveTripBtn">Create Trip</button>')
    }

    renderTrip(trip) {
        $('#side-header').empty().append(`<h3>My ${trip.name}</h3>`)
        const newHTML = this.mainTripTemplate({spot: trip.spots});
        $('#side-container').empty().append(newHTML);
        $('#side-footer').empty().append('<button id="backToTripsBtn">Go Back</button><button id="addSpotBtn">Add New Spot</button>')
    }

    renderSpot(spot) {
        $('#side-header').empty().append(`<h3>My ${spot.name}</h3>`)
        const newHTML = this.mainSpotTemplate();
        $('#side-container').empty().append(newHTML);

    }

    renderNewSpot() {
        $('#side-header').empty().append('<h3>Create New Spot</h3>')
        const newHTML = this.mainSpotTemplate();
        $('#side-container').empty().append(newHTML);
    }
}