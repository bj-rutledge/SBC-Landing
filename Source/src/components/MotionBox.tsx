/**
 * Created by BJ Rutledge
 * Date:2024-12-12
 **/
import * as React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(
   React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
      <Box ref={ref} {...props} />
   )),
);

export default MotionBox;
