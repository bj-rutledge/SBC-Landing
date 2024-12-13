/**
 * Created by BJ Rutledge
 * Date:2024-12-10
 **/
import * as React from "react";
import Layout from "../components/Layout";
import Map from "../components/Map";
import { motion } from "framer-motion"; // Import Framer Motion

const ProjectsPage = () => (
  <Layout>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }} // Increase duration to 2 seconds
    >
      <Map />
    </motion.div>
  </Layout>
);

export default ProjectsPage;
