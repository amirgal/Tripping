class Spot {
    constructor(name,trip,coords,comment,photos){
        this.name = name
        this.trip = trip 
        this.coords = coords
        this.comment = comment || ""
        this.photos = photos || []
    }
}