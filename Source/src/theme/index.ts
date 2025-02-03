/**
 * src/theme.tsx
 * Created by BJ Rutledge
 * Date: 2024-12-11
 **/
import { extendTheme } from '@chakra-ui/react';

const fonts = {
  heading: `'Titillium Web', sans-serif`,
  body: `'Titillium Web', sans-serif`,
};

const colors = {
  green: {
    50: '#e3f8f2',
    100: '#c6e9db',
    200: '#9dd6bf',
    300: '#74c3a3',
    400: '#50b28c',
    500: '#319e74',
    600: '#258256',
    700: '#1a6140',
    800: '#0e4129',
    900: '#01210f',
  },
  blue: {
    50: '#e3f2ff',
    100: '#b3d7ff',
    200: '#80baff',
    300: '#4d9eff',
    400: '#1b81ff',
    500: '#005fe6',
    600: '#0048b3',
    700: '#003180',
    800: '#001a4d',
    900: '#00021a',
  },
  white: {
    50: '#ffffff',
    100: '#f7f7f7',
    200: '#e6e6e6',
    300: '#d4d4d4',
    400: '#c2c2c2',
    500: '#b0b0b0',
    600: '#9d9d9d',
    700: '#8b8b8b',
    800: '#787878',
    900: '#656565',
  },
  text: {
    primary: '#00021a',
    secondary: '#0048b3',
  },
};

const keyframes = {
  popIn: {
    '0%': {
      transform: 'scale(0.5)',
      opacity: 0,
    },
    '50%': {
      transform: 'scale(1.2)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
};

const theme = extendTheme({
  colors,
  fonts,
  keyframes,
  styles: {
    global: {
      'html, body': {
        color: 'text.primary',
        bg: colors.white[50],
        lineHeight: 'tall',
        fontFamily: `'Titillium Web', sans-serif`, // Ensure global font family
      },
      a: {
        color: 'text.secondary',
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: `'Titillium Web', sans-serif`, // Override for Heading component
      },
    },
    Text: {
      baseStyle: {
        fontFamily: `'Titillium Web', sans-serif`, // Override for Text component
      },
    },
    PopInText: {
      baseStyle: {
        display: 'inline-block',
        animation: 'popIn 1s ease-in-out forwards',
        fontWeight: 'bold',
        color: 'green.600',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add shadow for pop effect
      },
    },
  },
});

export default theme;
