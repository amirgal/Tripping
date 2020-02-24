let markingEnabled = false
let currPosition
function initMap() {
    let markers = []
    const map = new google.maps.Map(document.getElementById('map')) 
    let infowindow = new google.maps.InfoWindow()
    
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
        // currPosition = location
        const marker = new google.maps.Marker({
            position:location,
            map:map,
            })
        markers.push(marker)
    }

    const addMarker = (spot) => {
        const marker = new google.maps.Marker({
            position:spot.coords,
            map:map,
            spot:spot
            })
        google.maps.event.addListener(marker, 'click', function() {
            const html = renderer.renderSpot(marker.spot)
            infowindow.close()
            infowindow.setContent(`${html}`);
            infowindow.open(map,marker);
            });
        markers.push(marker)
    }

    /*Sets a marker on the passed location on the map */

    /*Sets a marker on click and pushes a coords obj to locations array */
    google.maps.event.addListener(map,'click', event => {
        infowindow.close()
        const location = {lat: event.latLng.lat(), lng: event.latLng.lng()}
        if(markingEnabled){
            currPosition = location
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
        map.setZoom(zoom)
        map.setCenter(coords)
    }

    const removeAllMarkers = function() {
        markers.forEach(marker => marker.setMap(null))
        markers = []
    }

    return {centerMap, renderMarkers, removeAllMarkers}
}
