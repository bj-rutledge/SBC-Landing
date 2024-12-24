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
import { useOnScreen } from '../hooks/useOnScreen'; // Import the custom hook
import '../styles.css'; // Import the custom CSS file

const IndexPage = () => {
   const [ref, isVisible] = useOnScreen({ threshold: 0.05 });

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
            animate={{ opacity: isVisible ? 1 : 0 }}
            // Define the duration and delay for the animation
            transition={{ duration: 1, delay: 0.5 }}
            ref={ref}
         >
            <Box textAlign="center" mb={10}>
               <Heading as="h2" size={{ base: 'md', md: 'lg' }} mb={4}>
                  <motion.span
                     initial={{ opacity: 0 }}
                     animate={{ opacity: isVisible ? 1 : 0 }}
                     transition={{ duration: 1, delay: 0.5 }}
                  >
                     IDEA.
                  </motion.span>{' '}
                  <motion.span
                     initial={{ opacity: 0 }}
                     animate={{ opacity: isVisible ? 1 : 0 }}
                     transition={{ duration: 1, delay: 1.5 }}
                  >
                     DESIGN.
                  </motion.span>{' '}
                  <motion.span
                     initial={{ opacity: 0 }}
                     animate={{ opacity: isVisible ? 1 : 0 }}
                     transition={{ duration: 1, delay: 2.5 }}
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

               <CustomerQuotes quotes={quotes} />
            </MotionBox>
         </MotionBox>
      </Layout>
   );
};

export default IndexPage;
