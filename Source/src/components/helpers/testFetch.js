const fetchData = async () => {
   try {
      const response = await fetch(
         'http://localhost:8080/lifetimeJobsCompleted.json',
      ); // Note the relative path
      const jobs = await response.json();
      console.log('jobs', jobs);
      // Process your jobs data
   } catch (error) {
      console.error('Error reading JSON file:', error);
   }
};
fetchData();
