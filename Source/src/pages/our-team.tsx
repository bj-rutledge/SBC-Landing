/**
 * Created by BJ Rutledge
 * Date:2024-12-12
 **/
import * as React from 'react';
import Layout from '../components/Layout';
import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react';
const {useInView} = require('react-intersection-observer');
import Card from '../components/AboutCard';
import MotionBox from '../components/MotionBox';
import gregImg from '../images/greg.jpg';
import julia from '../images/julia.jpg';
import james from '../images/james.jpg';
import ClientImage from '../components/ClientImage'; // Import the ClientImage component
import daveyJones from '../images/davey-bg.jpg';
import steve from '../images/steve.jpg';
import team from '../images/team.jpg';
import '../styles.css';

const OurTeamPage: React.FC = () =>{
   const {ref: ref1, inView: inView1} = useInView({
      triggerOnce: true,
      threshold: 0.1,
   });   
   const {ref: ref2, inView: inView2} = useInView({
      triggerOnce: true,
      threshold: 0.1,
   });      
   const {ref: ref3, inView: inView3} = useInView({
      triggerOnce: true,
      threshold: 0.1,
   });      
   const {ref: ref4, inView: inView4} = useInView({
      triggerOnce: true,
      threshold: 0.1,
   });  
   const {ref: ref5, inView: inView5} = useInView({
      triggerOnce: true,
      threshold: 0.1,
   }); 
   return (
   
      <Layout>
         <Box p={5}>
            <Heading 
               className='text-shadow'
               as="h1" 
               textAlign="center" 
               color='green.600'
               fontSize={{ base: '3xl', md: '4xl', lg: '5xl'}}
            >
               Our Team
            </Heading>
            <Box mt={4} className='team-image-container'> 
               <ClientImage src={team} alt="Our Team" className='pop-in'/>
            </Box>
            <Box className='fade-in'>

            <Text mt={4} color='primary' textAlign='center'>
               Meet the dedicated team members behind Sound Building Components
               Inc. Our experts are here to ensure the highest quality in building
               wall panels for large construction projects such as apartment
               buildings, condos, and more.
            </Text>
            <Text mt={4} color='primary'textAlign='center'>
               At SBC, we are deeply committed to supporting our employees,
               fostering a positive and empowering workplace. Our mission is to
               uplift and provide growth opportunities for every team member,
               ensuring their well-being and professional development. We pride
               ourselves on our dedication to excellence and our focus on creating
               a collaborative environment where our employees can thrive.
            </Text>
            <Text mt={4} color='primary' textAlign='center'>
               We take immense pride in our strong community of professionals who
               are at the heart of everything we do. Located in Sedro Woolley, WA,
               SBC continues to innovate and lead in the construction industry,
               always putting our people first.
            </Text>
            </Box>
   
            <Box mt={8} className='card-container'>
               <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                  <Box
                     ref={ref1}
                     className={inView1 ? 'fade-in' : 'fade-out'}
                  >
                     <Card
                        imageSrc={james}
                        name="James Pfaff"
                        description="With a diverse 25-year plus career in construction and wall panel design, James has designed over 23 million square feet of residential space, leveraging his hands-on experience in framing, siding, roofing, and finish work, and his expertise in using AutoCAD for wall panel design."
                        ImageComponent={ClientImage} // Use ClientImage for loading the image
                     />
                  </Box>
                  <Box
                     ref={ref2}
                     className={inView2 ? 'fade-in' : 'fade-out'}
                  >
                     <Card
                        imageSrc={julia}
                        name="Julia Phay Pfaff"
                        description="Julia is our office Manager, and is dedicated to making Sound Building Components a safe and welcoming environment where employees are proud of the work they accomplish."
                        ImageComponent={ClientImage} // Use ClientImage for loading the image
                     />
                  </Box>
                  <Box
                     ref={ref3}
                     className={inView3 ? 'fade-in' : 'fade-out'}
                  >
                     <Card
                        imageSrc={gregImg}
                        name="Greg Norvell"
                        description="Greg, starting in the Wall Panel Industry in 1992, has spent 28 years building and shipping panelized homes and apartments to Alaska, Japan, and Greater Seattle, proving his dedication to quality, excellent managerial skills, and timely project completion."
                        ImageComponent={ClientImage} // Use ClientImage for loading the image
                     />
                  </Box>
                  <Box
                     ref={ref4}
                     className={inView4 ? 'fade-in' : 'fade-out'}
                  >
                     <Card
                        imageSrc={daveyJones}
                        name="Davey Jones"
                        description="With a diverse 25-year career in construction and wall panel design, James has designed over 23 million square feet of residential space. He leverages hands-on experience in framing, siding, roofing, and finish work, along with expertise in AutoCAD for wall panel design."
                        ImageComponent={ClientImage}
                     />
                  </Box>
                  <Box
                     ref={ref5}
                     className={inView5 ? 'fade-in' : 'fade-out'}
                  >
                     <Card
                        imageSrc={steve}
                        name="Steve Dausey"
                        description="Steve is a super cool dude who knows karate!"
                        ImageComponent={ClientImage}
                     />
                  </Box>
               </SimpleGrid>
            </Box>
         </Box>
      </Layout>
   );
} 

export default OurTeamPage;
