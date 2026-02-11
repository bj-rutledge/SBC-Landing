import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Box, Text, Heading, Link, IconButton, Image } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
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
  images = [],
}) => {
  const [state, setState] = useState({
    aerialViewUrl: '',
    streetViewUrl: '',
    error: '',
  });
  const [isAerialViewLoaded, setAerialViewLoaded] = useState(false);
  const [isStreetViewLoaded, setStreetViewLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  // const {data, loading, error } = useSbcOutputData();

  const fetchAerialViewUrl = useCallback(async () => {
    if(isAerialViewLoaded) return false;
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

  const mediaItems = React.useMemo(() => {
    const items: { type: 'image' | 'video'; url: string }[] = [];

    // 1. Load all available job images
    if (images && Array.isArray(images)) {
      images.forEach((img) => {
        items.push({ type: 'image', url: encodeURI(`${img}`) });
      });
    }

    // 2. Append sky view
    if (state.aerialViewUrl) {
      items.push({ type: 'video', url: state.aerialViewUrl });
    }

    // 3. Fallback: If no job images exist, show street view (if aerial is also missing, this logic handles it by checking items.length)
    // Note: If aerial exists, items is not empty, so street view is skipped.
    if (items.length === 0 && state.streetViewUrl) {
      items.push({ type: 'image', url: state.streetViewUrl });
    }

    return items;
  }, [images, state.aerialViewUrl, state.streetViewUrl]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);

  // Reset slide when content changes
  useEffect(() => setCurrentSlide(0), [mediaItems.length]);

  return (
    <Box
      className="info-window"
      ref={cardRef}
      onClick={(e) => e.stopPropagation()} // Stop propagation on click inside the card
    >
      {mediaItems.length > 0 ? (
        <Box
          position="relative"
          width="100%"
          maxWidth="300px"
          mx="auto"
          animation={`${fadeIn} 2s ease-in-out`}
        >
          {mediaItems[currentSlide].type === 'video' ? (
            <video controls autoPlay loop width="100%">
              <source src={mediaItems[currentSlide].url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image 
              src={mediaItems[currentSlide].url} 
              alt="Job Site" 
              width="100%" 
              objectFit="cover"
              maxH="200px"
            />
          )}

          {mediaItems.length > 1 && (
            <Box display="flex" justifyContent="center" mt={2}>
              <IconButton
                aria-label="Previous"
                icon={<ChevronLeftIcon />}
                onClick={prevSlide}
                size="sm"
                colorScheme="gray"
                isRound
              />
              <Text mx={4} alignSelf="center">
                {currentSlide + 1} / {mediaItems.length}
              </Text>
              <IconButton
                aria-label="Next"
                icon={<ChevronRightIcon />}
                onClick={nextSlide}
                size="sm"
                colorScheme="gray"
                isRound
              />
            </Box>
          )}
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
