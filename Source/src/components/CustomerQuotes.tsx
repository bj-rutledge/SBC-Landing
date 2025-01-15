import * as React from 'react';
import { SimpleGrid, Heading, Stack } from '@chakra-ui/react';
import CustomerQuotesCard from './CustomerQuotesCard';

interface Quote {
   text: string;
   author: string;
   link?: string;
   linkText?: string;
}

interface CustomerQuotesProps {
   quotes: Quote[];
}

const CustomerQuotes: React.FC<CustomerQuotesProps> = ({ quotes }) => {
   return (
      <Stack spacing={8} mt={10} align="center">
         <Heading as="h2" size="lg" color='green.600'>
            Customer Quotes
         </Heading>
         <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {quotes.map((quote, index) => (
               <CustomerQuotesCard
                  key={index}
                  quote={quote.text}
                  author={quote.author}
                  link={quote.link}
                  linkText={quote.linkText}
               />
            ))}
         </SimpleGrid>
      </Stack>
   );
};

export default CustomerQuotes;
