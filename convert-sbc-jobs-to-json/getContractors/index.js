/**
 * Author: BJ Rutledge
 * Date: 2024-12-16
 * Description: This script retrieves unique contractor names from
 * all SBC jobs listed in the provided spreadsheet.
 *
 * It ensures no duplicate names are included, regardless of case
 * sensitivity (i.e., 'Contractor' and 'contractor' are considered the same).
 * The unique contractor names are then saved to a JSON file.
 **/

const fs = require('fs');
const path = require('path');
const data = require('..//working-sbc-website-jobs-list 06.27.26.json');

const dataOut = [];
const memo = {};

const sourceOutputPath = path.resolve(
   __dirname,
   '../../Source/src/components/data/Contractors.json',
);
const localOutputPath = path.resolve(__dirname, 'Contractors.json');

data.forEach((job) => {
   if (job.GC && job.GC != '') {
      const originalGcName = String(job.GC).trim().replace(/\s+/g, ' ');
      const gcLookupKey = originalGcName.toLowerCase();

      if (!memo[gcLookupKey]) {
         dataOut.push(originalGcName);
         memo[gcLookupKey] = true;
      }
   }
});

dataOut.sort((a, b) => a.localeCompare(b));

const outJson = `${JSON.stringify(dataOut, null, 2)}\n`;
fs.writeFileSync(sourceOutputPath, outJson, 'utf-8');
fs.writeFileSync(localOutputPath, outJson, 'utf-8');
