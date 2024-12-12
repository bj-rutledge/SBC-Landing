// src/components/Card.tsx
import * as React from "react";
import { Box, Image, Text, VStack, Flex } from "@chakra-ui/react";

interface CardProps {
  imageSrc: string;
  name: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, name, description }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p={4}
      textAlign="center"
      height="450px" // Set a fixed height
      display="flex"
      flexDirection="column"
      justifyContent="start" // Ensure content starts at the top
    >
      <Image
        src={imageSrc}
        alt={name}
        boxSize="150px"
        objectFit="cover"
        boxShadow="lg"
        alignSelf="center" // Center the image horizontally
      />
      <Flex flexDirection="column" justifyContent="space-between" height="100%">
        <VStack spacing={4} mt={4}>
          <Text fontWeight="bold" fontSize="xl">
            {name}
          </Text>
          <Text>
            {description}
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Card;
