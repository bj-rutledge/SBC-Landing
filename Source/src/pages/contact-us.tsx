
import * as React from 'react';
import Layout from '../components/Layout';
import {
   Box,
   Heading,
   Text,
   FormControl,
   FormLabel,
   Input,
   Textarea,
   Button,
} from '@chakra-ui/react';

const ContactUsPage = () => (
   <Layout>
      <Box p={5}>
         <Heading color='green.600' as="h1">Contact Us</Heading>
         <Text 
          mt={4}>
            We'd love to hear from you! Please fill out the form below and we'll
            get in touch with you as soon as possible.
         </Text>
         <Box mt={8}>
            <FormControl id="name" isRequired>
               <FormLabel>Name</FormLabel>
               <Input placeholder="Your Name" />
            </FormControl>
            <FormControl id="email" isRequired mt={4}>
               <FormLabel>Email</FormLabel>
               <Input type="email" placeholder="your.email@example.com" />
            </FormControl>
            <FormControl id="message" isRequired mt={4}>
               <FormLabel>Message</FormLabel>
               <Textarea placeholder="Your Message" />
            </FormControl>
            <Button  mt={4} bg='green.500'color='white' _hover={{ bg: 'green.600' }}>
               Submit
            </Button>
         </Box>
      </Box>
   </Layout>
);

export default ContactUsPage;