import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import MotionBox from '../../../../motion/motionBox';
import MotionHeading from '../../../../motion/motionHeading/motionHeading';
import { fadeInRight, mainBox } from '../../../../../utils/animation';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useWishStore } from '../../../../../stores/editableView';


export default function RsvpAndWishes() {
  let [wishes, setWishes] = useState('');
  let [isFocused, setIsFocused] = useState(false);
  let [attend, setAttend] = useState('attend');
  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    if (inputValue.length <= 200) {
      setWishes(inputValue);
    }
  };
  const [showWish, setShowWish] = useWishStore((state) => [
    state.showWish,
    state.setShowWish,
  ]);

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
      my="1rem"
      sx={showWish ? { opacity: 1 } : { opacity: '0.5 !important' }}
    >
      <Button
        leftIcon={showWish ? <FaRegEye /> : <FaRegEyeSlash />}
        position="absolute"
        colorScheme="passPort"
        fontSize="0.7rem"
        borderRadius="2xl"
        top="-1"
        right="3"
        variant="rusticWeddingBloom"
        onClick={() => {
          setShowWish(!showWish);
        }}
        size="xs"
      >
        <Text mt="1">{showWish ? 'Sembunyikan' : 'Tampilkan'}</Text>
      </Button>
      <MotionHeading
        variants={fadeInRight}
        textAlign="center"
        variant="rusticWeddingBloomMolgakClassy"
color="passPort.500"
        mb="1rem"
        mt="1.5rem"
      >
        RSVP & Wishes
      </MotionHeading>
      <Box
        position="relative"
        pb="2rem"
        border={`1px solid ${isFocused ? '#2B6CB0' : '#E2E8F0'}`}
        borderRadius="md"
        boxShadow={isFocused ? '0 0 5px rgba(0, 123, 255, 0.5)' : 'none'}
        transition="border-color 0.3s, box-shadow 0.3s"
        my="1rem"
      >
        <Textarea
          value={wishes}
          onChange={handleInputChange}
          placeholder="Ucapan / Wishes"
          size="sm"
          fontFamily="PoppinsRegular"
          border="none" // Remove the default Textarea border
          focusBorderColor="transparent"
          resize="none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Text position="absolute" bottom="5px" right="5px" color="gray.500">
          {wishes.length}/200
        </Text>
      </Box>
      <Input
        ref={ref}
        placeholder="Nama / Name *"
        fontFamily="PoppinsRegular"
        fontSize="sm"
        mb="1rem"
      />
      <RadioGroup onChange={setAttend} value={attend} my="1rem">
        <Stack direction="row">
          <Radio value="attend" colorScheme="passPort">
            Hadir / Attend
          </Radio>
          <Radio value="not attend" colorScheme="passPort">
            Tidak hadir / Not attend
          </Radio>
        </Stack>
      </RadioGroup>

      <Button
        variant="rusticWeddingBloom"
        w="full"
        letterSpacing="widest"
        mb="1.5rem"
      >
        Send
      </Button>
    </MotionBox>
  );
}

function Wishes({ name, wishes, createdAt }) {
  return (
    <Box>
      <Heading size="xs" textTransform="uppercase">
        <Flex gap="0.5rem">
          <Text fontFamily="PoppinsSemibold">{name}</Text>
          <Text fontFamily="PoppinsSemibold" fontSize="0.5rem">
            {createdAt}
          </Text>
        </Flex>
      </Heading>
      <Text pt="2" fontSize="sm" fontFamily="PoppinsRegular">
        {wishes}
      </Text>
    </Box>
  );
}
