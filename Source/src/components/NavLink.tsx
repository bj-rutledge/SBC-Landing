/**
 * Created by BJ Rutledge
 * Date:2024-12-10
 **/
import * as React from 'react';
import { Box, Link as ChakraLink } from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';

interface NavLinkProps {
   to: string;
   children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
   <Box
      as="li"
      mx={2}
      mb={{ base: 2, md: 0 }}
      _hover={{ bg: 'green.800' }} // No border radius
      transition="background-color 0.2s"
      height="100%" // Ensures it fills the height of the nav bar
      display="flex"
      alignItems="center"
   >
      <ChakraLink
         as={GatsbyLink}
         to={to}
         style={{ color: 'inherit', textDecoration: 'none' }}
         display="flex"
         alignItems="center"
         justifyContent="center"
         height="100%" // Ensures link fills the height of its parent
         px={4} // Padding to make it easier to click
      >
         {children}
      </ChakraLink>
   </Box>
);

export default NavLink;
