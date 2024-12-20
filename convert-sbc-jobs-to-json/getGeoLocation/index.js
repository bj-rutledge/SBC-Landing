/**
 * Created by BJ Rutledge
 * Date:2024-12-19
 **/
const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.MAPS_API_KEY;
// Function to get geolocation for an address
const getGeolocation = async (address) => {
   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address,
   )}&key=${apiKey}`;

   try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.status === 'OK') {
         const location = data.results[0].geometry.location;
         return location;
      } else {
         console.error(`Geocoding failed for ${address}: ${data.status}`);
         return null;
      }
   } catch (error) {
      console.error(`Error fetching geolocation for ${address}:`, error);
      return null;
   }
};

module.exports = getGeolocation;
