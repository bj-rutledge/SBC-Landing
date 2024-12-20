/**
 * Created by BJ Rutledge
 * Date:2024-12-20
 **/
const xlsx = require('xlsx');
/**
 *
 * @param {string} filePath path to file
 * @param {string} sheetName Sheet name
 * @returns Array of objects
 */
function readInExcelSheet(filePath, sheetName) {
   const workbook = xlsx.readFile(filePath);
   //return an array
   const worksheet = workbook.Sheets[sheetName];
   const data = xlsx.utils.sheet_to_json(worksheet);
   return data;
}

module.exports = readInExcelSheet;
