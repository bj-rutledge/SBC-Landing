/**
 * Author: BJ Rutledge
 * Date: December 15, 2024
 **/
import { useState, useEffect } from 'react';
import jobsData from '../../resources/working-sbc-website-jobs-list.json';
import { MapInfoCard } from '../../models/types';

const useReadJsonFile = (): MapInfoCard[] => {
  const [sbcJobs, setSbcJobs] = useState<MapInfoCard[]>([]);

  useEffect(() => {
    try {
      const validJobs: any = jobsData
        .filter((job: any) => job.Address && job.Address.trim() !== '' && job['Job Name'] && job['Job Name'].trim() !== '')
      setSbcJobs(validJobs);
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  }, []);

  return sbcJobs;
};

export default useReadJsonFile;
