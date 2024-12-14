/**
 * Created by BJ Rutledge
 * Date:2024-12-12
 * Refactored for MFD and proper rendering 2024-12-13
 **/

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom"; // Explicitly import ReactDOM
import { Box, Select, Heading, Flex } from "@chakra-ui/react";
import MapInfoCard from "./MapInfoCard";
import { Location } from "./helpers/types";
import useWindowSize from "../hooks/useWindowSize";

// Import local images
import Img1 from "../images/Illaria05.jpg";
import Img2 from "../images/Illaria06.jpg";
import Img3 from "../images/QATA_August_2013___1sm.jpg";
import Img4 from "../images/QATA_June_2013_Aerial_2sm.jpg";

declare global {
  interface Window {
    initMap: () => void;
  }
}

type Region = "washington" | "hawaii";

const locations: Record<Region, Location[]> = {
  washington: [
    {
      address: "123 Example St, Seattle, WA 98101",
      title: "Job Location 1",
      subtitle: "Project Alpha",
      phone: "123-456-7890",
      email: "info@joblocation1.com",
      funFacts: "This location was completed in 2020 and features sustainable building materials.",
      imageSrc: Img1,
      content: "Some Content!",
    },
    {
      address: "456 Another St, Seattle, WA 98102",
      title: "Job Location 2",
      subtitle: "Project Beta",
      phone: "987-654-3210",
      email: "info@joblocation2.com",
      funFacts: "This project won the best architecture award in 2019.",
      imageSrc: Img2,
      content: "",
    },
  ],
  hawaii: [
    {
      address: "Example St, Honolulu, HI 96813",
      title: "Hawaii Job 1",
      subtitle: "Project Aloha",
      phone: "808-123-4567",
      email: "info@hawaiijob1.com",
      funFacts: "This job features breathtaking ocean views.",
      imageSrc: Img3,
      content: "",
    },
    {
      address: "Another St, Maui, HI 96793",
      title: "Hawaii Job 2",
      subtitle: "Project Paradise",
      phone: "808-987-6543",
      email: "info@hawaiijob2.com",
      funFacts: "This project includes eco-friendly construction methods.",
      imageSrc: Img4,
      content: "",
    },
  ],
};

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
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBcES1hGuygyYXwZswFCQP4yC6iSqvmCU8&callback=initMap`;
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
            ReactDOM.render(
              <MapInfoCard
                imageSrc={location.imageSrc}
                title={location.title}
                subtitle={location.subtitle}
                address={location.address}
                phone={location.phone}
                email={location.email}
                funFacts={location.funFacts}
              />,
              content
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
    <Flex direction="column" width="100%" minHeight="80vh" p={4}>
      <Heading as="h1" mb={5}>
        Our Job Locations
      </Heading>
      <Select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value as Region)}
        mb={4}
      >
        <option value="washington">Washington</option>
        <option value="hawaii">Hawaii</option>
      </Select>
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
