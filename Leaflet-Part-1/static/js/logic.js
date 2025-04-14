// Create the 'basemap' tile layer that will be the background of our map.
let basemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
});

// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map.
let street = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team"
});

// Create the map object with center and zoom options.
let map = L.map("map", {
  center: [37.09, -95.71], // Center of the US
  zoom: 4,
  layers: [basemap]
});

// Then add the 'basemap' tile layer to the map.
basemap.addTo(map);

// OPTIONAL: Step 2
// Create the layer groups for earthquakes and tectonic plates.
let earthquakes = new L.LayerGroup();
let tectonicPlates = new L.LayerGroup();

/// Create baseMaps and overlayMaps for layer control.
let baseMaps = {
  "Base Map": basemap,
  "Street Map": street
};

let overlayMaps = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicPlates
};

// Add layer control to the map.
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // Function to determine marker color based on depth
  function getColor(depth) {
    return depth > 90 ? "#d73027" :
           depth > 70 ? "#fc8d59" :
           depth > 50 ? "#fee08b" :
           depth > 30 ? "#d9ef8b" :
           depth > 10 ? "#91cf60" :
                        "#1a9850";
  }

  // Function to determine radius based on magnitude
  function getRadius(magnitude) {
    return magnitude === 0 ? 1 : magnitude * 4;
  }

  // Function to return style object
  function styleInfo(feature) {
    return {
      color: "#000",
      weight: 0.5,
      fillColor: getColor(feature.geometry.coordinates[2]),
      fillOpacity: 0.8,
      radius: getRadius(feature.properties.mag)
    };
  }

  // Add GeoJSON layer to the earthquake layer group
  L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        `<h3>${feature.properties.place}</h3><hr>
         <p><strong>Magnitude:</strong> ${feature.properties.mag}<br>
         <strong>Depth:</strong> ${feature.geometry.coordinates[2]} km</p>`
      );
    }
  }).addTo(earthquakes);

  // Add the earthquake layer to the map
  earthquakes.addTo(map);

  // Create a legend control object
  let legend = L.control({ position: "bottomright" });

  // Add details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    let depths = [-10, 10, 30, 50, 70, 90];
    let colors = [
      "#1a9850", "#91cf60", "#d9ef8b", "#fee08b", "#fc8d59", "#d73027"
    ];

    // Loop through our depth intervals
    for (let i = 0; i < depths.length; i++) {
      div.innerHTML +=
        `<i style="background:${colors[i]}"></i> ` +
        `${depths[i]}${depths[i + 1] ? `&ndash;${depths[i + 1]}<br>` : "+"}`;
    }

    return div;
  };

  // Add the legend to the map
  legend.addTo(map);

  // OPTIONAL: Step 2
  // Add tectonic plates GeoJSON
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plateData) {
    L.geoJson(plateData, {
      color: "orange",
      weight: 2
    }).addTo(tectonicPlates);

    // Add to the map
    tectonicPlates.addTo(map);
  });
});