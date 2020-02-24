let markingEnabled = false
let currPosition
function initMap() {

    const map = new google.maps.Map(document.getElementById('map')) 
    
    /*Sets initial map view of the entire globe */
    google.maps.event.addListenerOnce(map, 'idle', function() {
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
            mapObj.setZoom(mapObj.getZoom());
        }
    }
    /*Sets initial map view of the entire globe */

    /*Sets a marker on the passed location on the map */
    const addNewMarker = (location) => {
        currPosition = location
        const marker = new google.maps.Marker({
            position:location,
            map:map,
            })
    }

    const addMarker = (spot) => {
        const marker = new google.maps.Marker({
            position:spot.coords,
            map:map,
            spot:spot
            })
        google.maps.event.addListener(marker, 'click', function() {
            const html = renderer.renderSpot(marker.spot)
            const infowindow = new google.maps.InfoWindow({
                content:`${html}`
            });
                infowindow.open(map,marker);
            });
    }

    /*Sets a marker on the passed location on the map */

    /*Sets a marker on click and pushes a coords obj to locations array */
    google.maps.event.addListener(map,'click', event => {
        const location = {lat: event.latLng.lat(), lng: event.latLng.lng()}
        if(markingEnabled){
            addNewMarker(location)
            markingEnabled = false
        }
    })
    /*Sets a marker on click and pushes a coords obj to locations array */


    const renderMarkers = function (trip) {
        const spots = trip.spots
        spots.forEach(spot => {
            addMarker(spot)
        });
    }


    const centerMap = function(zoom,coords) {
        // google.maps.event.trigger(map, 'resize');
        // map.panBy(0, 0);
        map.setZoom(zoom)
        map.setCenter(coords)
    }

    return {centerMap, renderMarkers}
}
