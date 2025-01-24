/**
 * Created by BJ Rutledge
 * Date:2024-11-15
 **/


import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, SimpleGrid, List, useStyleConfig } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Layout from '../components/Layout';
import CustomerQuotes from '../components/CustomerQuotes';
import MotionBox from '../components/MotionBox'; // Import your custom MotionBox
import ClientImage from '../components/ClientImage';
import MotionListItem from '../components/MotionListItem'; // Import MotionListItem
import bigCrane from '../images/landing/craneBG.jpg';
import eveningSite from '../images/landing/eveningSite.jpg';
import sunset from '../images/landing/sunset.jpg';
import quotes from '../components/data/quotes';
import { useSbcOutputData } from '../contexts/SbcOutputDataContext';
import addCommasToNumber from '../components/helpers/addCommasToNumber';
import '../styles.css'; // Import the custom CSS file

const IndexPage: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const { ref: ref1, inView: inView1 } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: ref2, inView: inView2 } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: ref3, inView: inView3 } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: ref4, inView: inView4 } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { data, loading, error } = useSbcOutputData();

  const headingStyles = useStyleConfig('PopHeading', {});

  return (
    <Layout>
      <Box
        position="relative"
        width="100%"
        height="100vh"
        bgImage={`url(${sunset})`}
        bgSize="cover"
        bgPosition="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        color="white"
        p={5}
      >
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: animate ? 1 : 0 }}
          transition={{ duration: 2, delay: 0.5 }} // Increase duration and add delay
        >
          <Heading  as="h1" size={{ base: '2xl', md: '4xl' }} mb={6}>
            <motion.span
              className="text-pop-in"
              initial={{ opacity: 0 }}
              animate={{ opacity: animate ? 1 : 0 }}
              transition={{ duration: 2, delay: 1 }} // Increase duration and add delay
            >
              IDEA.
            </motion.span>{' '}
            <motion.span
              className="text-pop-in"
              initial={{ opacity: 0 }}
              animate={{ opacity: animate ? 1 : 0 }}
              transition={{ duration: 2, delay: 2 }} // Increase duration and add delay
            >
              DESIGN.
            </motion.span>{' '}
            <motion.span
              className="text-pop-in"
              initial={{ opacity: 0 }}
              animate={{ opacity: animate ? 1 : 0 }}
              transition={{ duration: 2, delay: 3 }} // Increase duration and add delay
            >
              BUILD.
            </motion.span>
          </Heading>
          <Text fontSize={{ base: 'lg', md: '2xl' }} fontWeight="bold">
            Driven by a passion for innovative and timeless design combined with superior craftsmanship, Sound Building Inc. delivers building solutions that are high quality and affordable.
          </Text>
        </MotionBox>
      </Box>

      <MotionBox
        bg="gray.100"
        p={5}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView1 ? 1 : 0 }}
        transition={{ duration: 2, delay: 0.5 }} // Increase duration and add delay
        ref={ref1}
      >
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: inView1 ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Heading
            as="h2"
            size={{ base: 'lg', md: '2xl' }}
            mb={4}
            className='text-pop-in'
            textAlign="center"
          >
            {`${addCommasToNumber(data?.['Total Square Footage'])} Square Feet Built and Counting`}
          </Heading>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={10} alignItems="center">
          <ClientImage src={bigCrane} alt="Big Crane" />
          <Text fontSize={{ base: 'md', md: 'lg' }} textAlign={{ base: 'center', md: 'left' }}>
            Sound Building Components (SBC) was formed out of necessity to modernize the “Wall Panel” component for building Multi-family projects. Wall Panels are wood framed walls built in a factory environment to maximize the percent of materials used and minimize waste caused by typical onsite framing practices. SBC is dedicated to building high quality wall panels to aid in the construction of residential buildings. Collectively SBC has over 20 years in the wall panel industry. Our goal is to make Sound Building Components a household name among Architects, Structural Engineers, General Contractors and Framers in the Pacific Northwest.
          </Text>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={10} alignItems="center">
          <ClientImage 
            src={eveningSite}
            alt="Evening Site"
            display={{ base: 'block', md: 'none' }}
            ref={ref3}
            style={{
              opacity: inView2 ? 1 : 0,
              transition: 'opacity 2s ease-in-out',
            }}
          />
          <Box>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: inView2 ? 1 : 0, scale: inView2 ? 1 : 0.8 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              ref={ref2}
            >
              <Heading
                as="h2"
                size={{ base: 'md', md: 'lg' }}
                mb={4}
                textAlign={{ base: 'center', md: 'left' }}
                sx={headingStyles}
                color='green.600'
              >
                Benefits of Using ACAD Design/Layout in a Controlled Manufacturing Environment
              </Heading>
            </motion.div>
            <List spacing={3} textAlign={{ base: 'center', md: 'left' }}>
              {[
                'Reduce weather-related damage',
                'Maintain construction schedule',
                'Meets or exceeds structural requirements',
                'Quality control performed in a single location before product delivery',
                'Less waste',
                'Easy customization',
                'All structural elements located and integrated into wall or floor systems',
              ].map((item, index) => (
                <MotionListItem
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: inView2 ? 1 : 0, x: inView2 ? 0 : -20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                >
                  {item}
                </MotionListItem>
              ))}
            </List>
          </Box>
          <ClientImage
            src={eveningSite}
            alt="Evening Site"
            display={{ base: 'none', md: 'block' }}
            ref={ref3}
            style={{
              opacity: inView2 ? 1 : 0,
              transition: 'opacity 2s ease-in-out',
            }}
          />
        </SimpleGrid>
      </MotionBox>

      <Box p={5} textAlign="center" ref={ref4}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView4 ? 1 : 0, y: inView4 ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <CustomerQuotes quotes={quotes} />
        </motion.div>
      </Box>
    </Layout>
  );
};

export default IndexPage;