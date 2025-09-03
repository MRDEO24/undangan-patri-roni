import { Box, Center, Image } from '@chakra-ui/react';
import { useRef, useEffect } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import MotionBox from '../../../motion/motionBox';
import MotionHeading from '../../../motion/motionHeading/motionHeading';
import { fadeInTop, mainBox } from '../../../../utils/animation';

export default function LocationMap({ image, title }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('animate');
    }
  });
  return (
    <MotionBox
      p="1.5rem"
      borderRadius="1.5rem"
      bg="bgWhiteOp80.50"
      mb="1.5rem"
      variants={mainBox}
      initial="initial"
      animate={mainControls}
    >
      <MotionHeading
        variants={fadeInTop}
        textAlign="center"
        variant="rusticWeddingBloomMolgakClassy"
        color="passPort.500"
        mb="1rem"
      >
        Denah Lokasi
      </MotionHeading>
      <Box ref={ref}></Box>
      <Box mt="1.125em">
        <Center>
          <Image src={image} alt="Dan Abramov" />
        </Center>
      </Box>
    </MotionBox>
  );
}
