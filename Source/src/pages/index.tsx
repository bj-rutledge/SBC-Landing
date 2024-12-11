// src/pages/index.tsx
import * as React from "react";
import Layout from '../components/Layout';
import { Box, Heading, Text } from "@chakra-ui/react";

const IndexPage = () => (
  <Layout>
    <Box p={5}>
      <Heading>Welcome to Sound Building Components</Heading>
      <Text mt={4}>
        Sound Building Components (SBC) was formed out of necessity to modernize the “Wall Panel” component for...
      </Text>
    </Box>
  </Layout>
);

export default IndexPage;
