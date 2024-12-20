const fs = require('fs');
const path = require('path');
const readInExcelSheet = require('./readInExcelSheet');
const addGeolocations = require('./addGeolocationProperty');
require('dotenv').config();

const apiKey = process.env.MAPS_API_KEY;

// Read Excel file and add geo location property to objects
const filePath = './spreadsheets/sbc-website-jobs-list.xlsm';
const sheetName = 'SBC';
const dataArray = readInExcelSheet(filePath, sheetName);
addGeolocations(dataArray).then((dataWithGeo) => {
   // const jsonData = JSON.stringify(dataWithGeo);
   const outputFileName =
      path.basename(filePath, path.extname(filePath)) + '.json';
   // Generate the JSON file name based on the Excel file name
   // Save JSON to a file
   fs.writeFileSync(
      outputFileName,
      JSON.stringify(dataWithGeo, null, 2),
      'utf-8',
   );
   console.log(`Excel data converted to JSON and saved to ${outputFileName}`);
});
