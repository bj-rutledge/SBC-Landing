/**
 * Created by BJ Rutledge
 * Date: 2024-12-15
 **/

import { useState, useEffect } from 'react';
import { MapInfoCard } from '../../../types';

const useReadJsonFile = (): MapInfoCard[] => {
  const [mapInfoCards, setMapInfoCards] = useState<MapInfoCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('../data/lifetimeJobsCompleted.json');
        const jobs = await response.json();

        const mapInfoCards: MapInfoCard[] = jobs.map((job: any) => ({
          title: job.title,
          subtitle: job.subtitle,
          address: job.address,
          phone: job.phone,
          email: job.email,
          funFacts: job.funFacts,
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
