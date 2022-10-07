
// import mapboxgl from "mapbox-gl";


function doIt() {
    const checkout = document.querySelector(".checkout-form");
    const lngInput = document.querySelector('[placeholder="lng"]')
    const latInput = document.querySelector('[placeholder="lat"]')

    // checking if we're on the checkout page
    if (!checkout) return;

    // checking for important fields
    if (!lngInput) return alert("couldn't find lng field, The Map Will not work without it")
    if (!latInput) return alert("couldn't find lat field, The Map Will not work without it")



    const errorMsg = checkout.appendChild(document.createElement("div"));
    errorMsg.id = "errMsg";
    errorMsg.style.display = "none";

    const mapDOM = checkout.appendChild(document.createElement("div"));
    mapDOM.id = "map";

    /** Logs Errors */
    function logError(msg) {
        const rm = () => {
            errorMsg.style.display = "none";
            errorMsg.innerHTML = "";
        }

        if (!msg || msg === "") return rm();
        errorMsg.innerHTML = `<div>${msg}</div>`;
        errorMsg.style.display = "flex";

        const btn = errorMsg.appendChild(document.createElement("button"));
        btn.innerHTML = "x";
        btn.onclick = rm;
    }
    // logError("hello world")

    const map = new mapboxgl.Map({
        accessToken: "pk.eyJ1IjoiaGFpdGhlbTIwMDEiLCJhIjoiY2w1cjd5YTBrMWUyYjNqbno5dHBhYmNrNSJ9.fYhBPKEodo0vwwZqgci93Q",
        container: 'map',
        antialias: false,
        style: 'mapbox://styles/mapbox/streets-v11',
        // center: [-74.5, 40],
        // zoom: 9
    });

    map.on("load", () => {
        errorMsg.innerText = "loaded"
        map.on('moveend', (e) => {
            const center = map.getCenter()
            console.log("moved", center);
            lngInput.value = center.lng;
            latInput.value = center.lat;
        });

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
}

doIt();


