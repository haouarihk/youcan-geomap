
// @import{"mapbox-gl"};

let map;
const checkout = document.querySelector(".checkout-form");
const lngInput = document.querySelector('[placeholder="lng"]')
const latInput = document.querySelector('[placeholder="lat"]')
const radiusInput = document.querySelector('[placeholder="radius"]')
const locationInput = document.querySelector('[placeholder="location"]')

const centerMarker = new mapboxgl.Marker();
function doIt() {

    const MAPBOX_ACCESS_TOKEN = MapboxAccessToken || "pk.eyJ1IjoiaGFpdGhlbTIwMDEiLCJhIjoiY2w1cjd5YTBrMWUyYjNqbno5dHBhYmNrNSJ9.fYhBPKEodo0vwwZqgci93Q"


    // checking if we're on the checkout page
    if (!checkout) return;

    if (!locationInput) {
        // checking for important fields
        if (!lngInput) return alert("couldn't find lng field, The Map Will not work without it")
        if (!latInput) return alert("couldn't find lat field, The Map Will not work without it")
        if (!radiusInput) return alert("couldn't find radius field, The Map Will not work without it")
    }



    if (!MAPBOX_ACCESS_TOKEN) console.warn("MAPBOX_ACCESS_TOKEN hasn't ")



    const errorMsg = checkout.appendChild(document.createElement("div"));
    errorMsg.id = "errMsg";
    errorMsg.style.display = "none";

    const mapDOM = checkout.appendChild(document.createElement("div"));
    mapDOM.id = "map";

    const selectedArea = mapDOM.appendChild(document.createElement("div"));
    selectedArea.id = "selected-area";

    // get lat lng radius from query
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    const browsingMode = +params.lat && +params.lng && +params.radius

    const circle = new MapboxCircle(
        {
            lng: +params.lng,
            lat: +params.lat
        },
        +params.radius || 72,
        {
            editable: !browsingMode
        }
    );

    map = new mapboxgl.Map({
        accessToken: MAPBOX_ACCESS_TOKEN,
        container: 'map',
        antialias: false,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [+params.lng, +params.lat],
    });

    map.on("load", () => {
        if (!browsingMode)
            updateLoc()

        map.addLayer({
            id: 'rpd_parks',
            type: 'fill',
            source: {
                type: 'vector',
                url: 'mapbox://mapbox.3o7ubwm8'
            },
            'source-layer': 'RPD_Parks'
        });



        centerMarker.setLngLat([+params.lng, +params.lat])
        centerMarker.addTo(map);
        circle.setCenter({ lng: params.lng, lat: +params.lat })
        circle.setRadius(+params.radius)
        circle.addTo(map);
        const rad = (+params.radius) * 10 ** -5
        if (browsingMode)
            map.fitBounds([
                [(+params.lng) - rad, (+params.lat) - rad], // southwestern corner of the bounds
                [(+params.lng) + rad, (+params.lat) + rad] // northeastern corner of the bounds
            ]);

        if (latInput && lngInput && radiusInput) {
            if (+radiusInput.value)
                circle.setRadius(+radiusInput.value);

            if (+latInput.value && +lngInput.value)
                map.setCenter({
                    lat: +latInput.value,
                    lng: +lngInput.value,
                })
        }

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
        const radius = circle.getRadius();

        if (!browsingMode) {
            centerMarker.setLngLat([center.lng, center.lat])
            circle.setCenter({
                lng: +center.lng || 0,
                lat: +center.lat || 0
            })
            // circle.setRadius(radius)
        }

        if (locationInput) {
            locationInput.value = `https://haouarihk.github.io/youcan-geomap?lng=${encodeURIComponent(center.lng)}&lat=${encodeURIComponent(center.lat)}&radius=${encodeURIComponent(radius)}`
        } else console.warn("location field not defined")

        if (!lngInput || !latInput || !radiusInput) return;
        lngInput.value = center.lng;
        latInput.value = center.lat;
        radiusInput.value = radius;
    }
}

window.onload = () => doIt();


