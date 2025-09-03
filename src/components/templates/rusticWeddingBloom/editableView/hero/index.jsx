import {
  Flex,
  Center,
  Box,
  Text,
  IconButton,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  InputGroup,
  Input,
  InputRightElement,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import IconWedding from '../../../../../assets/rusticWeddingBloom/rustic-wedding-round-flower.webp';
import { fadeInTopToBottom } from '../../../../../utils/animation';
import moment from 'moment';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import 'moment/dist/locale/id';
import MotionImage from '../../../../motion/motionImage';
import MotionHeading from '../../../../motion/motionHeading/motionHeading';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import IconEdit from '../../../../iconEdit';
import { IoIosClose } from 'react-icons/io';
import ImageCropperModal from '../../../../imageCropper';
import { useHeroStore } from '../../../../../stores/editableView';



const rotateAnimation = {
  rotate: [0, 360],
  transition: {
    duration: 90,
    repeat: Infinity,
    ease: 'linear',
  },
};

export default function Hero({ scroll }) {
  //? Modal Name
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [names, setNames, imageHero, setImageHero] = useHeroStore((state) => [
    state.names,
    state.setNames,
    state.imageHero,
    state.setImageHero,
  ]);
  const [firstNameStore, lastNameStore] = names.split(' & ');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isEmptyInput, setEmptyInput] = useState(false);
  const firstNameref = useRef();

  const handleSave = () => {
    if (!firstName || !lastName) {
      setEmptyInput(true);
    } else {
      const newNames = `${firstName} & ${lastName}`;
      setNames(newNames);
      setEmptyInput(false);
      // Update the Zustand store
      onClose(); // Close the modal or perform other actions
    }
  };

  const handleClearLastName = () => {
    setLastName('');
  };
  const handleClearFirstName = () => {
    setFirstName('');
  };

  //? Image Cropper
  const fileInputRef = useRef();

  //? Date Picker

  const [weddingAtDate, setWeddingAtDate] = useState(
    useHeroStore.getState().weddingAt,
  );
  console.log({weddingAtDate});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = (e) => {
    e.preventDefault();
    setShowDatePicker(!showDatePicker);
  };

  const handleChangeDate = (e) => {
    setShowDatePicker(!showDatePicker);
    const newWeddingAtDate = e;
    console.log({e});
    setWeddingAtDate(newWeddingAtDate);
    useHeroStore.getState().setWeddingAt(newWeddingAtDate);
  };

  return (
    <Box minH="100vh">
      <Center>
        <MotionImage
          animate={rotateAnimation}
          initial={{ rotate: 0 }}
          src={IconWedding}
          mt="16vh"
          borderRadius="full"
          boxSize="300px"
          alt="Dan Abramov"
        />

        <Box
          position="absolute"
          mt="16vh"
          borderRadius="full"
          boxSize="176px"
          backgroundSize={imageHero ? 'cover' : '225%'}
          backgroundPosition="center"
          backgroundImage={
            imageHero ||
            'https://cdn.imweb.me/upload/S201904265cc294845b98d/d326487b83a64.jpg'
          }
          alt="Cropped Image"
        >
          <IconButton
            right="1.3rem"
            position="absolute"
            isRound
            colorScheme="passPort"
            opacity="1"
            size="sm"
            onClick={() => fileInputRef.current.click()}
            aria-label="Edit instagram"
            icon={<IconEdit />}
          />
          <ImageCropperModal fileInputRef={fileInputRef} setImageFunc={setImageHero} aspect={1} shape='round' />
        </Box>

      </Center>

      <MotionHeading
        {...fadeInTopToBottom}
        as="h1"
        fontSize="clamp(1rem, 1vw, 1.5rem)"
        textAlign="center"
        variant="rusticWeddingBloomH1Poppins"
        letterSpacing="0.35rem"
      >
        THE WEDDING OF
      </MotionHeading>
      <Flex justify="center">
        {names.length > 15 ? (
          <Flex direction="column">
            <MotionHeading
              {...fadeInTopToBottom}
              transition={{ duration: 1, delay: 1.5 }}
              textAlign="center"
              variant="rusticWeddingBloomH1RoyalWedding"
color="passPort.500"
              fontSize="clamp(3.5rem, 7vh, 8rem)"
            >
              {firstNameStore}
            </MotionHeading>
            <MotionHeading
              {...fadeInTopToBottom}
              transition={{ duration: 1, delay: 1.5 }}
              textAlign="center"
              variant="rusticWeddingBloomH1RoyalWedding"
              color="passPort.500"
              fontSize="clamp(3.5rem, 5vw, 6rem)"
              lineHeight="30px"
            >
              &
            </MotionHeading>
            <MotionHeading
              {...fadeInTopToBottom}
              transition={{ duration: 1, delay: 1.5 }}
              textAlign="center"
              variant="rusticWeddingBloomH1RoyalWedding"
color="passPort.500"
              fontSize="clamp(3.5rem, 7vh, 8rem)"
            >
              {lastNameStore}
            </MotionHeading>
          </Flex>
        ) : (
          <Flex justify="center">
            <MotionHeading
              {...fadeInTopToBottom}
              transition={{ duration: 1, delay: 1.5 }}
              textAlign="center"
              variant="rusticWeddingBloomH1RoyalWedding"
color="passPort.500"
            >
              {names}
            </MotionHeading>
          </Flex>
        )}

        <IconButton
          right="1.3rem"
          position="absolute"
          isRound
          colorScheme="passPort"
          opacity="0.7"
          size="xs"
          onClick={onOpen}
          aria-label="Edit instagram"
          icon={<IconEdit />}
        />
      </Flex>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        initialFocusRef={firstNameref}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent mx="3" bg="gray.100" borderRadius="20">
          <ModalHeader>
            <Text variant="rusticWeddingBloomText">
              Masukkan Nama Pertama dan Kedua
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup size="md">
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fontFamily="PoppinsRegular"
                placeholder="Nama Pertama"
                bg="white"
                borderRadius="20"
                ref={firstNameref}
              />
              {firstName && (
                <InputRightElement>
                  <IconButton
                    aria-label="Clear input"
                    icon={<IoIosClose />}
                    onClick={handleClearFirstName}
                    variant="ghost"
                    size="sm"
                  />
                </InputRightElement>
              )}
            </InputGroup>
            <InputGroup size="md" mt="2">
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fontFamily="PoppinsRegular"
                placeholder="Nama Kedua"
                bg="white"
                borderRadius="20"
              />
              {lastName && (
                <InputRightElement>
                  <IconButton
                    aria-label="Clear input"
                    icon={<IoIosClose />}
                    onClick={handleClearLastName}
                    variant="ghost"
                    size="sm"
                  />
                </InputRightElement>
              )}
            </InputGroup>
            {isEmptyInput ? (
              <Text
                mt="1.5rem"
                fontFamily="PoppinsRegular"
                fontStyle="italic"
                fontSize="0.8rem"
                textAlign="center"
                color="red.600"
              >
                Harap isi nama pertama dan kedua!
              </Text>
            ) : (
              <Box></Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              mx="0"
              borderRadius="20"
              bg="#6d6d6d"
              color="white"
              mr={3}
              fontFamily="PoppinsRegular"
              fontSize="0.8rem"
              onClick={handleSave} // Attach handleSave function here
              w="full"
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <>
        <Center>
          <Flex position="absolute" right="1.5rem">
            <IconButton
              isRound
              colorScheme="passPort"
              opacity="0.7"
              size="xs"
              onClick={toggleDatePicker}
              aria-label="Edit Date"
              icon={<IconEdit />}
            />
            {showDatePicker && (
              <span
                style={{ position: 'absolute', bottom: '1.5rem', right: '0' }}
              >
                <DatePicker
                  selected={new Date(weddingAtDate)}
                  minDate={moment().add('day', 1).toDate()}
                  onChange={handleChangeDate}
                  closeOnScroll={true}
                  showYearDropdown
                  popperPlacement="top"
                  popperModifiers={{
                    flip: {
                      enabled: false,
                    },
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                    },
                  }}
                  inline
                />
              </span>
            )}
          </Flex>
          <Text fontFamily="PoppinsRegular" fontSize="sm" my="0.5rem">
            {moment(weddingAtDate).locale('id').format('dddd, D MMMM YYYY')}
          </Text>
        </Center>
        <Center>
          <Countdown weddingAt={moment(weddingAtDate)} />
        </Center>
        <Box>
          {/* <Input type='file' onChange={async (e) => {
            const file = e.target.files[0];
            const res = await uploadFile({
              'test': file,
            });
          }}/> */}
        </Box>
        <Box onClick={scroll}>
          <Center p="1rem" mt="1rem">
            <IconArrowBottom />
          </Center>
          <Text
            textAlign="center"
            fontFamily="PoppinsRegular"
            fontSize="xs"
            mb="2rem"
          >
            Scroll Down
          </Text>
        </Box>
      </>
    </Box>
  );
}

function Countdown({ weddingAt }) {
  const [now, setNow] = useState(moment.now());
  const diff = weddingAt.diff(now, 'seconds');

  const day = Math.max(Math.floor(diff / (24 * 60 * 60)), 0);
  const hour = Math.max(Math.floor((diff % (24 * 60 * 60)) / (60 * 60)), 0);
  const minute = Math.max(Math.floor((diff % (60 * 60)) / 60), 0);
  const second = Math.max(Math.floor(diff % 60), 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex maxW="full">
      <Box
        py="0.5rem"
        width="90px"
        bg="passPort.500"
        borderRadius="16px"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="center"
        color="white"
        margin="10px"
      >
        <Text fontSize="1.5rem" fontFamily="PoppinsRegular">
          {day}
        </Text>
        <Text fontSize="0.8rem" fontFamily="PoppinsRegular">
          Hari
        </Text>
      </Box>
      <Box
        py="0.5rem"
        width="90px"
        bg="passPort.500"
        borderRadius="16px"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="center"
        color="white"
        margin="10px"
      >
        <Text fontSize="1.5rem" fontFamily="PoppinsRegular">
          {hour}
        </Text>
        <Text fontSize="0.8rem" fontFamily="PoppinsRegular">
          Jam
        </Text>
      </Box>
      <Box
        py="0.5rem"
        width="90px"
        bg="passPort.500"
        borderRadius="16px"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="center"
        color="white"
        margin="10px"
      >
        <Text fontSize="1.5rem" fontFamily="PoppinsRegular">
          {minute}
        </Text>
        <Text fontSize="0.8rem" fontFamily="PoppinsRegular">
          Menit
        </Text>
      </Box>
      <Box
        py="0.5rem"
        width="90px"
        bg="passPort.500"
        borderRadius="16px"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="center"
        color="white"
        margin="10px"
      >
        <Text fontSize="1.5rem" fontFamily="PoppinsRegular">
          {second}
        </Text>
        <Text fontSize="0.8rem" fontFamily="PoppinsRegular">
          Detik
        </Text>
      </Box>
    </Flex>
  );
}

function IconArrowBottom() {
  return (
    <motion.svg
      animate={{ y: [0, 8, 0] }} // Moves up and down in a loop
      transition={{ duration: 2, repeat: Infinity }} // Animation duration and repeat
      width="28"
      height="37"
      viewBox="0 0 28 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 1V35.5M14 35.5L1 22.5M14 35.5L27 22.5"
        stroke="#706969"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}
