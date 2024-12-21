import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Box, Select, Heading, Flex } from '@chakra-ui/react';
import MapInfoCardAerialView from './MapInfoCardArialView';
import { MapInfoCard } from '../types';
import useWindowSize from '../hooks/useWindowSize';
import { contractors } from './data/contractors'; // Import contractors array
import useReadJsonFile from './helpers/readInJobLocations'; // Import custom hook

const key = process.env.GATSBY_GOOGLE_MAPS_API_KEY;

declare global {
   interface Window {
      initMap: () => void;
   }
}

const Map: React.FC = () => {
   const [map, setMap] = useState<google.maps.Map | null>(null);
   const [selectedContractor, setSelectedContractor] = useState<string>('');
   const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
   const [activeInfoWindow, setActiveInfoWindow] =
      useState<google.maps.InfoWindow | null>(null);

   // Use the custom hook to read job locations
   const locations = useReadJsonFile();

   useEffect(() => {
      const initMap = () => {
         const mapElement = document.getElementById('map');
         if (mapElement) {
            const mapInstance = new window.google.maps.Map(mapElement, {
               center: { lat: 47.6062, lng: -122.3321 },
               zoom: 10,
               mapTypeId: google.maps.MapTypeId.SATELLITE,
            });
            setMap(mapInstance);
         } else {
            console.error('Map container element not found');
         }
      };

      window.initMap = initMap;
      const loadScript = () => {
         if (!document.getElementById('google-maps-script')) {
            const script = document.createElement('script');
            script.id = 'google-maps-script';
            script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&loading=async`;
            script.async = true;
            script.defer = true;

            document.head.appendChild(script);
         } else {
            if (window.google) {
               initMap();
            }
         }
      };

      loadScript();
   }, []);

   useEffect(() => {
      if (map) {
         loadAllLocations();
      }
   }, [map, locations]);

   useEffect(() => {
      if (map) {
         filterMarkers(selectedContractor);
      }
   }, [selectedContractor, map]);

   const loadAllLocations = () => {
      if (map) {
         const allMarkers: google.maps.Marker[] = [];
         const bounds = new window.google.maps.LatLngBounds();

         locations.forEach((location) => {
            addMarker(location, allMarkers, bounds);
         });

         setMarkers(allMarkers);
         if (!bounds.isEmpty()) {
            map.fitBounds(bounds);
         }
      }
   };

   const addMarker = (
      location: MapInfoCard,
      allMarkers: google.maps.Marker[],
      bounds: google.maps.LatLngBounds,
   ) => {
      if (map) {
         const position = new google.maps.LatLng(
            location.geoLocation.lat,
            location.geoLocation.lng,
         );
         const marker = new google.maps.Marker({
            map: map,
            position: position,
            title: location.title,
         });

         const infoWindow = new google.maps.InfoWindow();

         marker.addListener('click', () => {
            const content = document.createElement('div');
            const root = createRoot(content);
            root.render(
               <MapInfoCardAerialView
                  title={location.title}
                  address={location.address}
                  contractor={location.contractor}
                  sqFt={location.sqFt}
                  contractorWebsite={location.contractorWebsite}
                  funFacts={location.funFacts}
                  onClose={() => infoWindow.close()}
                  geoLocation={location.geoLocation}
               />,
            );
            infoWindow.setContent(content);
            infoWindow.open(map, marker);

            // Close the previously opened info window
            if (activeInfoWindow) {
               activeInfoWindow.close();
            }
            setActiveInfoWindow(infoWindow);
         });

         allMarkers.push(marker);
         const markerPosition = marker.getPosition();
         if (markerPosition) {
            bounds.extend(markerPosition);
         }
      }
   };

   const filterMarkers = (contractor: string) => {
      if (map) {
         const bounds = new window.google.maps.LatLngBounds();
         const filteredMarkers = markers.filter((marker) => {
            const location = locations.find(
               (loc) => loc.title === marker.getTitle(),
            );
            return (
               location && (!contractor || location.contractor === contractor)
            );
         });

         filteredMarkers.forEach((marker) => {
            marker.setMap(map);
            const markerPosition = marker.getPosition();
            if (markerPosition) {
               bounds.extend(markerPosition);
            }
         });

         markers.forEach((marker) => {
            if (!filteredMarkers.includes(marker)) {
               marker.setMap(null);
            }
         });

         if (filteredMarkers.length === 1) {
            const markerPosition = filteredMarkers[0].getPosition();
            if (markerPosition) {
               map.setCenter(markerPosition);
               map.setZoom(15); // Adjust the zoom level as needed
            }
         } else if (!bounds.isEmpty()) {
            // Fit bounds if there are multiple markers
            map.fitBounds(bounds);
         }
      }
   };

   const windowSize = useWindowSize();
   const isMobile = windowSize.width <= 768;
   return (
      <Flex
         direction="column"
         width="100%"
         minHeight="80vh"
         p={4}
         alignItems="center"
      >
         <Heading as="h1" mb={5} textAlign="center">
            Our Job Locations
         </Heading>
         <Box
            width={
               isMobile
                  ? '90vw'
                  : `${Math.min(windowSize.width * 0.95, 1200)}px`
            }
            mx="auto"
         >
            <Select
               value={selectedContractor}
               onChange={(e) => setSelectedContractor(e.target.value)}
               mb={4}
               width="200px"
               alignSelf="flex-start"
            >
               <option value="">All Contractors</option>
               {contractors.map((contractor) => (
                  <option key={contractor} value={contractor}>
                     {contractor}
                  </option>
               ))}
            </Select>
         </Box>
         <Box
            id="map"
            flexGrow="1"
            height="66vh"
            width={
               isMobile
                  ? '90vw'
                  : `${Math.min(windowSize.width * 0.95, 1200)}px`
            }
            mx="auto"
         />
      </Flex>
   );
};

export default Map;
