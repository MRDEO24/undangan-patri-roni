import { useMutation } from '@tanstack/react-query';
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  StackDivider,
  Text,
  Textarea,
  Spacer,
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import MotionBox from '../../../motion/motionBox';
import MotionHeading from '../../../motion/motionHeading/motionHeading';
import { fadeInRight, mainBox } from '../../../../utils/animation';
import moment from 'moment';
import { API_URL } from '../../../../utils/env';
import { useWeddingPreviewStore } from '../../../../stores/weddingPreview';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
export default function RsvpAndWishes({ dataWishes }) {
  let [wishes, setWishes] = useState('');
  let [name, setName] = useState('');
  let [isFocused, setIsFocused] = useState(false);
  let [attend, setAttend] = useState('true');
  const [wishesData, setWishesData] = useState(dataWishes);
  const handleAddWishes = (newDataWishes) => {
    setWishesData((previtem) => [...previtem, newDataWishes]);
  };

  const data = useWeddingPreviewStore((state) => state.data);

  const mutation = useMutation({
    mutationFn: (newWish) => {
      return axios.post(API_URL + 'wishes', newWish);
    },
  });

  let handleInputChange = (e) => {
    console.log(data);
    console.log(wishesData);
    let inputValue = e.target.value;
    if (inputValue.length <= 200) {
      setWishes(inputValue);
    }
  };

  let handleSenderNameChange = (e) => {
    setName(e.target.value);
  };

  let onSubmit = () => {
    if (wishes !== '' && name !== '') {
      handleAddWishes({
        name: name,
        text: wishes,
        wedding_id: data?.uuid,
        is_showed: false,
        createdAt: new Date().toISOString(),
      });
      mutation.mutate({
        name: name,
        text: wishes,
        wedding_id: data?.uuid,
        is_showed: false,
        is_attend: attend,
      });
      setWishes('');
      setName('');
    }
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
      ref={ref}
      initial="initial"
      animate={mainControls}
      p="1rem"
      borderRadius="1.5rem"
      bg="bgWhiteOp80.50"
      my="1rem"
    >
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
          placeholder="Ucapan / Wishes*"
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
        value={name}
        onChange={handleSenderNameChange}
        placeholder="Nama / Name*"
        fontFamily="PoppinsRegular"
        fontSize="sm"
        mb="1rem"
      />
      <RadioGroup onChange={setAttend} value={attend} my="1rem">
        <Stack direction="row">
          <Radio value="true" colorScheme="passPort">
            Hadir / Attend
          </Radio>
          <Radio value="false" colorScheme="passPort">
            Tidak hadir / Not attend
          </Radio>
        </Stack>
      </RadioGroup>

      <Button
        onClick={() => onSubmit()}
        variant="rusticWeddingBloom"
        w="full"
        letterSpacing="widest"
        mb="1.5rem"
        bg="passPort.500"
      >
        Send
      </Button>
      <MotionHeading
        variants={fadeInRight}
        as="h3"
        size="lg"
        fontFamily="PoppinsBold"
        textAlign="left"
      >
        {wishesData.length > dataWishes.length
          ? wishesData.length
          : dataWishes.length}{' '}
        Ucapan / Wishes
      </MotionHeading>
      <Card bg="#ffffff00" boxShadow="none">
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {wishesData.length > dataWishes.length
              ? wishesData.map((item, key) => (
                  <Wishes
                    key={key}
                    name={item.name}
                    createdAt={item.created_at}
                    wishes={item.text}
                  />
                ))
              : dataWishes.map((item, key) => (
                  <Wishes
                    key={key}
                    name={item.name}
                    createdAt={item.created_at}
                    wishes={item.text}
                  />
                ))}
          </Stack>
        </CardBody>
      </Card>
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
            {moment(createdAt).format('dddd, DD-MM-YYYY')}
          </Text>
        </Flex>
      </Heading>
      <Flex>
        <Text pt="2" fontSize="sm" fontFamily="PoppinsRegular">
          {wishes}
        </Text>
        <Spacer />
        <Text pt="2" fontSize="x-small" fontFamily="PoppinsRegular">
          Hadir
        </Text>
      </Flex>
    </Box>
  );
}
