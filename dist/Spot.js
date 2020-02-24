class Spot {
    constructor(name,tripName,coords,comment,photos,date){
        this.name = name
        this.trip = tripName
        this.coords = coords
        this.comment = comment || ""
        this.photos = photos || []
        this.date = date
    }
}