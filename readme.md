# Plugin Geomap

This plugin allows you to add location to your COD(cash on delivery) method

## How to use it

- go to Settings>Payment, and then press on edit on COD or create a new one
- add whatever you like there, then add custom Field(bottom right corner).
add three fields type of hidden, set display name for each one to be
lat, lan and zoom.
these values gonna be our latitude, longtitude and the zoom. then save.
note: don't forget to disable shipping address(it's at the bottom)

- go to Settings>Online>CSS/JavaScript configs and then paste these there

```html
<!-- Additional header code -- plugin(github.com/haouarihk/geomap) -->
<script src='https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.css' rel='stylesheet' />
<link href='https://haouarihk.github.io/youcan-geomap/geomap.css' rel='stylesheet' />
<!-- plugin(github.com/haouarihk/geomap) -->
```

```html
<!-- Additional footer code -- plugin(github.com/haouarihk/geomap) -->
<script>
    // access token for the mapbox api
    const MAPBOX_ACCESS_TOKEN = "<your mapbox api here>"
</script>

<script src="https://haouarihk.github.io/youcan-geomap/geomap.js"></script>
<!-- plugin(github.com/haouarihk/geomap) -->
```

- and that's it, now you can submit your page and everything will work.

## For the recieving end

The seller gonna recieve longtitude, latitude and the zoom.
naturally we would want to put them on a map and see.
what is the easist way.
well.. to use my testing page.
but even that is not easy enough.

- to get the exact location set by the user you have to go to the order
copy everything in the custom feilds and then paste it on the textarea on my testing pages

## notes

To make it easier for the seller, i couldn't think of anything easier.
i thought of making a link to google maps directly from the client form. but that's just putting too much trust to the client,
they can put malicius links or trackers etc..not safe.

I also thought of making a chrome extension that automagically shows the map when you look at the order. but i don't have enough funds or time for that.

You are welcome to submit issues, sugestions or event contributions, anything helps.

Thanks again.
