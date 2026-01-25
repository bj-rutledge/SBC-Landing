const fs = require('fs');
const path = require('path');

// CONFIGURATION
const INPUT_FILE = './sbc-website-jobs-list.json';
const OUTPUT_FILE = './sbc-website-jobs-list-with-photos.json';
// Ensure this directory exists and contains folders named after Job Codes (e.g. "20-K")
const PHOTOS_SOURCE_DIR = './photos'; 
// This is the path your HTML/Website will use to load the image
const PUBLIC_URL_PREFIX = '/images/jobs'; 
const MAX_PHOTOS_PER_JOB = 50; // Safety cap to prevent massive JSON files

function attachPhotos() {
    console.time('Execution Time');
    // 1. Read the existing jobs list
    if (!fs.existsSync(INPUT_FILE)) {
        console.error(`Error: Could not find ${INPUT_FILE}`);
        process.exit(1);
    }
    const rawData = fs.readFileSync(INPUT_FILE);
    const jobs = JSON.parse(rawData);

    console.log(`Processing ${jobs.length} jobs...`);

    // 2. Iterate and attach photos
    const updatedJobs = jobs.map(job => {
        // Determine the folder name: Use Job Code, fallback to Job Name
        let identifier = job['Job Code'];
        if (!identifier || typeof identifier !== 'string') {
            identifier = job['Job Name'];
        }

        if (!identifier) {
            // Some jobs in your list (like "Fiora") might not have a Job Code
            return job;
        }

        // Sanitize the identifier (trim spaces to handle "23-D ")
        const folderName = identifier.trim();
        
        // Check if the directory exists
        const jobPhotoPath = path.join(PHOTOS_SOURCE_DIR, folderName);
        
        if (fs.existsSync(jobPhotoPath)) {
            // Read files in the directory
            const files = fs.readdirSync(jobPhotoPath).filter(file => {
                const ext = path.extname(file).toLowerCase();
                return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
            });

            if (files.length > 0) {
                // Limit the number of photos per job to keep JSON size manageable
                const selectedFiles = files.slice(0, MAX_PHOTOS_PER_JOB);
                // Create the public URL paths
                job.images = selectedFiles.map(file => `${PUBLIC_URL_PREFIX}/${folderName}/${file}`);
                console.log(`Found ${files.length} photos for ${folderName}`);
            }
        }

        return job;
    });

    // 3. Save the updated JSON
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(updatedJobs, null, 3));
    console.log(`Done! Saved to ${OUTPUT_FILE}`);
    console.timeEnd('Execution Time');
}

attachPhotos();
