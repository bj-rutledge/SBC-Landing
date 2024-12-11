import * as React from "react";
import { Box } from "@chakra-ui/react";
import Layout from "../components/Layout";
import AnimatedImages from "../components/AnimatedImages"; // Import the new component

const IndexPage = () => (
  <Layout>
    <Box width="100vw" height="100vh">
      <AnimatedImages />
    </Box>
  </Layout>
);

export default IndexPage;
