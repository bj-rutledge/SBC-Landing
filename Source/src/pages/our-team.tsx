// src/pages/our-team.tsx
import * as React from "react";
import Layout from "../components/Layout";
import { Box, Heading, Text } from "@chakra-ui/react";

const OurTeamPage = () => (
  <Layout>
    <Box p={5}>
      <Heading as="h1">Our Team</Heading>
      <Text mt={4}>
        Meet the dedicated team members behind Sound Building Components Inc. Our experts are here to ensure the best quality and service.
      </Text>
    </Box>
  </Layout>
);

export default OurTeamPage;
