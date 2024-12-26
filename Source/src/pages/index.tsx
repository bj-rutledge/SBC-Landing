/**
 * Created by BJ Rutledge
 * Date:2024-12-10
 **/
import * as React from 'react';
import {
   Box,
   Heading,
   Text,
   SimpleGrid,
   List,
   ListItem,
   Image
} from '@chakra-ui/react';
import Layout from '../components/Layout';
import CustomerQuotes from '../components/CustomerQuotes';
import MotionBox from '../components/MotionBox'; // Import your custom MotionBox
import ClientImage from '../components/ClientImage';
import bigCrane from '../images/landing/craneBG.jpg';
import eveningSite from '../images/landing/eveningSite.jpg';
import sunset from '../images/landing/sunset.jpg';
import quotes from '../components/data/quotes';
import { motion } from 'framer-motion'; // Import Framer Motion
import { useInView } from 'react-intersection-observer'; // Import the custom hook
import { useSbcOutputData } from '../contexts/SbcOutputDataContext';
import addCommasToNumber from '../components/helpers/addCommasToNumber';
import '../styles.css'; // Import the custom CSS file

const IndexPage: React.FC = () => {
   const { ref, inView } = useInView({
      triggerOnce: true, // Trigger animation only once
      threshold: 0.1, // Trigger when 10% of the element is in view
   });
   const { data, loading, error } = useSbcOutputData();

   return (
      <Layout>
         <Box position="relative" width="100%" height="auto">
            <ClientImage src={sunset} alt="Sunset" width="100%" maxHeight={'100%'}/>
            <MotionBox
               as={Heading}
               className="heading-overlay"
               initial={{ opacity: 1, y: 0 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1 }}
            >
               SOUND BUILDING COMPONENTS INC.
            </MotionBox>
         </Box>

         <MotionBox
            bg="gray.100"
            p={5}
            initial={{ opacity: 0 }}
            // Trigger animation to fully visible if the element is in view
            animate={{ opacity: inView ? 1 : 0 }}
            // Define the duration and delay for the animation
            transition={{ duration: 2, delay: 0.5 }} // Increase duration and add delay
            ref={ref}
         >
            <Box textAlign="center" mb={10}>
               <Heading as="h2" size={{ base: 'md', md: 'lg' }} mb={4}>
                  <motion.span
                     initial={{ opacity: 0 }}
                     animate={{ opacity: inView ? 1 : 0 }}
                     transition={{ duration: 2, delay: 1 }} // Increase duration and add delay
                  >
                     IDEA.
                  </motion.span>{' '}
                  <motion.span
                     initial={{ opacity: 0 }}
                     animate={{ opacity: inView ? 1 : 0 }}
                     transition={{ duration: 2, delay: 2 }} // Increase duration and add delay
                  >
                     DESIGN.
                  </motion.span>{' '}
                  <motion.span
                     initial={{ opacity: 0 }}
                     animate={{ opacity: inView ? 1 : 0 }}
                     transition={{ duration: 2, delay: 3 }} // Increase duration and add delay
                  >
                     BUILD.
                  </motion.span>
               </Heading>
               <Text fontSize={{ base: 'md', md: 'lg' }}>
                  Driven by a passion for innovative and timeless design
                  combined with superior craftsmanship, Sound Building Inc.
                  delivers building solutions that are high quality and
                  affordable.
               </Text>
            </Box>

            <MotionBox
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 1 }}
            >
               <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={10}
                  mb={10}
                  alignItems="center"
               >
                  <ClientImage src={bigCrane} alt="Big Crane" />
                  <Text
                     fontSize={{ base: 'md', md: 'lg' }}
                     textAlign={{ base: 'center', md: 'left' }}
                  >
                     Sound Building Components (SBC) was formed out of necessity
                     to modernize the “Wall Panel” component for building
                     Multi-family projects. Wall Panels are wood framed walls
                     built in a factory environment to maximize the percent of
                     materials used and minimize waste caused by typical onsite
                     framing practices. SBC is dedicated to building high
                     quality wall panels to aid in the construction of
                     residential buildings. Collectively SBC has over 20 years
                     in the wall panel industry. Our goal is to make Sound
                     Building Components a household name among Architects,
                     Structural Engineers, General Contractors and Framers in
                     the Pacific Northwest.
                  </Text>
               </SimpleGrid>

               <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={10}
                  mb={10}
                  alignItems="center"
               >
                  <ClientImage
                     src={eveningSite}
                     alt="Evening Site"
                     display={{ base: 'block', md: 'none' }}
                  />
                  <Box>
                     <Heading
                        as="h2"
                        size={{ base: 'md', md: 'lg' }}
                        mb={4}
                        textAlign={{ base: 'center', md: 'left' }}
                     >
                        Benefits of Using ACAD Design/Layout in a Controlled
                        Manufacturing Environment
                     </Heading>
                     <List
                        spacing={3}
                        textAlign={{ base: 'center', md: 'left' }}
                     >
                        <ListItem>Reduce weather-related damage</ListItem>
                        <ListItem>Maintain construction schedule</ListItem>
                        <ListItem>
                           Meets or exceeds structural requirements
                        </ListItem>
                        <ListItem>
                           Quality control performed in a single location before
                           product delivery
                        </ListItem>
                        <ListItem>Less waste</ListItem>
                        <ListItem>Easy customization</ListItem>
                        <ListItem>
                           All structural elements located and integrated into
                           wall or floor systems
                        </ListItem>
                     </List>
                  </Box>
                  <ClientImage
                     src={eveningSite}
                     alt="Evening Site"
                     display={{ base: 'none', md: 'block' }}
                  />
               </SimpleGrid>
                  <Heading as="h2" size={{ base: 'md', md: 'lg' }} mb={4} textAlign={'center'}>
                     {`${addCommasToNumber(data?.['Total Square Footage'])} Square Feet Built and Counting`}
                  </Heading>
               <CustomerQuotes quotes={quotes} />
            </MotionBox>
         </MotionBox>
      </Layout>
   );
};

export default IndexPage;
