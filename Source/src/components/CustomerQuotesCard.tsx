import * as React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

interface CustomerQuotesCardProps {
   quote: string;
   author: string;
   link?: string;
   linkText?: string;
}

const CustomerQuotesCard: React.FC<CustomerQuotesCardProps> = ({
   quote,
   author,
   link,
   linkText,
}) => {
   return (
      <Box
         borderWidth="1px"
         borderRadius="lg"
         overflow="hidden"
         boxShadow="md"
         p={4}
         textAlign="center"
         display="flex"
         flexDirection="column"
         justifyContent="start"
      >
         <VStack spacing={4} mt={4}>
            <Text color='green.600' fontWeight="bold" fontSize="xl">
               {author}
            </Text >
            <Text>{quote}</Text>
            {link && (
               <Text fontSize="sm" color="blue.500">
                  <a href={link} target="_blank" rel="noopener noreferrer">
                     {linkText}
                  </a>
               </Text>
            )}
         </VStack>
      </Box>
   );
};

export default CustomerQuotesCard;
