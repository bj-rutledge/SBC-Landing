/**
 * Created by BJ Rutledge
 * Date:2024-12-11
 **/
import * as React from 'react';
import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useBreakpointValue,
  UnorderedList,
  Image,
} from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import { HamburgerIcon } from '@chakra-ui/icons';
import MotionBox from './MotionBox'; // Import your custom MotionBox
import NavLink from './NavLink'; // Import the NavLink component
import logo from '../images/sbc-logo.jpg'; // Import the logo image

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bg="gray.100"> {/* Set background color */}
      <header>
        <Flex
          as="nav"
          p={[2, 4]} // Responsive padding
          bg="green.500"
          color="gray.100"
          justify="space-between"
          align="center"
          height={{ base: 'auto', md: '60px' }} // Adjust height for mobile
        >
          <GatsbyLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Image src={logo} alt="Sound Building Components Inc." height="60px" />
          </GatsbyLink>

          {isMobile ? (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
                bg="green.500"
                color="gray.100"
                border="none"
                _hover={{ bg: 'green.600' }}
                _expanded={{ bg: 'green.600' }}
              />
              <MenuList bg="gray.100" color="black">
                <MenuItem
                  as={GatsbyLink}
                  to="/"
                  _hover={{ bg: 'green.100' }}
                >
                  Home
                </MenuItem>
                <MenuItem
                  as={GatsbyLink}
                  to="/projects"
                  _hover={{ bg: 'green.100' }}
                >
                  Projects
                </MenuItem>
                <MenuItem
                  as={GatsbyLink}
                  to="/our-team"
                  _hover={{ bg: 'green.100' }}
                >
                  Our Team
                </MenuItem>
                <MenuItem
                  as={GatsbyLink}
                  to="/contact-us"
                  _hover={{ bg: 'green.100' }}
                >
                  Contact Us
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <UnorderedList
              m={0}
              p={0}
              display="flex"
              flexDirection={{ base: 'column', md: 'row' }}
              alignItems={{ base: 'start', md: 'center' }} // Adjust alignment for mobile
              height="100%"
              styleType="none"
            >
              <NavLink to="/">Home</NavLink>
              <NavLink to="/projects">Projects</NavLink>
              <NavLink to="/our-team">Our Team</NavLink>
              <NavLink to="/contact-us">Contact Us</NavLink>
            </UnorderedList>
          )}
        </Flex>
      </header>
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        flex="1"
      >
        <Box
          width="100%" // Ensure it takes the full width of the container
          flex="1"
          mt={[4, 8]}
          display="flex"
          flexDirection="column"
        >
          <main style={{ flex: '1' }}>{children}</main>
        </Box>
      </MotionBox>
      <footer style={{ flexShrink: 0 }}>
        <Box p={4} bg="gray.800" color="gray.100" textAlign="center">
          © {new Date().getFullYear()} Sound Building Components Inc.
        </Box>
      </footer>
    </Box>
  );
};

export default Layout;
