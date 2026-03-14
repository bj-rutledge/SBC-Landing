/**
 * Author: BJ Rutledge
 * Date: December 15, 2024
 **/
import { useState, useEffect } from 'react';
import jobsData from '../../resources/working-sbc-website-jobs-list.json';
import { MapInfoCard } from '../../types';

const useReadJsonFile = (): MapInfoCard[] => {
  const [sbcJobs, setSbcJobs] = useState<MapInfoCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // console.debug('Fetching JSON Location data');
      try {
        const response = await axios.get(dataEndpoint);
        const jobs = response.data;

        const validJobs: any = jobs
          .filter((job: any) => job.Address && job.Address.trim() !== '' && job['Job Name'] && job['Job Name'].trim() !== '')
        setSbcJobs(validJobs);
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return sbcJobs;
};

export default useReadJsonFile;
