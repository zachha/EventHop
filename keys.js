require("dotenv").config();

exports.google = {
  key: process.env.GOOGLE_MAPS_API_KEY,
  url: "https://maps.googleapis.com/maps/api/js?key=" + process.env.GOOGLE_MAPS_API_KEY + "&libraries=places&callback=initMap"
};

