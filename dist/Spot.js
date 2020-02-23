class Spot {
    constructor(name,tripName,coords,comment,photos){
        this.name = name
        this.tripName = tripName
        this.coords = coords
        this.comment = comment || ""
        this.photos = photos || []
    }
}