/**
 * Created by BJ Rutledge
 * Date:2024-12-26
 * We need to be able to access the job data from the Total-Output-Data.json file
 * throughout the app. This context provider will allow us to do that.
 **/
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import axios from 'axios';

const dataEndpoint = `${process.env.GATSBY_DATA_ENDPOINT}Total-Output-Data.json`;

interface SbcOutputData {
  "Total Exterior Linear Feet": number;
  "Total Interial Linear Feet": number;
  "Total Miles Built": number;
  "Total Square Footage": number;
}

interface SbcOutputDataContextProps {
  data: SbcOutputData | null;
  loading: boolean;
  error: string | null;
}

const SbcOutputDataContext = createContext<SbcOutputDataContextProps | undefined>(undefined);

export const SbcOutputDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  return (
    <SbcOutputDataContext.Provider value={{ data, loading, error }}>
      {children}
    </SbcOutputDataContext.Provider>
  );
};

export const useSbcOutputData = () => {
  const context = useContext(SbcOutputDataContext);
  if (context === undefined) {
    throw new Error('useSbcOutputData must be used within a SbcOutputDataProvider');
  }
  return context;
};