/**
 * Author: BJ Rutledge
 * Date: December 15, 2024
 **/

import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapInfoCard } from '../../../types';

const dataEndpoint = process.env.GATSBY_COMPLETED_JOBS_ENDPOINT as string;

const useReadJsonFile = (): MapInfoCard[] => {
  const [mapInfoCards, setMapInfoCards] = useState<MapInfoCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(dataEndpoint);
        const jobs = response.data;
        // Filter out jobs with empty addresses and Job Name
        const validJobs = jobs.filter(
          (job: any) =>
            job.Address &&
            job.Address.trim() !== '' &&
            job['Job Name'] &&
            job['Job Name'].trim() !== ''
        );
        setMapInfoCards(validJobs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return mapInfoCards;
};

export default useReadJsonFile;
