import { AspectRatio, Box } from '@chakra-ui/react';
import ImageGallery from '../imageGallery';
import { useRef, useEffect } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import MotionBox from '../../../motion/motionBox';
import MotionHeading from '../../../motion/motionHeading/motionHeading';
import { fadeInTop } from '../../../../utils/animation';
import { convertToEmbedUrl } from '../editableView/ourMoment';

const images = [
  {
    alt: 'Image1s alt text',
    src: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/f908a110ef855.jpg',
    width: 1920,
    height: 1280,
  },
  {
    alt: 'Image2s alt text',
    src: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/fc0878238538a.jpg',
    width: 1920,
    height: 1280,
  },
  {
    alt: 'Image3s alt text',
    src: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/107197c12055e.jpg',
    width: 1920,
    height: 1280,
  },
  {
    alt: 'Image1s alt text',
    src: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/f908a110ef855.jpg',
    width: 1920,
    height: 1280,
  },
  {
    alt: 'Image2s alt text',
    src: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/fc0878238538a.jpg',
    width: 1920,
    height: 1280,
  },
  {
    alt: 'Image3s alt text',
    src: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/107197c12055e.jpg',
    width: 1920,
    height: 1280,
  },
  {
    alt: 'Image1s alt text',
    src: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/f908a110ef855.jpg',
    width: 1920,
    height: 1280,
  },
  {
    alt: 'Image2s alt text',
    src: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/fc0878238538a.jpg',
    width: 1920,
    height: 1280,
  },
  {
    alt: 'Image3s alt text',
    src: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/107197c12055e.jpg',
    width: 1920,
    height: 1280,
  },
  {
    alt: 'Image1s alt text',
    src: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/f908a110ef855.jpg',
    width: 1920,
    height: 1280,
  },
  {
    alt: 'Image2s alt text',
    src: 'https://shanewebber.com/wp-content/uploads/2018/09/how-to-get-the-best-wedding-portraits-10001.jpg',
    width: 2400,
    height: 3600,
  },
  {
    alt: 'Image3s alt text',
    src: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/107197c12055e.jpg',
    width: 1920,
    height: 1280,
  },
  {
    alt: 'Image1s alt text',
    src: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/f908a110ef855.jpg',
    width: 1920,
    height: 1280,
  },
  {
    alt: 'Image2s alt text',
    src: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/fc0878238538a.jpg',
    width: 1920,
    height: 1280,
  },
  {
    alt: 'Image3s alt text',
    src: 'https://shanewebber.com/wp-content/uploads/2018/09/how-to-get-the-best-wedding-portraits-10001.jpg',
    width: 2400,
    height: 3600,
  },
  {
    alt: 'Image1s alt text',
    src: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/f908a110ef855.jpg',
    width: 1920,
    height: 1280,
  },
  {
    alt: 'Image3s alt text',
    src: 'https://shanewebber.com/wp-content/uploads/2018/09/how-to-get-the-best-wedding-portraits-10001.jpg',
    width: 2400,
    height: 3600,
  },
  {
    alt: 'Image2s alt text',
    src: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/fc0878238538a.jpg',
    width: 1920,
    height: 1280,
  },
  {
    alt: 'Image2s alt text',
    src: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/fc0878238538a.jpg',
    width: 1920,
    height: 1280,
  },
];

export default function OurMomentRusticWeddingBloom({ moment }) {
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
      
    >
      <MotionHeading
        variants={fadeInTop}
        textAlign="center"
        variant="rusticWeddingBloomMolgakClassy"
color="passPort.500"
        mb="1rem"
      >
        Our Moment
      </MotionHeading>
      {moment.videos.map((video, index) => {
        if (video != '') {
          return (
            <AspectRatio
              key={index}
              minW="100%"
              ratio={16 / 9}
              rounded="lg"
              overflow="hidden"
            >
              <iframe
                title="naruto"
                src={convertToEmbedUrl(video)}
                allowFullScreen
              />
            </AspectRatio>
          );
        }
      })}
      <Box ref={ref}></Box>
      <Box mt="1.125em">
        <ImageGallery imgArray={moment.images} columnWidth={126} gapSize={18} />
      </Box>
    </MotionBox>
  );
}