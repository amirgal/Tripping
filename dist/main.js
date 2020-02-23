const manager = new TripManager()
const t1 = new Trip("test",new Date())


manager.saveTrip(t1)

const l1 = new Spot("here","test",{lat:35.000,lng:122.000},"commi" )
manager.saveLocation(l1)