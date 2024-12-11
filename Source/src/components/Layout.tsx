/**
 * src/components/layout.tsx
 * Created by BJ Rutledge
 * Date: 2024-12-11
 **/

import * as React from "react";
import { ReactNode } from "react";
import { Box, Container, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import NavLink from "./NavLink"; // Import the NavLink component

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navSpacing = useBreakpointValue({ base: "1", md: "2" });

  return (
    <Box>
      <header>
        <Flex
          as="nav"
          p={4}
          bg="green.500"
          color="white"
          justify="space-between"
          align="center"
          height="60px"
        >
          <Box as="h1" mb={{ base: 4, md: 0 }} height="100%">
            <GatsbyLink
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Sound Building Components Inc.
            </GatsbyLink>
          </Box>
          <Flex
            as="ul"
            listStyleType="none"
            m={0}
            p={0}
            flexDirection={{ base: "column", md: "row" }}
            alignItems="stretch"
            height="100%"
          >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/our-team">Our Team</NavLink>
            <NavLink to="/contact-us">Contact Us</NavLink>
          </Flex>
        </Flex>
      </header>
      <Container maxW="container.lg" px={{ base: 4, md: 8 }}>
        <main>{children}</main>
      </Container>
      <footer>
        <Box p={4} bg="gray.800" color="white" textAlign="center">
          © {new Date().getFullYear()} Sound Building Components Inc.
        </Box>
      </footer>
    </Box>
  );
};

export default Layout;
