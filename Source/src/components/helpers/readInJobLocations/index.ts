/**
 * Author: BJ Rutledge
 * Date: December 15, 2024
 **/

import { useState, useEffect } from 'react';
import { MapInfoCard } from '../../../types';
const dataEndoint = process.env.GATSBY_COMPLETED_JOBS_ENDPOINT as string;
// console.log(dataEndoint);
const useReadJsonFile = (): MapInfoCard[] => {
   const [mapInfoCards, setMapInfoCards] = useState<MapInfoCard[]>([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(dataEndoint);
            const jobs = await response.json();
            // Filter out jobs with empty addresses and Job Name
            const validJobs = jobs.filter(
               (job: any) =>
                  job.Address &&
                  job.Address.trim() !== '' &&
                  job['Job Name'] &&
                  job['Job Name'].trim() !== '',
            );

            const mapInfoCards: MapInfoCard[] = validJobs.map((job: any) => ({
               title: job['Job Name'],
               subtitle: `Contractor: ${job.GC}`,
               address: job.Address,
               contractor: job.GC,
               geoLocation: job.geoLocation,
               funFacts:
                  job['sq/ft'] !== '' ? `Square Feet: ${job['sq/ft']}` : '',
            }));

            setMapInfoCards(mapInfoCards);
         } catch (error) {
            console.error('Error reading JSON file:', error);
         }
      };

      fetchData();
   }, []);

   return mapInfoCards;
};

export default useReadJsonFile;
