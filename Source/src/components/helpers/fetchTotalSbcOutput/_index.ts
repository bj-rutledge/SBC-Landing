/**
 * Author: BJ Rutledge
 * Date: December 26, 2024
 **/

import { useState, useEffect } from 'react';
import totalOutputData from '../../data/Total-Output-Data.json';
import { SbcOutputData } from '../../../models/types';


const useFetchSbcOutputData = () => {
  const [data, setData] = useState<SbcOutputData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setData(totalOutputData);
    } catch (err) {
      setError('Error loading data');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
};

export default useFetchSbcOutputData;
