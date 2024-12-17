/**
 * Created by BJ Rutledge
 * Date:2024-12-10
 **/
import * as React from 'react';
import Layout from '../components/Layout';
import Map from '../components/Map';
import { motion } from 'framer-motion'; // Import Framer Motion

const ProjectsPage = () => (
   <Layout>
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 2 }} // Increase duration for longer fade-in
         style={{ width: '100%' }} // Ensure it takes the full width of the container
      >
         <Map />
      </motion.div>
   </Layout>
);

export default ProjectsPage;
