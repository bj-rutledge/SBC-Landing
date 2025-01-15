/**
 * Created by BJ Rutledge
 * Date:2024-12-27
 * This component is to resolve the error we're getting when we 
 * pass ListItem to motion.create. 
 * We're wrapping the ListItem in a React.forwardRef so that it 
 * will have the required property $$typeof 
 **/

import React from 'react';
import { motion } from 'framer-motion';
import { ListItem, ListItemProps } from '@chakra-ui/react';

// Wrap ListItem with React.forwardRef
const ForwardedListItem = React.forwardRef<HTMLLIElement, ListItemProps>((props, ref) => (
  <ListItem ref={ref} {...props} />
));

// Create a motion component using the forwarded ListItem
const MotionListItem = motion.create(ForwardedListItem);

export default MotionListItem;