import { Box, Card, CardBody, Heading, Stack, Text } from '@chakra-ui/react';
import MotionHeading from '../../../motion/motionHeading/motionHeading';
import MotionImage from '../../../motion/motionImage';
import MotionBox from '../../../motion/motionBox';
import { useEffect, useRef } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import { fadeInRight, fadeInTop, mainBox } from '../../../../utils/animation';
import { getImageWithFormat } from '../../../../utils/url';
import { useTemplate } from '../../../../hooks/useTemplate';
import { useLocation } from 'react-router-dom';


function LoveStoryCard({ image, title, text, alt, animateTrigger1, animateTrigger2 }) {

  return (
    <Card maxW='sm' bg='#ff000000' boxShadow='none' opacity='1'>
      <CardBody>
        <MotionImage variants={animateTrigger1}
          src={image}
          alt={alt}
          borderRadius='lg'
        />
        <MotionBox variants={animateTrigger2}>
          <Stack mt='6' spacing='3'>
            <Heading size='md' fontFamily="PoppinsSemibold">{title}</Heading>
            <Text fontFamily="PoppinsRegular">
              {text}
            </Text>
          </Stack>
        </MotionBox>
      </CardBody>
    </Card>
  );
}

export default function LoveStory({ loveStories }) {
  const { pathname } = useLocation();
  const { template } = useTemplate();
  const loveStoryRef = useRef(null);
  const isInView = useInView(loveStoryRef, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('animate');
    }
  });
  return (
    <>
      <MotionBox
        variants={mainBox}
        initial="initial"
        animate={mainControls} p="1rem" borderRadius="1.5rem" bg="bgWhiteOp80.50" mb="1.5rem" mt="2rem">
        <MotionHeading MotionHeading variants={fadeInTop} textAlign='center' variant="rusticWeddingBloomMolgakClassy"
color="passPort.500" mt="1.2rem" > Love Story</MotionHeading >
        <Box ref={loveStoryRef}></Box>

        {loveStories?.map((loveStory, index) => {
          return <LoveStoryCard key={index} image={pathname.includes('/wedding/') ? getImageWithFormat(loveStory.image, 'small') : loveStory.image.formats.small.url} alt={loveStory.description} title={loveStory.title} text={loveStory.description} animateTrigger1={fadeInRight} animateTrigger2={fadeInRight}></LoveStoryCard>;
        })}

      </MotionBox >

    </>
  );
}
