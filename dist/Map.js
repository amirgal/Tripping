let markingEnabled = false
let currPosition
function initMap() {
    let markers = []
    let polyLines = []
    const map = new google.maps.Map(document.getElementById('map'),{styles:mapStyle}) 
    let infowindow = new google.maps.InfoWindow()
    
    //creates icon for polyLines
      var lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 4
      };
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
            spot:spot,
            // icon:'https://img.icons8.com/offices/30/000000/walking.png'
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


    const renderMapItems = function (trip) {
        const spots = trip.spots
        spots.forEach(spot => {
            addMarker(spot)
        });
        const coordsArray = trip.spots.map(spot => { return {lat: (spot.coords.lat),lng:(spot.coords.lng)}})
        console.log(coordsArray);
        const tripPath = new google.maps.Polyline({
            path: coordsArray,
            geodesic: true,
            strokeColor: '#F5C803',
            strokeOpacity: 1.0,
            strokeWeight: 0.1 ,
            icons: [
          {
            icon: lineSymbol,
            offset: '0',
            repeat: '20px'
          }]
        })
          ;
          polyLines.push(tripPath)
          tripPath.setMap(map);
    }


    const centerMap = function(zoom,coords) {
        map.setZoom(zoom)
        map.setCenter(coords)
    }

    const removeMapItems = function() {
        polyLines.forEach(tripPath => tripPath.setMap(null))
        markers.forEach(marker => marker.setMap(null))
        markers = []
    }

    return {centerMap, renderMapItems, removeMapItems}
}


const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ]
