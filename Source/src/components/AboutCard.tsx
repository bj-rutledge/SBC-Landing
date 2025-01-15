/**
 * Created by BJ Rutledge
 * Date:2024-12-12
 * This component represents a card that displays an image, a name, and a description.
 * It uses a custom ImageComponent prop to render images, allowing flexibility in how
 * images are rendered.
 * This is particularly useful for ensuring images are only rendered on the client side,
 * which helps avoid server-side rendering issues related to the use of `useLayoutEffect`.
 */

import * as React from 'react';
import { Box, Text, VStack, Flex } from '@chakra-ui/react';

interface CardProps {
   imageSrc: string;
   name: string;
   description: string;
   ImageComponent: React.ElementType; // Accept an ImageComponent prop
}

const Card: React.FC<CardProps> = ({
   imageSrc,
   name,
   description,
   ImageComponent,
}) => {
   return (
      <Box
         borderWidth="1px"
         borderRadius="lg"
         overflow="hidden"
         boxShadow="md"
         p={4}
         textAlign="center"
         height="470px" // Set a fixed height
         display="flex"
         flexDirection="column"
         justifyContent="start" // Ensure content starts at the top
      >
         <ImageComponent
            src={imageSrc}
            alt={name}
            boxSize="150px"
            objectFit="cover"
            boxShadow="lg"
            alignSelf="center" // Center the image horizontally
         />
         <Flex
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
         >
            <VStack spacing={4} mt={4}>
               <Text fontWeight="bold" fontSize="2xl" color='green.600' >
                  {name}
               </Text>
               <Text color='primary'> {description}</Text>
            </VStack>
         </Flex>
      </Box>
   );
};

export default Card;
