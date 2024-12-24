const readInExcelSheet = require('../readInExcelSheet');
const fs = require('fs');

const sheetDataToJson = (filePath, sheetName) => {
   const data = readInExcelSheet(filePath, 'Total Square Footage');
   //replace empty spaces in name with '-' before adding json extension
   const outputFileName = `${sheetName.replace(/ /g, '-')}.json`;
   fs.writeFileSync(outputFileName, JSON.stringify(data, null, 2), 'utf-8');
};

const filePath = '../spreadsheets/sbc-website-jobs-list.xlsm';
sheetDataToJson(filePath, 'Total Linear Feet');
sheetDataToJson(filePath, 'Total Square Footage');
