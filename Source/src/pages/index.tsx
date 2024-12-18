/**
 * Created by BJ Rutledge
 * Date:2024-12-10
 **/
import * as React from 'react';
import { Box, Heading, Text, SimpleGrid, Stack, List, ListItem } from '@chakra-ui/react';
import Layout from '../components/Layout';
import ClientImage from '../components/ClientImage';
import CustomerQuotes from '../components/CustomerQuotes';
import MotionBox from '../components/MotionBox'; // Import your custom MotionBox
import bigCrane from '../images/landing/craneBG.jpg';
import eveningSite from '../images/landing/eveningSite.jpg';
import sunset from '../images/landing/sunset.jpg';
import quotes from '../components/data/quotes';

const IndexPage = () => {
  return (
    <Layout>
      <MotionBox
        bg="gray.100"
        p={5}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <MotionBox
          as={Heading}
         //  size="2xl"
          mb={4}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          textAlign="center"
        >
          Sound Building Components Inc.
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={10} alignItems="center">
            <ClientImage src={bigCrane} alt="Big Crane" />
            <Text fontSize="lg" textAlign={{ base: 'center', md: 'left' }}>
              Sound Building Components (SBC) was formed out of necessity to modernize the “Wall Panel” component for building Multi-family projects. Wall Panels are wood framed walls built in a factory environment to maximize the percent of materials used and minimize waste caused by typical onsite framing practices. SBC is dedicated to building high quality wall panels to aid in the construction of residential buildings. Collectively SBC has over 20 years in the wall panel industry. Our goal is to make Sound Building Components a household name among Architects, Structural Engineers, General Contractors and Framers in the Pacific Northwest.
            </Text>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={10} alignItems="center">
            <Box>
              <Heading as="h2" size="lg" mb={4} textAlign={{ base: 'center', md: 'left' }}>
                Benefits of Using ACAD Design/Layout in a Controlled Manufacturing Environment
              </Heading>
              <List spacing={3} textAlign={{ base: 'center', md: 'left' }}>
                <ListItem>Reduce weather-related damage</ListItem>
                <ListItem>Maintain construction schedule</ListItem>
                <ListItem>Meets or exceeds structural requirements</ListItem>
                <ListItem>Quality control performed in a single location before product delivery</ListItem>
                <ListItem>Less waste</ListItem>
                <ListItem>Easy customization</ListItem>
                <ListItem>All structural elements located and integrated into wall or floor systems</ListItem>
              </List>
            </Box>
            <ClientImage src={eveningSite} alt="Evening Site" />
          </SimpleGrid>

          <ClientImage src={sunset} alt="Sunset" width="100%" />

          <CustomerQuotes quotes={quotes} />
        </MotionBox>
      </MotionBox>
    </Layout>
  );
};

export default IndexPage;
