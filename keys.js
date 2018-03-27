require("dotenv").config();

exports.google = {
  key: process.env.GOOGLE_MAPS_API_KEY
};
 
const googleMapsClient = require("@google/maps").createClient({
  key: exports.google.key
});

