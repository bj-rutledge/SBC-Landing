/**
 * Author: BJ Rutledge
 * Date: December 15, 2024
 **/
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapInfoCard } from '../../types';

const dataEndpoint = process.env.GATSBY_COMPLETED_JOBS_ENDPOINT as string;

const useReadJsonFile = (): MapInfoCard[] => {
  const [sbcJobs, setSbcJobs] = useState<MapInfoCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.debug('Fetching JSON Location data');
      try {
        const response = await axios.get(dataEndpoint);
        const jobs = response.data;

        // Filter and map the data to the correct format
        const validJobs: any = jobs
          .filter((job: any) => job.Address && job.Address.trim() !== '' && job['Job Name'] && job['Job Name'].trim() !== '')
          // .map((job: any) => ({
          //   title: job['Job Name'],
          //   address: job.Address,
          //   contractorWebsite: job['Contractor Website'] || '',
          //   funFacts: job['Fun Facts'] || '',
          //   contractor: job.GC || '',
          //   sqFt: job['sq/ft'].toString() || '',
          //   geoLocation: {
          //     lat: job.geoLocation.lat,
          //     lng: job.geoLocation.lng,
          //   },
          //   onClose: () => {},
          // }));

        setSbcJobs(validJobs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return sbcJobs;
};

export default useReadJsonFile;

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { MapInfoCard } from '../../../types';

// const dataEndpoint = process.env.GATSBY_COMPLETED_JOBS_ENDPOINT as string;

// const useReadJsonFile = (): MapInfoCard[] => {
//   const [mapInfoCards, setMapInfoCards] = useState<MapInfoCard[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       console.debug('Fetching JSON Location data');
//       try {
//         const response = await axios.get(dataEndpoint);
//         const jobs = response.data;

//         // Filter and map the data to the correct format
//         // const validJobs: MapInfoCard[] = jobs
//         const validJobs = jobs.filter(
//           (job: any) =>
//             job.Address &&
//             job.Address.trim() !== '' &&
//             job['Job Name'] &&
//             job['Job Name'].trim() !== ''
//         );
//           // .filter((job: any) => job.Address && job.Address.trim() !== '' && job['Job Name'] && job['Job Name'].trim() !== '')
//           // .map((job: any) => ({
//           //   title: job['Job Name'],
//           //   address: job.Address,
//           //   contractorWebsite: job['Contractor Website'],
//           //   funFacts: job['Fun Facts'],
//           //   contractor: job.GC,
//           //   sqFt: job['Square Footage'],
//           //   geoLocation: {
//           //     lat: job.Latitude,
//           //     lng: job.Longitude,
//           //   },
//           //   onClose: () => {},
//           // }));

//         setMapInfoCards(validJobs);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return mapInfoCards;
// };

// export default useReadJsonFile;
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { MapInfoCard } from '../../../types';

// const dataEndpoint = process.env.GATSBY_COMPLETED_JOBS_ENDPOINT as string;

// const useReadJsonFile = (): MapInfoCard[] => {
//   const [mapInfoCards, setMapInfoCards] = useState<MapInfoCard[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       console.debug('Fetching JSON Locaation data');
//       try {
//         const response = await axios.get(dataEndpoint);
//         const jobs = response.data;
        // Filter out jobs with empty addresses and Job Name
        // const validJobs = jobs.filter(
        //   (job: any) =>
        //     job.Address &&
        //     job.Address.trim() !== '' &&
        //     job['Job Name'] &&
        //     job['Job Name'].trim() !== ''
        // );
        // filter and map the data to the correct format
//         const validJobs: MapInfoCard[] = [];
//         for(let i = 0; i < jobs.length; i++) {
//           const job = jobs[i];
//           if(job.Address && job.Address.trim() !== '' && job['Job Name'] && job['Job Name'].trim() !== '') {
//             validJobs.push({
//               title: job['Job Name'],
//               address: job.Address,
//               contractorWebsite: job['Contractor Website'],
//               funFacts: job['Fun Facts'],
//               contractor: job.GC,
//               sqFt: job['Square Footage'],
//               geoLocation: {
//                 lat: job.Latitude,
//                 lng: job.Longitude,
//               },
//               onClose: () => {},
//             });
//           }
//         }


//         setMapInfoCards(validJobs);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return mapInfoCards;
// };

// export default useReadJsonFile;
