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
const data = require('../sbc-website-jobs-list.json');

const dataOut = [];
const memo = {};
data.forEach((job) => {
   if (job.GC && job.GC != '') {
      const gcLowerCase = job.GC.toLowerCase();
      if (!memo[gcLowerCase]) {
         dataOut.push(job.GC);
         memo[gcLowerCase] = true;
      }
   }
});

fs.writeFileSync('Contractors.json', JSON.stringify(dataOut, null, 2), 'utf-8');
