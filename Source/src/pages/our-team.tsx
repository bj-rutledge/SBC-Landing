/**
 * Created by BJ Rutledge
 * Date:2024-12-12
 **/
import * as React from 'react';
import Layout from '../components/Layout';
import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import Card from '../components/AboutCard';
import MotionBox from '../components/MotionBox';
import gregImg from '../images/greg.jpg';
import julia from '../images/julia.jpg';
import james from '../images/james.jpg';
const OurTeamPage = () => (
  <Layout>
    <Box p={5}>
    <Heading as='h1' textAlign='center'>Our Team</Heading>
      <Text mt={4} color={'primary'}>
        Meet the dedicated team members behind Sound Building Components Inc. Our experts are here to ensure the highest quality in building wall panels for large construction projects such as apartment buildings, condos, and more.
      </Text>
      <Text mt={4} color={'primary'}>
        At SBC, we are deeply committed to supporting our employees, fostering a positive and empowering workplace. Our mission is to uplift and provide growth opportunities for every team member, ensuring their well-being and professional development. We pride ourselves on our dedication to excellence and our focus on creating a collaborative environment where our employees can thrive.
      </Text>
      <Text mt={4} color={'primary'}>
        We take immense pride in our strong community of professionals who are at the heart of everything we do. Located in Sedro Woolley, WA, SBC continues to innovate and lead in the construction industry, always putting our people first.
      </Text>

      <Box mt={8}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Card 
              imageSrc={james}
              name='James Pfaff'
              description='With a diverse 25-year plus career in construction and wall panel design, James has designed over 23 million square feet of residential space, leveraging his hands-on experience in framing, siding, roofing, and finish work, and his expertise in using AutoCAD for wall panel design.'
            />
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Card 
              imageSrc={julia}
              name='Julia Phay Pfaff'
              description='Julia is our office Manager, and is dedicated to making Sound Building Components a safe and welcoming environment where employees are proud of the work they accomplish.'
            />
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Card 
              imageSrc={gregImg}
              name='Greg Norvell'
              description='Greg, starting in the Wall Panel Industry in 1992, has spent 28 years building and shipping panelized homes and apartments to Alaska, Japan, and Greater Seattle, proving his dedication to quality, excellent managerial skills, and timely project completion.'
            />
          </MotionBox>
        </SimpleGrid>
      </Box>
    </Box>
  </Layout>
);

export default OurTeamPage;
