const fs = require('fs');
const path = require('path');
const readInExcelSheet = require('./readInExcelSheet');
const addGeolocations = require('./addGeolocationProperty');
const getPhotosForJob = require('./attachPhotos');
require('dotenv').config();

const apiKey = process.env.MAPS_API_KEY;

// Read Excel file and add geo location property to objects
const filePath = './spreadsheets/working-sbc-website-jobs-list.xlsm';
const sheetName = 'SBC';
const dataArray = readInExcelSheet(filePath, sheetName);
//add geolocation data and then proceed to attach photos
addGeolocations(dataArray).then((dataWithGeo) => {
   // Attach photos to the data
   const dataWithPhotos = dataWithGeo.map((job) => {
      // Try finding photos by Job Name first, fallback to Job Code
      let photos = getPhotosForJob(job['Job Name']);
      if (photos.length === 0) {
         photos = getPhotosForJob(job['Job Code']);
      }
      job.images = photos;
      return job;
   });

   const outputFileName =
      path.basename(filePath, path.extname(filePath)) + '.json';
   // Generate the JSON file name based on the Excel file name
   // Save JSON to a file
   fs.writeFileSync(
      outputFileName,
      JSON.stringify(dataWithPhotos, null, 2),
      'utf-8',
   );
   console.log(`Excel data converted to JSON and saved to ${outputFileName}`);
});
