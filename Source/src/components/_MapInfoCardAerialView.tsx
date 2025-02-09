import React, { useState, useEffect, useRef, useCallback } from  'react';
import axios from 'axios';
import { Box, Text, Heading, Link, Spinner } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { MapInfoCard } from '../types';

const key = process.env.GATSBY_GOOGLE_MAPS_API_KEY;


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
  const [isLoading, setIsLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  const fetchAerialViewUrl = useCallback(async () => {
    try {
      const videoResponse = await axios.get(
        `https://aerialview.googleapis.com/v1/videos:lookupVideo?address=${encodeURIComponent(address)}&key=${key}`,
      );
      const videoData = videoResponse.data;

      if (videoData.state === 'ACTIVE' && videoData.uris && videoData.uris.MP4_HIGH) {
        setState((prevState) => ({ ...prevState, aerialViewUrl: videoData.uris.MP4_HIGH.landscapeUri }));
      } else {        
        // No need to set error here; proceed to street view attempt
      }
    } catch (error) {
      // No need to set error here; proceed to street view attempt
    } // No finally block needed here since we'll set loading in the useEffect after both fetches
  }, [address]);

  const fetchStreetViewUrl = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${encodeURIComponent(address)}&key=${key}`,
      );
      if (response.status === 200) {
        setState((prevState) => ({ ...prevState, streetViewUrl: response.config.url || '' }));
      }
    } catch (error) {
     // No need to set error here as the lack of a URL will trigger the "no image" condition
    } // No finally block needed here since we'll set loading in the useEffect after both fetches
  }, [address]);

  useEffect(() => {
    setIsLoading(true); // Start loading

    Promise.all([fetchAerialViewUrl(), fetchStreetViewUrl()]) // Fetch both concurrently
      .then(() => {
        // Check if either fetch was successful (has a URL)
        if (!state.aerialViewUrl && !state.streetViewUrl) {
          setState(prevState => ({ ...prevState, error: "No aerial or street view available" }));
        }
      })
      .catch(err => { // Handle errors if any of the Promises reject
          setState(prevState => ({ ...prevState, error: "Error fetching images."})); // Generic error message 
      })
      .finally(() => setIsLoading(false)); // Stop loading, regardless of success or failure

    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, fetchAerialViewUrl, fetchStreetViewUrl]);



  const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
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
            <Text fontSize="lg" textAlign="center" fontWeight="bold" mb={6}>
              Since 2013 we have built a total of 13,584,812 square feet of projects!
            </Text>
            <Heading as="h1" size="md" textAlign="center">
              <strong>{title}</strong>
            </Heading>
            {address && (<Text>{address}</Text>)}
            {/* <Text>
              <strong>Address:</strong> {address}
            </Text> */}
            {contractor && (
              <Text>
                <strong>Contractor:</strong> {contractor}
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

