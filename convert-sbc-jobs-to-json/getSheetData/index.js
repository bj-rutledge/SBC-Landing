const readInExcelSheet = require('../readInExcelSheet');
const fs = require('fs');
const path = require('path');

const sheetDataToJson = (filePath, sheetName) => {
   const data = readInExcelSheet(filePath, sheetName);

   if (!Array.isArray(data)) {
      throw new Error(`Expected array data from sheet "${sheetName}", but got ${typeof data}`);
   }

   if (data.length === 0) {
      throw new Error(
         `No rows found for sheet "${sheetName}" in file: ${filePath}. Check the sheet name and source workbook.`,
      );
   }

   //replace empty spaces in name with '-' before adding json extension
   const outputFileName = `${sheetName.replace(/ /g, '-')}.json`;
   const output = data.length > 1 ? data : data[0];
   fs.writeFileSync(outputFileName, JSON.stringify(output, null, 2), 'utf-8');
};

const filePath = path.resolve(__dirname, '../spreadsheets/working-sbc-website-jobs-list 06.27.26.xlsm');
sheetDataToJson(filePath, 'Total Output Data');