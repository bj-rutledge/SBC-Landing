import React from "react";
import { Box, Text, Heading, Link } from "@chakra-ui/react";

type MapInfoCard = {
  title: string;
  subtitle?: string;
  address: string;
  phone: string;
  email: string;
  funFacts?: string;
};

const MapInfoCardStreetView: React.FC<MapInfoCard> = ({
  title,
  subtitle,
  address,
  phone,
  email,
  funFacts,
}) => {
  // Construct the URL for the Google Static Street View API
  const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${encodeURIComponent(
    address
  )}&key=AIzaSyBcES1hGuygyYXwZswFCQP4yC6iSqvmCU8`;

  return (
    <Box className="info-window">
      <img src={streetViewUrl} alt={title} />
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

export default MapInfoCardStreetView;
