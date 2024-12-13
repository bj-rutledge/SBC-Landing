/**
 * Created by BJ Rutledge
 * Date:2024-12-10
 **/
import * as React from "react";
import { Box } from "@chakra-ui/react";
import Layout from "../components/Layout";
import AnimatedImages from "../components/AnimatedImages"; // Import the new component

const IndexPage = () => (
  <Layout>
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <AnimatedImages />
    </Box>
  </Layout>
);

export default IndexPage;
