class Spot {
    constructor(name,tripName,coords,comment,photos){
        this.name = name
        this.trip = tripName
        this.coords = coords
        this.comment = comment || ""
        this.photos = photos || []
    }
}