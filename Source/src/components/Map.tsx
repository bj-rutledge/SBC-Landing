/**
 * Created by BJ Rutledge
 * Date:2024-12-12
 * Refactored for MFD and proper rendering 2024-12-13
 **/

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import { Box, Select, Heading, Flex } from "@chakra-ui/react";
// import MapInfoCard from "./MapInfoCard";
import MapInfoCardAerialView from "./MapInfoCardArialView";
// import MapInfoCardStreetView from "./MapInfoCardStreetview";
import { Location } from "../types";
import useWindowSize from "../hooks/useWindowSize";
import locations from "./data/locations"; // Import locations
const key = 'AIzaSyBcES1hGuygyYXwZswFCQP4yC6iSqvmCU8';

declare global {
  interface Window {
    initMap: () => void;
  }
}

type Region = "washington" | "hawaii";

const Map: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region>("washington");

  useEffect(() => {
    const initMap = () => {
      const mapElement = document.getElementById("map");
      if (mapElement) {
        const mapInstance = new window.google.maps.Map(mapElement, {
          center: { lat: 47.6062, lng: -122.3321 },
          zoom: 10,
        });
        setMap(mapInstance);
        setGeocoder(new window.google.maps.Geocoder());
      } else {
        console.error("Map container element not found");
      }
    };

    window.initMap = initMap;
    const loadScript = () => {
      if (!document.getElementById("google-maps-script")) {
        const script = document.createElement("script");
        script.id = "google-maps-script";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
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
    if (map && geocoder) {
      loadLocations(selectedRegion);
    }
  }, [map, geocoder, selectedRegion]);

  const loadLocations = (region: Region) => {
    if (map) {
      map.setCenter(
        region === "washington" ? { lat: 47.6062, lng: -122.3321 } : { lat: 20.789, lng: -156.407 }
      );
      map.setZoom(region === "washington" ? 10 : 7);

      locations[region].forEach((location) => {
        geocodeAddress(location);
      });
    }
  };

  const geocodeAddress = (location: Location) => {
    if (geocoder && map) {
      geocoder.geocode({ address: location.address }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const marker = new window.google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            title: location.title,
          });

          const infoWindow = new window.google.maps.InfoWindow();

          marker.addListener("click", () => {
            const content = document.createElement("div");
            const root = createRoot(content); // Use createRoot instead of ReactDOM.render
            root.render(
              <MapInfoCardAerialView
                // imageSrc={location.imageSrc}
                title={location.title}
                subtitle={location.subtitle}
                address={location.address}
                phone={location.phone}
                email={location.email}
                funFacts={location.funFacts}
              />
            );
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
          });
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    }
  };

  const windowSize = useWindowSize();
  const isMobile = windowSize.width <= 768;
  return (
    <Flex direction="column" width="100%" minHeight="80vh" p={4} alignItems="center">
      <Heading as="h1" mb={5} textAlign="center">
        Our Job Locations
      </Heading>
      <Box width={isMobile ? "90vw" : `${Math.min(windowSize.width * 0.95, 1200)}px`} mx="auto">
        <Select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value as Region)}
          mb={4}
          width="200px" // Make the dropdown list smaller
          alignSelf="flex-start" // Left justify the dropdown list
        >
          <option value="washington">Washington</option>
          <option value="hawaii">Hawaii</option>
        </Select>
      </Box>
      <Box
        id="map"
        flexGrow="1"
        height="66vh" // Set a fixed height
        width={isMobile ? "90vw" : `${Math.min(windowSize.width * 0.95, 1200)}px`} // Adjust width based on screen size
        mx="auto" // Center the map horizontally
      />
    </Flex>
  );
};

export default Map;
