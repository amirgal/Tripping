class Renderer {
    constructor(){
        this.allTripsTemplate = Handlebars.compile($("#all-trips-template").html())
        this.addTripTemplate = Handlebars.compile($("#add-trip-template").html())
        this.mainTripTemplate = Handlebars.compile($("#main-trip-template").html())
        this.mainSpotTemplate = Handlebars.compile($("#main-spot-template").html())
    }
    renderMyTrips(trips) {
        $('#side-header').append('<h3>My Trips</h3>')
        const newHTML = this.allTripsTemplate(trips);
        $('#side-container').empty().append(newHTML);
    }
    renderNewTrip() {
        const newHTML = this.addTripTemplate();
        $('#side-container').empty().append(newHTML);
    }
    renderTrip(trip) {
        $('#side-header').append(`<h3>My ${trip.name}</h3>`)
        const newHTML = this.mainTripTemplate();
        $('#side-container').empty().append(newHTML);
    }
    renderSpot(spot) {
        const newHTML = this.mainSpotTemplate();
        $('#side-container').empty().append(newHTML);
    }
    renderNewSpot() {
        const newHTML = this.mainSpotTemplate();
        $('#side-container').empty().append(newHTML);
    }
}