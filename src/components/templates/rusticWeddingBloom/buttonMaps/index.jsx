import { Center } from '@chakra-ui/react';
import MotionButton from '../../../motion/motionButton';

export default function ButtonMaps({ mapLink, latitude, longitude, animate, color }) {
  return (
    <Center my="1rem">
      <MotionButton
        variants={animate}
        variant="rusticWeddingBloom"
        onClick={() => window.open(mapLink)}
        bg={color}
      >
        Google Maps
      </MotionButton>
    </Center>
  );
}