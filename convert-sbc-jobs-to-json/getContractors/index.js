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

function toTitleCaseWords(name) {
   const isAllCapsWord = (value) => value === value.toUpperCase();

   return name
      .trim()
      .split(/\s+/)
      .map((word) =>
         word
            .split('-')
            .map((part) => {
               if (!part) {
                  return part;
               }

               if (isAllCapsWord(part)) {
                  return part;
               }

               return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
            })
            .join('-'),
      )
      .join(' ');
}

data.forEach((job) => {
   if (job.GC && job.GC != '') {
      const originalGcName = String(job.GC).trim();
      const gcLookupKey = originalGcName.toLowerCase();

      if (!memo[gcLookupKey]) {
         dataOut.push(toTitleCaseWords(originalGcName));
         memo[gcLookupKey] = true;
      }
   }
});

fs.writeFileSync('Contractors.json', JSON.stringify(dataOut, null, 2), 'utf-8');
