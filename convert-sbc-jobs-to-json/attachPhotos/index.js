const fs = require('fs');
const path = require('path');

// CONFIGURATION
// Ensure this directory exists and contains folders named after Job Codes (e.g. "20-K")
const PHOTOS_SOURCE_DIR = path.resolve(__dirname, '../../Source/static/images/jobs');
const PUBLIC_URL_PREFIX = '/images/jobs'; 
const MAX_PHOTOS_PER_JOB = 50; // Safety cap to prevent massive JSON files

const getPhotosForJob = (jobName) => {
    console.log(`jobName received: "${jobName}"`);
    if (!jobName) {
        return [];
    }

    // Sanitize the identifier (trim spaces to handle "23-D ") and convert to lowercase for comparison
    const targetFolder = String(jobName).trim().toLowerCase();
    
    // Check if the source directory exists
    if (fs.existsSync(PHOTOS_SOURCE_DIR)) {
        // Find a folder that matches the job name case-insensitively
        const matchedFolder = fs.readdirSync(PHOTOS_SOURCE_DIR).find(entry => 
            entry.trim().toLowerCase() === targetFolder
        );

        if (matchedFolder) {
            const jobPhotoPath = path.join(PHOTOS_SOURCE_DIR, matchedFolder);
            
            // Ensure it is a directory
            if (fs.statSync(jobPhotoPath).isDirectory()) {
                // Read files in the directory
                const files = fs.readdirSync(jobPhotoPath).filter(file => {
                    const ext = path.extname(file).toLowerCase();
                    return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
                });

                if (files.length > 0) {
                    // Limit the number of photos per job to keep JSON size manageable
                    const selectedFiles = files.slice(0, MAX_PHOTOS_PER_JOB);
                    // Create the public URL paths
                    console.log(`Found ${files.length} photos for ${matchedFolder}`);
                    return selectedFiles.map(file => `${PUBLIC_URL_PREFIX}/${matchedFolder}/${file}`);
                }
            }
        }
    }
    console.log(`No photos found for job: "${jobName}"`);   
    return [];
};

module.exports = getPhotosForJob;
