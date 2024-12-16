/**
 * Author: BJ Rutledge
 * Date: December 15, 2024
 **/

import { useState, useEffect } from 'react';
import { MapInfoCard } from '../../../types';
const dataEndoint = 'http://localhost:8080/lifetimeJobsCompleted.json'; 

const useReadJsonFile = (): MapInfoCard[] => {
  const [mapInfoCards, setMapInfoCards] = useState<MapInfoCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataEndoint);
        const jobs = await response.json();

        const mapInfoCards: MapInfoCard[] = jobs.Sheet1.map((job: any) => ({
          title: job['Job Name'],
          subtitle: `Contractor: ${job.GC}`,
          address: job.Address,
          contractor: job.GC,
          funFacts: job['sq/ft'] !== '' ? `Square Feet: ${job['sq/ft']}` : '',
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
