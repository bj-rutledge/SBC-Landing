import React, { useEffect, useState, useRef } from 'react';
import { Box, Text, Heading, Link } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { MapInfoCard } from '../types';
import axios from 'axios';

const key = process.env.GATSBY_GOOGLE_MAPS_API_KEY;

const MapInfoCardAerialView: React.FC<MapInfoCard> = ({
   title,
   address,
   contractorWebsite,
   funFacts,
   contractor,
   sqFt,
   onClose,
}) => {
   const [aerialViewUrl, setAerialViewUrl] = useState('');
   const [streetViewUrl, setStreetViewUrl] = useState<string>('');
   const [error, setError] = useState('');
   const cardRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const fetchAerialViewUrl = async () => {
         try {
            console.debug('Fetching Arial View');
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
               setAerialViewUrl(videoData.uris.MP4_HIGH.landscapeUri);
            } else if (videoData.state === 'PROCESSING') {
               setError(
                  'Aerial view video is still processing. Please check back later.',
               );
            } else {
               setError('No Aerial Video Available');
            }
         } catch (error) {
            if (axios.isAxiosError(error)) {
               if (error.response?.status === 404) {
                  setError('No Aerial Video Available');
               } else if (error.response?.status === 401) {
                  setError('Unauthorized access. Please check your API key.');
               } else {
                  setError('Error fetching aerial view.');
               }
            } else {
               setError('An unknown error occurred.');
            }
         }
      };

      const fetchStreetViewUrl = async () => {
         console.debug('Fetching street view');
         try {
            const response = await axios.get(
               `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${encodeURIComponent(
                  address,
               )}&key=${key}`,
            );
            if (response.status === 200) {
               setStreetViewUrl(response.config.url || '');
            } else {
               setError('No Street View Available');
            }
         } catch (error) {
            setError('Error fetching street view.');
         }
      };

      fetchAerialViewUrl().then(() => {
         if (!aerialViewUrl) {
            fetchStreetViewUrl();
         }
      });

      //close the window when user clicks outside of it
      const handleClickOutside = (event: MouseEvent) => {
         if (
            cardRef.current &&
            !cardRef.current.contains(event.target as Node)
         ) {
            onClose();
         }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [address, onClose]);

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
         {aerialViewUrl ? (
            <Box
               width="100%"
               maxWidth="300px"
               mx="auto"
               animation={`${fadeIn} 2s ease-in-out`}
            >
               <video controls autoPlay loop width="100%">
                  <source src={aerialViewUrl} type="video/mp4" />
                  Your browser does not support the video tag.
               </video>
            </Box>
         ) : streetViewUrl ? (
            <Box
               width="100%"
               maxWidth="300px"
               mx="auto"
               animation={`${fadeIn} 2s ease-in-out`}
            >
               <img src={streetViewUrl} alt="Street View" width="100%" />
            </Box>
         ) : error ? (
            <Text>{error}</Text>
         ) : (
            <Text>Loading aerial view or street view...</Text>
         )}
         <Box className="info-window-content" p={4}>
            <Text fontSize="lg" textAlign="center" fontWeight="bold" mb={6}>
               Over the last 20 years, we have built a total of 13,584,812
               square feet of projects!
            </Text>
            <Heading as="h1" size="md" textAlign="center">
               <strong>{title}</strong>
            </Heading>
            <Text>
               <strong>Address:</strong> {address}
            </Text>
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
