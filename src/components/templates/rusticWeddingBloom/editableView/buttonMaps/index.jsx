import { Center } from '@chakra-ui/react';
import MotionButton from '../../../../motion/motionButton';

export default function ButtonMaps({ latitude, longitude, animate, link }) {
  return (
    <Center my="1rem">
      <MotionButton
        variants={animate}
        variant="rusticWeddingBloom"
        onClick={() => {
          if (link != '') {
            window.open(link);
          } else {
            window.open(
              `https://www.google.com/maps/dir//${latitude},${longitude}`,
            );
          }
        }}
      >
        Google Maps
      </MotionButton>
    </Center>
  );
}
