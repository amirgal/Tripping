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
      type: "DELETE"
    });
    this.myTrips[index].spots.splice(spotIndex, 1);
  }

  async deleteTrip(trip) {
    const index = this.myTrips.findIndex(t => t.name == trip.name);
    await $.ajax({
      url: `/trip/${trip.name}`,
      type: "DELETE"
    });
    this.myTrips.splice(index, 1);
  }

  async updateSpot(spot) {
    const index = this.myTrips.findIndex(t => t.name == spot.trip);
    const spotIndex = this.myTrips[index].spots.findIndex(
      s => s.name == spot.name
    );
    this.myTrips[index].spots.splice(spotIndex, 1, spot);
    await $.ajax({
      url: `/spot`,
      type: "PUT",
      data: spot
    });
  }

  updateTrip(trip){
    $.ajax({
      url: `/trip`,
      type: "PUT",
      data: trip
    });
  }

  // async coordsToName(coords){
  //   const lat = parseInt(coords.lat)
  //   const lng = parseInt(coords.lng)
  //   const name = await $.get(`/convert/${lat}/${lng}`)
  //   return name
  // }

  async nameToCoords(name) {
    const coords = await $.get(`/convert/${name}`);
    return coords;
  }
}
