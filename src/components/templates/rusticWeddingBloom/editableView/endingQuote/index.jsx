import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Text,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useRef } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import MotionText from '../../../../motion/motionText';
import {
  fadeInRight,
  fadeInTop,
  mainBox,
} from '../../../../../utils/animation';
import MotionBox from '../../../../motion/motionBox';
import MotionHeading from '../../../../motion/motionHeading/motionHeading';
import EditableControls from '../../../../editButton';
import { useShallow } from 'zustand/react/shallow';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

import { useEndingQuoteStore,useHeroStore,useMomentStore } from '../../../../../stores/editableView';



export default function EndingQuote() {
  const {
    showEnding,
    setShowEnding,
    setQuoteText,
    setQuoteText2,
    setQuoteTitle,
    setQuoteTitle2,
    quoteText,
    quoteText2,
    quoteTitle,
    quoteTitle2,
  } = useEndingQuoteStore();

  const { names } = useHeroStore(
    useShallow((state) => ({
      names: state.names,
    })),
  );

  const { images, showMoment } = useMomentStore(
    useShallow((state) => ({
      images: state.images,
      showMoment: state.showMoment,
    })),
  );

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
      variants={mainBox}
      initial="initial"
      animate={mainControls}
      p="1rem"
      borderRadius="1.5rem"
      bg="bgWhiteOp80.50"
      sx={showEnding ? { opacity: 1 } : { opacity: '0.5 !important' }}
    >
      <Button
        leftIcon={showEnding ? <FaRegEye /> : <FaRegEyeSlash />}
        position="absolute"
        colorScheme="passPort"
        fontSize="0.7rem"
        borderRadius="2xl"
        top="-1"
        right="3"
        variant="rusticWeddingBloom"
        onClick={() => {
          setShowEnding(!showEnding);
        }}
        size="xs"
      >
        <Text mt="1">{showEnding ? 'Sembunyikan' : 'Tampilkan'}</Text>
      </Button>
      <MotionText
        variants={fadeInRight}
        textAlign="center"
        fontFamily="PoppinsRegular"
        fontSize="0.8rem"
        my="1rem"
      >
        <Editable
          as="span"
          value={quoteText}
        >
          <EditableControls />
          <EditablePreview />
          <EditableTextarea
            p="0"
            h="6rem"
            _focusVisible={{
              boxShadow: 'none',
            }}
            onChange={(e) => setQuoteText(e.target.value)}
          />
        </Editable>
      </MotionText>
      <MotionHeading
        variants={fadeInRight}
        as="h5"
        size="xs"
        textAlign="center"
        fontFamily="PoppinsBold"
      >
        <Editable as="span" value={quoteTitle}>
          <EditableControls />
          <EditablePreview />
          <EditableInput
            _focusVisible={{
              boxShadow: 'none',
            }}
            onChange={(e) => setQuoteTitle(e.target.value)}
          />
        </Editable>
      </MotionHeading>
      <MotionBox ref={ref} variants={fadeInTop} my="2rem" textAlign="center" hidden={showMoment ? false : true}>
        <Slider
          slidesToShow={images.length < 4 ? images.length : 4}
          slidesToScroll={2}
          speed={500}
          autoplay={true}
          autoplaySpeed={2000}
        >
          {images.map((image, index) => (
            <Box
              key={`${index}-${image}`}
              w="80px!important"
              h="80px!important"
              borderRadius="100%"
              bg="#fff" // Fill the circular element with a solid white color
              backgroundImage={`url(${image.data})`}
              backgroundSize="cover"
              backgroundPosition="center"
            />
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
        <Editable
          as="span"
          value={quoteText2}
        >
          <EditableControls />
          <EditablePreview />
          <EditableTextarea
            p="0"
            h="6rem"
            _focusVisible={{
              boxShadow: 'none',
            }}
            onChange={(e) => setQuoteText2(e.target.value)}
          />
        </Editable>
      </MotionText>
      <MotionText
        variants={fadeInRight}
        textAlign="center"
        fontFamily="PoppinsRegular"
        fontSize="0.8rem"
        mt="1rem"
        mb="2rem"
      >
        <Editable
          as="span"
          value={quoteTitle2}
        >
          <EditableControls />
          <EditablePreview />
          <EditableTextarea
            p="0"
            h="3rem"
            _focusVisible={{
              boxShadow: 'none',
            }}
            onChange={(e) => setQuoteTitle2(e.target.value)}
          />
        </Editable>
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
        {names}
      </MotionHeading>

      {/* <Button onClick={()=>{
        console.log(quoteText);
          console.log(quoteText2);
          console.log(quoteTitle);
          console.log(quoteTitle2);
      }}>
        Jika Aku Bisa
      </Button> */}
    </MotionBox>
  );
}
