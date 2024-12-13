// src/components/InfoCard.tsx
import React from "react";
import { Box, Image, Text, Heading, Link } from "@chakra-ui/react";
type InfoCardProps = {
  imageUrl: string;
  title: string;
  subtitle?: string;
  address: string;
  phone: string;
  email: string;
  funFacts?: string;
};

const InfoCard: React.FC<InfoCardProps> = ({
  imageUrl,
  title,
  subtitle,
  address,
  phone,
  email,
  funFacts,
}) => {
  return (
    <Box className="info-window">
      <Image src={imageUrl} alt={title} />
      <Box className="info-window-content" p={4}>
        <Heading as="h2" size="md">
          {title}
        </Heading>
        <Heading as="h4" size="sm" mt={2}>
          {subtitle}
        </Heading>
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
