/**
 * Created by BJ Rutledge
 * Date:2024-12-15
 **/
const key = 'AIzaSyB73He37dJqk3u2WBTWKZltNBK8V2hP6vI';
import React, { useEffect, useState } from "react";
import { Box, Text, Heading, Link } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

type MapInfoCard = {
  title: string;
  subtitle?: string;
  address: string;
  phone: string;
  email: string;
  funFacts?: string;
};

const MapInfoCardAerialView: React.FC<MapInfoCard> = ({
  title,
  subtitle,
  address,
  phone,
  email,
  funFacts,
}) => {
  const [aerialViewUrl, setAerialViewUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAerialViewUrl = async () => {
      try {
        const videoResponse = await fetch(
          `https://aerialview.googleapis.com/v1/videos:lookupVideo?address=${encodeURIComponent(
            address
          )}&key=${key}`
        );

        if (!videoResponse.ok) {
          const videoError = await videoResponse.json();
          if (videoResponse.status === 404 && videoError.status === "NOT_FOUND") {
            setError("Aerial view video not found for this address.");
            return;
          } else if (videoResponse.status === 401) {
            setError("Unauthorized access. Please check your API key.");
            return;
          } else {
            throw new Error(`HTTP error! status: ${videoResponse.status}`);
          }
        }

        const videoData = await videoResponse.json();

        if (videoData.state === "ACTIVE" && videoData.uris && videoData.uris.MP4_HIGH) {
          setAerialViewUrl(videoData.uris.MP4_HIGH.landscapeUri);
        } else if (videoData.state === "PROCESSING") {
          setError("Aerial view video is still processing. Please check back later.");
        } else {
          setError("Aerial view video not available.");
        }
      } catch (error) {
        console.error("Error fetching aerial view:", error);
        setError("Error fetching aerial view.");
      }
    };

    fetchAerialViewUrl();
  }, [address]);


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

return (
  <Box className="info-window">
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
    ) : error ? (
      <Text>{error}</Text>
    ) : (
      <Text>Loading aerial view...</Text>
    )}
    <Box className="info-window-content" p={4}>
      <Heading as="h2" size="md">
        {title}
      </Heading>
      {subtitle && (
        <Heading as="h4" size="sm" mt={2}>
          {subtitle}
        </Heading>
      )}
      <Text>
        <strong>Address:</strong> {address}
      </Text>
      <Text>
        <strong>Phone:</strong> <Link href={`tel:${phone}`}>{phone}</Link>
      </Text>
      <Text>
        <strong>Email:</strong> <Link href={`mailto:${email}`}>{email}</Link>
      </Text>
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
