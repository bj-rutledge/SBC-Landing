// src/components/layout.tsx
import * as React from "react";
import { ReactNode } from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Box>
    <header>
      <Flex as="nav" p={4} bg="green.500" color="white" justify="space-between" align="center" height="60px">
        <Box as="h1" mb={{ base: 4, md: 0 }} height="100%">
          <GatsbyLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Sound Building Components Inc.
          </GatsbyLink>
        </Box>
        <Flex as="ul" listStyleType="none" m={0} p={0} flexDirection={{ base: 'column', md: 'row' }} alignItems="stretch" height="100%">
          <li><GatsbyLink to="/">Home</GatsbyLink></li>
          <li><GatsbyLink to="/projects">Projects</GatsbyLink></li>
          <li><GatsbyLink to="/our-team">Our Team</GatsbyLink></li>
          <li><GatsbyLink to="/contact-us">Contact Us</GatsbyLink></li>
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

export default Layout;
