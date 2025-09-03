// import { Box } from '@chakra-ui/react';
// import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MotionHeading from '../../../motion/motionHeading/motionHeading';
import MotionBox from '../../../motion/motionBox';
import { useEffect, useRef } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import MotionText from '../../../motion/motionText';
import { fadeInRight, fadeInTop, mainBox } from '../../../../utils/animation';
import Slider from 'react-slick';
import { Box } from '@chakra-ui/react';
import { getImageWithFormat } from '../../../../utils/url';
// import { getImageWithFormat } from '../../../../utils/url';
import { useLocation } from 'react-router-dom';
export default function EndingQuote({ endingQuoteData }) {
  const settings = {
    infinite: true,
    slidesToShow:
      endingQuoteData.moment_image?.length >= 4
        ? 4
        : endingQuoteData.moment_image?.length,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('animate');
    }
  });

  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const extractedPart = pathParts[pathParts.length - 1];

  return (
    <MotionBox
      variants={mainBox}
      initial="initial"
      animate={mainControls}
      p="1rem"
      borderRadius="1.5rem"
      bg="bgWhiteOp80.50"
    >
      <MotionText
        variants={fadeInRight}
        textAlign="center"
        fontFamily="PoppinsRegular"
        fontSize="0.8rem"
        my="1rem"
      >
        {endingQuoteData.quote_ending.text}
      </MotionText>
      <MotionText
        variants={fadeInRight}
        textAlign="center"
        fontFamily="PoppinsBold"
        fontSize="0.8rem"
        my="1rem"
      >
        &rdquo;{endingQuoteData.quote_ending.title}&rdquo;
      </MotionText>
      <MotionBox ref={ref} variants={fadeInTop} my="2rem" textAlign="center">
        <Slider {...settings}>
          {endingQuoteData.moment_image?.map((image, index) => (
            <Box
              key={index}
              w="80px!important"
              h="80px!important"
              borderRadius="100%"
              bg="#fff" // Fill the circular element with a solid white color
              backgroundImage={`url(${getImageWithFormat(image, 'small')})`}
              backgroundSize="cover"
              backgroundPosition="center"
            ></Box>
          ))}
        </Slider>
      </MotionBox>
      <MotionText
        variants={fadeInRight}
        textAlign="center"
        fontFamily="PoppinsRegular"
        fontSize="0.8rem"
        my="1rem"
      >
        {endingQuoteData.quote_ending_secondary.text}
      </MotionText>

      <MotionText
        variants={fadeInRight}
        textAlign="center"
        fontFamily="PoppinsBold"
        fontSize="0.8rem"
        mt="1rem"
        mb="2rem"
      >
        &rdquo;{endingQuoteData.quote_ending_secondary.title}&rdquo;
      </MotionText>
      <MotionHeading
        variants={fadeInRight}
        as="h5"
        size="sm"
        textAlign="center"
        fontFamily="PoppinsBold"
      >
        Kami yang berbahagia
      </MotionHeading>
      <MotionHeading
        variants={fadeInRight}
        textAlign="center"
        variant="rusticWeddingBloomMolgakClassy"
        color="passPort.500"
        my="1rem"
      >
        {endingQuoteData.nickname_first} & {endingQuoteData.nickname_last}
      </MotionHeading>
    </MotionBox>
  );
}
