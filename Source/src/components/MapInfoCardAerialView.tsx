import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Box, Text, Heading, Link} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { MapInfoCard } from '../types';
// import { useSbcOutputData } from '../contexts/SbcOutputDataContext';


const key = process.env.GATSBY_GOOGLE_MAPS_API_KEY;
let debugAerialCount = 0;
let debugStreetCount = 0;

const MapInfoCardAerialView: React.FC<MapInfoCard> = ({
  title,
  address,
  contractorWebsite,
  funFacts,
  contractor,
  framer,
  sqFt,
  onClose,
}) => {
  const [state, setState] = useState({
    aerialViewUrl: '',
    streetViewUrl: '',
    error: '',
  });
  const [isAerialViewLoaded, setAerialViewLoaded] = useState(false);
  const [isStreetViewLoaded, setStreetViewLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  // const {data, loading, error } = useSbcOutputData();

  const fetchAerialViewUrl = useCallback(async () => {
    if(isAerialViewLoaded) return;
    try {
      
      console.debug('Fetching Arial View', ++debugAerialCount);
      const videoResponse = await axios.get(
        `https://aerialview.googleapis.com/v1/videos:lookupVideo?address=${encodeURIComponent(
          address,
        )}&key=${key}`,
      );

      const videoData = videoResponse.data;
      if (
        videoData.state === 'ACTIVE' &&
        videoData.uris &&
        videoData.uris.MP4_HIGH
      ) {
        setState((prevState) => ({
          ...prevState,
          aerialViewUrl: videoData.uris.MP4_HIGH.landscapeUri,
        }));
      } else if (videoData.state === 'PROCESSING') {
        setState((prevState) => ({
          ...prevState,
          error: 'Aerial view video is still processing. Please check back later.',
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          error: 'No Aerial Video Available',
        }));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setState((prevState) => ({
            ...prevState,
            error: 'No Aerial Video Available',
          }));
        } else if (error.response?.status === 401) {
          setState((prevState) => ({
            ...prevState,
            error: 'Unauthorized access. Please check your API key.',
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            error: 'Error fetching aerial view.',
          }));
        }
      } else {
        setState((prevState) => ({
          ...prevState,
          error: 'An unknown error occurred.',
        }));
      }
    }
    setAerialViewLoaded(true);
  }, [address]);

  const fetchStreetViewUrl = useCallback(async () => {
    if(isStreetViewLoaded) return;
    console.debug('Fetching street view', ++debugStreetCount);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${encodeURIComponent(
          address,
        )}&key=${key}`,
      );
      // If the response is successful, update the state with the street view URL
      if (response.status === 200) {
        setState((prevState) => ({
          ...prevState,
          streetViewUrl: response.config.url || '',
        }));
      } else {
        // If the response is not successful, update the state with an error message
        setState((prevState) => ({
          ...prevState,
          error: 'No Street View Available',
        }));
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: 'Error fetching street view.',
      }));
    }
    setStreetViewLoaded(true);
  }, [address]);

  useEffect(() => {
        fetchAerialViewUrl().then(() => {
          if (!state.aerialViewUrl) {
            fetchStreetViewUrl();
          }
    }, );

    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  // }, [address, onClose, fetchAerialViewUrl, fetchStreetViewUrl, state.aerialViewUrl, isAerialViewLoaded, isStreetViewLoaded]);
  }, []);

  const fadeIn = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;
  
  
  return (
    <Box
      className="info-window"
      ref={cardRef}
      onClick={(e) => e.stopPropagation()} // Stop propagation on click inside the card
    >
      {state.aerialViewUrl ? (
        <Box
          width="100%"
          maxWidth="300px"
          mx="auto"
          animation={`${fadeIn} 2s ease-in-out`}
        >
          <video controls autoPlay loop width="100%">
            <source src={state.aerialViewUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      ) : state.streetViewUrl ? (
        <Box
          width="100%"
          maxWidth="300px"
          mx="auto"
          animation={`${fadeIn} 2s ease-in-out`}
        >
          <img src={state.streetViewUrl} alt="Street View" width="100%" />
        </Box>
      ) : state.error ? (
        <Text>{state.error}</Text>
      ) : (
        <Text>Loading aerial view or street view...</Text>
      )}
      <Box className="info-window-content" p={4}>
        {/* <Text fontSize="lg" textAlign="center" fontWeight="bold" mb={6}>
          {data? `Total Square Footage: ${data["Total Square Footage"]}` : ''}
        </Text> */}
        <Heading as="h1" size="md" textAlign="center">
          <strong>{title}</strong>
        </Heading>
        {/* {address && (<Text>{address}</Text>)} */}
        <Text>
          <strong>Address:</strong> {address}
        </Text>
        {contractor && (
          <Text>
            <strong>General Contractor:</strong> {contractor}
          </Text>
        )}
        {framer && (
          <Text>
            <strong>Framing Contractor:</strong> {framer}
          </Text>
        )}
        {sqFt && (
          <Text>
            <strong>Square Feet:</strong> {sqFt}
          </Text>
        )}
        {contractorWebsite && (
          <Text>
            <strong>Contractor Website:</strong>{' '}
            <Link href={contractorWebsite} isExternal>
              {contractorWebsite}
            </Link>
          </Text>
        )}
        {funFacts && (
          <Text>
            <strong>Fun Facts:</strong> {funFacts}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default MapInfoCardAerialView;