class TripManager {
  constructor() {
    this.myTrips = [];
  }

  async getTrips() {
    this.myTrips = await $.get("/myTrips");
  }

  async saveTrip(trip) {
    this.myTrips.push(trip);
    await $.post("/trip", trip);
    console.log(this.myTrips);
    
  }

  async saveLocation(location) {
    const index = this.myTrips.findIndex(t => t.name == location.tripName);
    this.myTrips[index].locations.push(location);
    await $.post(`/location`, location);
  }

  async deleteLocation(location) {
    const index = this.myTrips.findIndex(t => t.name == location.tripName);
    const locationIndex = this.myTrips[index].locations.findIndex(
      l => l.name == location.name
    );
    $.ajax({
      url: `/location/${location._id}`,
      type: "DELETE",
      success: function() {
        this.myTrips[index].locations.splice(locationIndex, 1);
      }
    });
  }

  deleteTrip(trip){
      const index = this.myTrips.findIndex(t => t.name == trip.name)
      $.ajax({
        url: `/trip/${trip.name}`,
        type: "DELETE",
        success: function() {
          this.myTrips.splice(index,1)
        }
      });
  }
  updateLocation(location){
    const index = this.myTrips.findIndex(t => t.name == location.tripName);
    const locationIndex = this.myTrips[index].locations.findIndex(
      l => l.name == location.name
    );
    $.ajax({
        url: `/location`,
        type: "PUT",
        data: location,
        success: function(res) {
            this.myTrips[index].locations.splice(locationIndex,1,location)
        }
      });
  }
}


