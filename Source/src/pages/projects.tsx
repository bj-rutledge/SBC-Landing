// src/pages/projects.tsx
import * as React from "react";
import Layout from "../components/Layout";
import { Box, Heading, Text } from "@chakra-ui/react";

const ProjectsPage = () => (
  <Layout>
    <Box p={5}>
      <Heading as="h1">Projects</Heading>
      <Text mt={4}>
        Here you can find information about our past and current projects. Stay
        tuned for updates on our latest work.
      </Text>
    </Box>
  </Layout>
);

export default ProjectsPage;
