/**
 * Created by BJ Rutledge
 * Date:2024-12-19
 **/
const getGeolocation = require('../getGeoLocation');

/**
 *
 * @param {Object} array Array of objects with Address property
 * @returns Array of objects with added property geoLocation
 */
const addGeolocations = async (array) => {
   const result = [];
   for (const obj of array) {
      //only add objects that have an address and geolocation
      if (obj.Address && obj.Address != '') {
         const geoLocation = await getGeolocation(obj.Address);
         if (geoLocation) {
            result.push({
               ...obj,
               geoLocation: geoLocation,
            });
         }
      }
   }
   return result;
};

module.exports = addGeolocations;
