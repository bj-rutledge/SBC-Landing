/**
 * Created by BJ Rutledge
 * Date: 2024-12-13
 **/
import React from "react";
import { Box, Text, Heading, Link } from "@chakra-ui/react";
import ClientImage from "./ClientImage"; // Import the ClientImage component

type MapInfoCard = {
  imageSrc: string;
  title: string;
  subtitle?: string;
  address: string;
  phone: string;
  email: string;
  funFacts?: string;
};

const InfoCard: React.FC<MapInfoCard> = ({
  imageSrc,
  title,
  subtitle,
  address,
  phone,
  email,
  funFacts,
}) => {
  return (
    <Box className="info-window">
      <ClientImage src={imageSrc} alt={title} /> {/* Use ClientImage instead of Image */}
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

export default InfoCard;
