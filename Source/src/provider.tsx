/**
 * Created by BJ Rutledge
 * Date:2024-12-10
 **/
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { WrapRootElementBrowserArgs } from "gatsby";
import theme from "./theme";

export const WrapRootElement = ({
  element,
}: Pick<WrapRootElementBrowserArgs, "element">) => (
  <ChakraProvider theme={theme}>{element}</ChakraProvider>
);