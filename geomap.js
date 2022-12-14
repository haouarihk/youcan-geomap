
// @import{"mapbox-gl"};

let map;
const checkout = document.querySelector(".checkout-form");
const lngInput = document.querySelector('[placeholder="lng"]')
const latInput = document.querySelector('[placeholder="lat"]')
const zoomInput = document.querySelector('[placeholder="zoom"]')

function doIt() {
    const MAPBOX_ACCESS_TOKEN = MapboxAccessToken || "pk.eyJ1IjoiaGFpdGhlbTIwMDEiLCJhIjoiY2w1cjd5YTBrMWUyYjNqbno5dHBhYmNrNSJ9.fYhBPKEodo0vwwZqgci93Q"


    // checking if we're on the checkout page
    if (!checkout) return;

    // checking for important fields
    if (!lngInput) return alert("couldn't find lng field, The Map Will not work without it")
    if (!latInput) return alert("couldn't find lat field, The Map Will not work without it")
    if (!zoomInput) return alert("couldn't find zoom field, The Map Will not work without it")


    if (!MAPBOX_ACCESS_TOKEN) console.warn("MAPBOX_ACCESS_TOKEN hasn't ")



    const errorMsg = checkout.appendChild(document.createElement("div"));
    errorMsg.id = "errMsg";
    errorMsg.style.display = "none";

    const mapDOM = checkout.appendChild(document.createElement("div"));
    mapDOM.id = "map";

    const selectedArea = mapDOM.appendChild(document.createElement("div"));
    selectedArea.id = "selected-area";

    map = new mapboxgl.Map({
        accessToken: MAPBOX_ACCESS_TOKEN,
        container: 'map',
        antialias: false,
        style: 'mapbox://styles/mapbox/streets-v11',
        // center: [-74.5, 40],
        // zoom: 9
    });

    map.on("load", () => {
        map.addLayer({
            id: 'rpd_parks',
            type: 'fill',
            source: {
                type: 'vector',
                url: 'mapbox://mapbox.3o7ubwm8'
            },
            'source-layer': 'RPD_Parks'
        });

        if (+zoomInput.value) map.setZoom(+zoomInput.value);
        if (+latInput.value && +lngInput.value) map.setCenter({
            lat: +latInput.value,
            lng: +lngInput.value
        })

        errorMsg.innerText = "loaded"
        map.on('moveend', (e) => {
            updateLoc();
        });

        // remove unnecessary tags/logos
        document.querySelector(".mapboxgl-ctrl-bottom-right").remove();
        document.querySelector(".mapboxgl-ctrl-bottom-left").remove();
    });


    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
        })
    );



    function updateLoc() {
        const center = map.getCenter()
        console.log("moved", center);
        lngInput.value = center.lng;
        latInput.value = center.lat;
        zoomInput.value = map.getZoom();
    }
}

doIt();


