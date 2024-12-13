// gatsby-browser.tsx
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./src/theme";
import "./src/global.css";

export const wrapRootElement = ({ element }) => (
  <ChakraProvider theme={theme}>{element}</ChakraProvider>
);
