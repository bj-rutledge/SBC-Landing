import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Box, Select, Heading, Flex } from '@chakra-ui/react';
import MapInfoCardAerialView from './MapInfoCardAerialView';
import useWindowSize from '../hooks/useWindowSize';
import { contractors } from './data/contractors'; 
import useReadJsonFile from '../hooks/useReadJsonFile';

const key = process.env.GATSBY_GOOGLE_MAPS_API_KEY;
//todo Need to set up a map ID in the Google Cloud Console
//current map id is a placeholder
const mapId = 'DEMO_MAP_ID'; 

declare global {
  interface Window {
    initMap: () => void;
  }
}

const Map: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedContractor, setSelectedContractor] = useState<string>('');
  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [allMarkers, setAllMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [activeInfoWindow, setActiveInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const [locations, setLocations] = useState<any>([]);

  const jobLocations = useReadJsonFile();

  useEffect(() => {
    setLocations(jobLocations);
  }, [jobLocations]);

  useEffect(() => {
    const initMap = () => {
      const mapElement = document.getElementById('map');
      if (mapElement) {
        const mapInstance = new window.google.maps.Map(mapElement, {
          center: { lat: 47.6062, lng: -122.3321 },
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.SATELLITE,
          mapId: mapId, // Use the mapId here
        });
        setMap(mapInstance);
      } else {
        console.error('Map container element not found');
      }
    };

    if (!map) {
      window.initMap = initMap;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&libraries=marker`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, [map]);

  useEffect(() => {
    if (map && locations.length > 0) {
      addMarkers();
    }
  }, [map, locations]);

  useEffect(() => {
    if (map && selectedContractor !== '') {
      filterMarkers(selectedContractor);
    } else if (map) {
      // Show all markers if no contractor is selected
      allMarkers.forEach((marker) => marker.map = map);
    }
  }, [selectedContractor]);

  const addMarkers = () => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();

      const newMarkers = locations.map((location: any) => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: location.geoLocation,
          title: location['Job Name'],
          map: map,
        });

        const infoWindow = new google.maps.InfoWindow();

        marker.addListener('click', () => {
          if (activeInfoWindow) {
            activeInfoWindow.close();
          }

          const content = document.createElement('div');
          const root = createRoot(content);
          root.render(
            <MapInfoCardAerialView
              title={location['Job Name']}
              address={location.Address}
              contractor={location.GC}
              framer={location.Framer}
              sqFt={location['sq/ft']}
              contractorWebsite={location['Contractor Website']}
              funFacts={`\nTotal Exterior Linear Feet Built:${location['Exterior LF']}\nTotal Interior Linear Feet Built: ${location['Interior LF']}`}
              onClose={() => infoWindow.close()}
              geoLocation={location.geoLocation}
            />
          );

          infoWindow.setContent(content);
          infoWindow.open(map, marker);

          setActiveInfoWindow(infoWindow);
        });

        const markerPosition = marker.position;
        if (markerPosition) {
          bounds.extend(markerPosition);
        }

        return marker;
      });

      setMarkers(newMarkers);
      setAllMarkers(newMarkers); // Maintain the complete list of markers

      // Adjust the map to fit all markers
      if (!bounds.isEmpty()) {
        map.fitBounds(bounds);
      }
    }
  };

  const filterMarkers = (contractor: string) => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();

      allMarkers.forEach((marker) => {
        const location = locations.find((loc: any) => loc['Job Name'] === marker.title);
        if (location && (!contractor || location.GC === contractor)) {
          marker.map = map;
          const markerPosition = marker.position;
          if (markerPosition) {
            bounds.extend(markerPosition);
          }
        } else {
          marker.map = null;
        }
      });

      if (bounds.isEmpty()) {
        map.setCenter({ lat: 47.6062, lng: -122.3321 });
        map.setZoom(10);
      } else {
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
      <Heading as="h1" mb={5} textAlign="center" color="green.600">
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
      </Box>
    </Flex>
  );
};

export default Map;