/**
 * Created by BJ Rutledge
 * Date:2024-12-12
 **/
import * as React from 'react';
import Layout from '../components/Layout';
import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import Card from '../components/AboutCard';
import MotionBox from '../components/MotionBox';
import gregImg from '../images/greg.jpg';
import julia from '../images/julia.jpg';
import james from '../images/james.jpg';
import ClientImage from '../components/ClientImage'; // Import the ClientImage component
import daveyJones from '../images/davey-bg.jpg';
import steve from '../images/steve.jpg';
import team from '../images/team.jpg';

// Define team member data structure
interface TeamMember {
  name: string;
  imageSrc: any; // Using any for image import types for simplicity, or use ImageDataLike
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "James Pfaff",
    imageSrc: james,
    description: "James began his career in wall panels in 1999 in La Conner, WA. Leveraging early opportunities to create shop drawings, using AutoCAD, he started developing the design process SBC uses today. In 2005, he launched Pfaff Contracting and Design, building homes hands-on framing, siding, roofing, and finish carpentry.  From 2006 -2012, he framed by day – sharpening his design expertise and consulted designing wall panels by night.  In 2013 he started SBC, with design being his prime focus. He averaged almost 1 million sq/ft per year for the first 5 years.  He has mastered the design process, creating the precise, efficient methods used today."
  },
  {
    name: "Julia Phay",
    imageSrc: julia,
    description: "Julia is our office Manager, and is dedicated to making Sound Building Components a safe and welcoming environment where employees are proud of the work they accomplish."
  },
  {
    name: "Greg Norvell",
    imageSrc: gregImg,
    description: "Greg, starting in the Wall Panel Industry in 1992, has spent 28 years building and shipping panelized homes and apartments to Alaska, Japan, and Greater Seattle, proving his dedication to quality, excellent managerial skills, and timely project completion."
  },
  {
    name: "Davey Jones",
    imageSrc: daveyJones,
    description: "With a diverse 25-year career in construction and wall panel design, James has designed over 23 million square feet of residential space. He leverages hands-on experience in framing, siding, roofing, and finish work, along with expertise in AutoCAD for wall panel design."
  },
  {
    name: "Steve Dausey",
    imageSrc: steve,
    description: "Steve is a super cool dude who knows karate!"
  }
];

// Reusable component for individual team members to handle their own animation state
const TeamMemberCard: React.FC<TeamMember> = ({ name, imageSrc, description }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box ref={ref} className={inView ? 'fade-in' : 'fade-out'}>
      <Card imageSrc={imageSrc} name={name} description={description} ImageComponent={ClientImage} />
    </Box>
  );
};

const OurTeamPage: React.FC = () => {
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
                  {teamMembers.map((member, index) => (
                     <TeamMemberCard key={index} {...member} />
                  ))}
               </SimpleGrid>
            </Box>
         </Box>
      </Layout>
   );
} 

export default OurTeamPage;
