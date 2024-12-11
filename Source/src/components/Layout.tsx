
/** 
 * src/components/layout.tsx
 * Created by BJ Rutledge
 * Date:2024-12-11
 **/

import * as React from "react";
import { ReactNode } from "react";
import { Box, Container, Flex, useColorMode, Button, Link as ChakraLink } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <header>
        <Flex as="nav" p={4} bg="blue.500" color="white" justify="space-between" align="center">
          <Box as="h1">
            <GatsbyLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Sound Building Components Inc.
            </GatsbyLink>
          </Box>
          <Flex as="ul" listStyleType="none" m={0} p={0}>
            <Box as="li" mx={2}>
              <ChakraLink as={GatsbyLink} to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                Home
              </ChakraLink>
            </Box>
            <Box as="li" mx={2}>
              <ChakraLink as={GatsbyLink} to="/projects" style={{ color: 'inherit', textDecoration: 'none' }}>
                Projects
              </ChakraLink>
            </Box>
            <Box as="li" mx={2}>
              <ChakraLink as={GatsbyLink} to="/our-team" style={{ color: 'inherit', textDecoration: 'none' }}>
                Our Team
              </ChakraLink>
            </Box>
            <Box as="li" mx={2}>
              <ChakraLink as={GatsbyLink} to="/contact-us" style={{ color: 'inherit', textDecoration: 'none' }}>
                Contact Us
              </ChakraLink>
            </Box>
          </Flex>
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
        </Flex>
      </header>
      <Container maxW="container.lg">
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
