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

        const validJobs: any = jobs
          .filter((job: any) => job.Address && job.Address.trim() !== '' && job['Job Name'] && job['Job Name'].trim() !== '')
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
