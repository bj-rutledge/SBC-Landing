/**
 * Created by BJ Rutledge
 * Date:2024-12-13
 * 
 * This component wraps the Chakra UI `Image` component to ensure it only 
 * renders on the client side. 
 * This avoids warnings and issues related to the use of `useLayoutEffect` 
 * during server-side rendering.
 */

import React from "react";
import { Image, ImageProps } from "@chakra-ui/react";
import useIsMounted from "../hooks/useIsMounted";

const ClientImage: React.FC<ImageProps> = (props) => {
  const isMounted = useIsMounted();

  return isMounted ? <Image {...props} /> : null;
};

export default ClientImage;
