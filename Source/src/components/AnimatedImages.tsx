/**
 * Created by BJ Rutledge
 * Date:2024-12-14
 **/
import * as React from 'react';
import { motion, resolveMotionValue } from 'framer-motion';
import ClientImage from './ClientImage'; // Import the ClientImage component
// import Illaria05 from '../images/Illaria05.jpg';
// import Illaria06 from '../images/Illaria06.jpg';
// import QATA_August_2013___1sm from '../images/QATA_August_2013___1sm.jpg';
// import QATA_June_2013_Aerial_2sm from '../images/QATA_June_2013_Aerial_2sm.jpg';
// import Queen_Anne_Towne_July_2013_1sm from '../images/Queen_Anne_Towne_July_2013_1sm.jpg';
import bigCrane from '../images/landing/craneBG.jpg';
import eveningSite from '../images/landing/eveningSite.jpg';
import rollout from '../images/landing/rollout.jpg';
import sunset from '../images/landing/sunset.jpg';

const images = [bigCrane, eveningSite, rollout, sunset];

const transitionDuration = 1.5; // Duration of fade in/out
const stayDuration = 2; // Duration the image stays fully visible

const AnimatedImages = () => {
   const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

   React.useEffect(() => {
      const timeout = setTimeout(() => {
         setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1,
         );
      }, (transitionDuration + stayDuration) * 1000);

      return () => clearTimeout(timeout);
   }, [currentImageIndex]);

   return (
      <div
         style={{
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         {images.map((src, index) => (
            <motion.div
               key={index}
               initial={{ opacity: 0 }}
               animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
               transition={{ duration: transitionDuration }}
               style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}
            >
               <ClientImage
                  src={src}
                  alt={`Image ${index + 1}`}
                  style={{
                     maxWidth: '100%',
                     maxHeight: '100%',
                     objectFit: 'contain',
                  }}
               />
            </motion.div>
         ))}
         <div
            style={{
               position: 'absolute',
               bottom: '10%',
               textAlign: 'center',
               width: '100%',
               backgroundColor: 'rgba(0, 0, 0, 0.5)',
               padding: '16px',
            }}
         >
            <h1 style={{ fontSize: '4xl', color: 'white' }}>
               Helping Build America
            </h1>
         </div>
      </div>
   );
};

export default AnimatedImages;
