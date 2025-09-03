import { Box, Button, Center, Heading, Text } from '@chakra-ui/react';
import { motion, useAnimation,useInView} from 'framer-motion';
import {useEffect,useRef} from 'react';
import { mainBox } from '../../../../utils/animation';

const MotionBox = motion(Box);

export default function FeatureInvitation({ heading, text, buttonLink, buttonLabel }) {

  const featureRef = useRef(null);
  const isInView = useInView(featureRef, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('animate');
    }
  });
  return (
    <MotionBox 
      
      variants={mainBox}
      initial="initial"
      animate={mainControls}
      p="2rem" borderRadius="1.5rem" bg="bgWhiteOp80.50" my="2rem"
      >
      <Heading variant="rusticWeddingBloomMolgakClassy"
color="passPort.500" textAlign='center'>{heading}</Heading>
      <Text textAlign='center' fontSize="sm" fontFamily="PoppinsRegular" my="1rem">{text}</Text>
      <Center>
        <Button ref={featureRef} variant="rusticWeddingBloom" as="a" href={buttonLink} target="_blank" rel="noopener noreferrer">{buttonLabel}</Button>
      </Center>
    </MotionBox>
  );
}
