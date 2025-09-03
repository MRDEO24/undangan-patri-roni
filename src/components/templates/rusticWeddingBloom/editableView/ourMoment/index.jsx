import {
  AspectRatio,
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import ImageGallery from '../imageGallery';
import { useRef, useEffect, useState } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import MotionBox from '../../../../motion/motionBox';
import MotionHeading from '../../../../motion/motionHeading/motionHeading';
import { fadeInTop, mainBox } from '../../../../../utils/animation';
import { FaRegEye, FaRegEyeSlash, FaRegImages } from 'react-icons/fa6';
import { AiOutlineYoutube  } from 'react-icons/ai';
import {IoIosClose} from 'react-icons/io';
import IconEdit from '../../../../iconEdit';
import { useMomentStore } from '../../../../../stores/editableView';


export function convertToEmbedUrl(watchUrl) {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = watchUrl.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return null;
}

export default function OurMomentRusticWeddingBloom() {
  const toast = useToast();
  const ref = useRef(null);
  const inputVideo = useRef(null);
  const uploadRef = useRef(null);
  const [isValid, setIsValid] = useState(false);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const { images, videos, addVideo, showMoment, setShowMoment } =
    useMomentStore();
  useEffect(() => {
    if (isInView) {
      mainControls.start('animate');
    }
  });

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleClearVideo = () => {
    addVideo(null);
  };
  const handleChangeVideo = (event) => {
    const inputValue = event.target.value;

    const regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    if (regExp.test(inputValue)) {
      addVideo(inputValue);
      setIsValid(true);
    } else {
      addVideo(inputValue);
      setIsValid(false);
    }
  };

  function ImageUpload() {
    const addImage = useMomentStore((state) => state.addImage);

    const handleImageUpload = (event) => {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        if (files[i]) {
          if (files[i].size > 2 * 1024 * 1024) {
            toast({
              title: 'Ukuran file melebihi batas.',
              description: 'Ukuran file tidak boleh melebihi 2MB.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          } else if (
            files[i].type !== 'image/jpeg' &&
            files[i].type !== 'image/png' &&
            files[i].type !== 'image/webp'
          ) {
            toast({
              title: 'Format gambar tidak didukung',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          } else {
            addImage(URL.createObjectURL(files[i]));
          }
        }
      }
    };

    return (
      <Flex
        m="2"
        mt="1.5rem"
        borderRadius="lg"
        height="150px"
        bg="#d9d9d9"
        justify="center"
        alignItems="center"
        borderStyle="dashed"
        borderWidth="1px"
        borderColor="black"
        flexDirection="column"
        onClick={() => {
          if (images.length <= 9) {
            uploadRef.current.click();
          } else {
            toast({
              title: 'Batas moment gambar tercapai',
              status: 'warning',
              duration: 5000,
              isClosable: true,
            });
          }
        }}
        cursor="pointer"
      >
        <FaRegImages size="3rem" color="#5f5f5f" />
        <Text mt="3" fontFamily="PoppinsBold" color="#5f5f5f">
          {images.length <= 9
            ? 'Tambah Foto Moment'
            : 'Batas moment gambar tercapai'}
        </Text>
        <Input
          ref={uploadRef}
          display="none"
          type="file"
          onChange={handleImageUpload}
        />
      </Flex>
    );
  }


  return (
    <MotionBox
      p="1.5rem"
      borderRadius="1.5rem"
      bg="bgWhiteOp80.50"
      mb="1.5rem"
      variants={mainBox}
      initial="initial"
      animate={mainControls}
      sx={showMoment ? { opacity: 1 } : { opacity: '0.5 !important' }}
    >
      <Button
        leftIcon={showMoment ? <FaRegEye /> : <FaRegEyeSlash />}
        position="absolute"
        colorScheme="passPort"
        fontSize="0.7rem"
        borderRadius="2xl"
        top="-1"
        right="3"
        variant="rusticWeddingBloom"
        onClick={() => {
          setShowMoment(!showMoment);
        }}
        size="xs"
      >
        <Text mt="1">{showMoment ? 'Sembunyikan' : 'Tampilkan'}</Text>
      </Button>
      <MotionHeading
        variants={fadeInTop}
        textAlign="center"
        variant="rusticWeddingBloomMolgakClassy"
color="passPort.500"
        mb="1rem"
      >
        Our Moment
      </MotionHeading>
      {/* Video Section */}
      <Box hidden={videos && isValid ? false : true}>
        <IconButton
          right="1rem"
          top="4.5rem"
          position="absolute"
          isRound
          colorScheme="passPort"
          opacity="1"
          size="lg"
          onClick={onOpen}
          aria-label="Edit instagram"
          icon={<IconEdit />}
          zIndex="1"
        />

        <AspectRatio minW="100%" ratio={16 / 9} rounded="lg" overflow="hidden">
          <iframe
            title="naruto"
            src={convertToEmbedUrl(
              videos || 'https://youtu.be/hQ-wYw4hP84?si=viXPjvLLNJm0BxLY',
            )}
            allowFullScreen
          />
        </AspectRatio>
      </Box>
      <Box ref={ref}></Box>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        initialFocusRef={inputVideo}
      >
        <ModalOverlay />
        <ModalContent mx="3" bg="gray.100" borderRadius="20" height="250px">
          <ModalHeader>
            <Text variant="rusticWeddingBloomText">
              Masukkan link video Youtube
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup size="md">
              <InputLeftAddon
                bg="#8c8c8c"
                color="white"
                fontFamily="PoppinsRegular"
                fontSize="0.8rem"
                borderLeftRadius="20"
              >
                link
              </InputLeftAddon>
              <Input
                ref={inputVideo}
                value={videos}
                onChange={handleChangeVideo}
                fontFamily="PoppinsRegular"
                placeholder="https"
                bg="white"
                borderRightRadius="20"
              />
              {videos && (
                <InputRightElement>
                  <IconButton
                    aria-label="Clear input"
                    icon={<IoIosClose />}
                    onClick={handleClearVideo}
                    variant="ghost"
                    size="sm"
                  />
                </InputRightElement>
              )}
            </InputGroup>

            <Text
              mt="1.5rem"
              fontFamily="PoppinsRegular"
              fontStyle="italic"
              fontSize="0.8rem"
              textAlign="center"
            >
              Masukkan link youtube yang valid agar video muncul dalam undangan.
            </Text>
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
              onClick={onClose}
              w="full"
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        hidden={videos && isValid ? true : false}
        m="2"
        borderRadius="lg"
        height="150px"
        bg="#d9d9d9"
        justify="center"
        alignItems="center"
        borderStyle="dashed"
        borderWidth="1px"
        borderColor="black"
        flexDirection="column"
        onClick={onOpen}
        cursor="pointer"
      >
        <AiOutlineYoutube  size="3rem" color="#5f5f5f" />
        <Text mt="3" fontFamily="PoppinsBold" color="#5f5f5f">
          Tambah Moment Video
        </Text>
      </Flex>
      {/* Photo Mozaic */}
      <Box mt="0.5rem">
        <ImageGallery imgArray={images} columnWidth={126} gapSize={18} />
      </Box>
      <ImageUpload />
    </MotionBox>
  );
}
