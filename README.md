# leaflet-challenge
Module 15 Challenge.

For this challege I combined part one and two for a cleaner personal workflow.

## Overview

This project uses Leaflet.js, D3.js, and USGS GeoJSON data to visualize all earthquakes that occurred in the past 7 days. It features dynamic circle markers where:

Color represents the depth of each earthquake.
Size (radius) represents the magnitude.
Popups display location, magnitude, and depth.
A legend helps interpret the depth-to-color scale.
Includes optional support for tectonic plate boundaries.

## Files

index.html — Main HTML structure.
logic.js — JavaScript for map creation, styling, and data binding.
style.css (optional) — Custom styling for your map or page.
README.md — Project overview and setup instructions.
## Technologies Used

Leaflet.js
D3.js
USGS GeoJSON Feed
OpenStreetMap
Tectonic plates data from Fraxen GitHub
## How It Works

The map initializes centered on the U.S.
Earthquake data is pulled in real-time from the USGS.
Each earthquake is represented by a circle marker:
Color = depth of the quake
Size = magnitude of the quake
A legend explains the color coding.
Users can switch between base map styles and toggle overlays like tectonic plates.

## Features

Real-time earthquake visualization
Interactive popups with key quake info
Color-coded depth scale
Layer controls:
Toggle between different base maps (e.g. Street vs. Base)
Toggle overlays (Earthquakes and Tectonic Plates)
Clean, responsive map layout

## Installation

Clone the repository or download the files.
Open index.html in a web browser.
Make sure your browser supports JavaScript and can load remote JSON files.

## Data Sources

Earthquakes: USGS GeoJSON Feed
Tectonic Plates: Fraxen’s Tectonic Plates GitHub


## References

Dataset created by the United States Geological Survey.

Any code I did not generate myself was from the Xpert learning assistant within this designated course and
modified by myself to create an applicable and working code. Xpert learning assistant is this course's Al tool.
