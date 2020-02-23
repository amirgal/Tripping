const markingEnabled = false
function initMap() {

    // const options = {
    //     zoom:1,
    //     minZoom:1,
    //     center: {lat:0, lng: 0}
    // }
    /*Create new map with above options and adds it to div #map */
     const map = new google.maps.Map(document.getElementById('map'))
    
    
    /*Sets initial map view of the entire globe */
    google.maps.event.addListenerOnce(map, 'idle', function() {
        //Map is ready
        worldViewFit(map);
    });
    function worldViewFit(mapObj) {
        const worldBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(70.4043,-143.5291),  //Top-left
            new google.maps.LatLng(-46.11251, 163.4288)  //Bottom-right
        );
        mapObj.fitBounds(worldBounds, 0);
        const actualBounds = mapObj.getBounds();
        if(actualBounds.getSouthWest().lng() == -180 && actualBounds.getNorthEast().lng() == 180) {
            mapObj.setZoom(mapObj.getZoom()+1);
        }
    }
    /*Sets initial map view of the entire globe */

    /*Sets a marker on the passed location on the map */
    const addMarker = (location,map) => {
        const marker = new google.maps.Marker({
            position:location,
            map:map,
            })
        //   map.setCenter(location.coords)
    }
    /*Sets a marker on the passed location on the map */

    /*Sets a marker on click and pushes a coords obj to locations array */
    google.maps.event.addListener(map,'click', event => {
        const location = event.latLng

        addMarker(event.latLng,map)
        // console.log(`lat: ${location.coords.lat} lng: ${location.coords.lng}`);

        // console.log(location.coords.lat); 
    })
    /*Sets a marker on click and pushes a coords obj to locations array */

}
