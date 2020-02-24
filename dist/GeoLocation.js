class GeoLocation {
    constructor(){
    }
    async getLocation() {
        if(navigator.geolocation) {
           const options = {timeout:30000}
           const position = await this.locationPromise(options)
           return position
           
        } else {
           console.log("browser does not support geolocation!")
        }
     }
    
     locationPromise(options) {
         const promise = new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(function(position) {
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                resolve(location)
            }, function(err) {
                let errMessage;
                if(err.code == 1) {
                    errMessage = "geolocation Error: Access is denied!"
                 } else if( err.code == 2) {
                    errMessage = "geolocation Error: Position is unavailable!"
                 }
                reject(errMessage)
            }, options)
         })
         return promise;
     }
}