import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

const shimmerAnimation = {
  background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.1) 75%)',
  backgroundSize: '200% 100%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  animation: 'shimmer 1.5s infinite',
};

type MotionShimmerTextProps = HTMLMotionProps<'div'> & {
  style?: React.CSSProperties;
};

const MotionShimmerText: React.FC<MotionShimmerTextProps> = (props) => (
  <motion.div
    {...props}
    style={{
      ...shimmerAnimation,
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
      ...props.style,
    }}
  />
);

export default MotionShimmerText;