/**
 * Author: BJ Rutledge
 * Date: December 26, 2024
 **/

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { SbcOutputData } from '../../../types';

const dataEndpoint = `${process.env.GATSBY_DATA_ENDPOINT}/Total-Output-Data.json`;


  const useFetchSbcOutputData = () => {
    const [data, setData] = useState<SbcOutputData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchData = useCallback(() => {
      axios.get(dataEndpoint)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          setError('Error fetching data');
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  
    return { data, loading, error };
  };
  
  export default useFetchSbcOutputData;