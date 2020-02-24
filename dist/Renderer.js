class Renderer {
    constructor(){
        this.allTripsTemplate = Handlebars.compile($("#all-trips-template").html())
        this.addTripTemplate = Handlebars.compile($("#add-trip-template").html())
        this.mainTripTemplate = Handlebars.compile($("#main-trip-template").html())
        this.mainSpotTemplate = Handlebars.compile($("#main-spot-template").html())
        this.newSpotTemplate = Handlebars.compile($('#new-spot-template').html())
    }
    
    renderMyTrips(trips) {
        const newHTML = this.allTripsTemplate({trip: trips});
        $('#side-bar').empty().append(newHTML);
    }

    renderNewTrip() {
        const newHTML = this.addTripTemplate();
        $('#side-bar').empty().append(newHTML);
    }

    //check to make sure displays all spots
    renderTrip(trip) {
        const newHTML = this.mainTripTemplate(trip);
        $('#side-bar').empty().append(newHTML);
    }

    renderSpot(spot) {
        const newHTML = this.mainSpotTemplate(spot);
        return newHTML
    }

    renderNewSpot(trip) {
        const newHTML = this.newSpotTemplate(trip);
        $('#side-bar').empty().append(newHTML);
    }
}