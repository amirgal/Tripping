class TripManager {
  constructor() {
    this.myTrips = [];
  }

  async getTrips() {
    this.myTrips = await $.get("/myTrips");
    console.log(this.myTrips);
    
  }

  async saveTrip(trip) {
    this.myTrips.push(trip);
    console.log(trip)
    await $.post("/trip", trip);
    console.log(this.myTrips);
    
  }

  async saveSpot(spot) {
    const index = this.myTrips.findIndex(t => t.name == spot.trip);
    this.myTrips[index].spots.push(spot);
    await $.post(`/spot`, spot);
  }

  async deleteSpot(spot) {
    const index = this.myTrips.findIndex(t => t.name == spot.trip);
    const spotIndex = this.myTrips[index].spots.findIndex(
      s => s.name == spot.name
    );
    $.ajax({
      url: `/spot/${spot._id}`,
      type: "DELETE",
      success: function() {
        this.myTrips[index].spots.splice(spotIndex, 1);
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
  updateSpot(spot){
    const index = this.myTrips.findIndex(t => t.name == spot.trip);
    const spotIndex = this.myTrips[index].spots.findIndex(
      s => s.name == spot.name
    );
    $.ajax({
        url: `/spot`,
        type: "PUT",
        data: spot,
        success: function(res) {
            this.myTrips[index].spots.splice(spotIndex,1,spot)
        }
      });
  }
}


