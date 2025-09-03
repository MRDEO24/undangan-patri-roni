import {
  Box,
  Button,
  Card,
  CardBody,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Flex,
  Heading,
  // Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import MotionHeading from '../../../../motion/motionHeading/motionHeading';
import MotionImage from '../../../../motion/motionImage';
import MotionBox from '../../../../motion/motionBox';
import { useEffect, useRef, useState } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import { fadeInTop, mainBox } from '../../../../../utils/animation';
import LoveStoryPH from '../../../../../assets/loveStroy.jpeg';
import { FaRegEye, FaRegEyeSlash, FaPlus } from 'react-icons/fa6';
import EditableControls from '../../../../editButton';
import { RiEditLine, RiDeleteBinLine } from 'react-icons/ri';
import moment from 'moment';
import { useLoveStoryStore } from '../../../../../stores/editableView';
import ImageCropperModal from '../../../../imageCropper';

function LoveStoryCard({
  id,
  image,
  description,
  title,
  alt,
  animateTrigger1,
  animateTrigger2,
}) {
  const toast = useToast();
  const {
    updateLoveStoryTitle,
    updateLoveStoryDescription,
    updateLoveStoryImage,
    removeLoveStory,
  } = useLoveStoryStore();

  const imgRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showOverlay, setShowOverlay] = useState(false);

  const handleDeleteClick = () => {
    removeLoveStory(id);
  };

  const handleEditClick = () => {
    onOpen();
  };

  return (
    <Card maxW="sm" bg="#ff000000" boxShadow="none" opacity="1" my="4">
      <CardBody
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
      >
        <Box p="0">
          {showOverlay && (
            <Flex
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bg="rgba(0,0,0,0.2)"
              d="flex"
              borderRadius="lg"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Button
                width="250px"
                leftIcon={<RiEditLine />}
                variant="rusticWeddingBloom"
                aria-label="Edit"
                onClick={handleEditClick}
                mb="2"
              >
                Edit Cerita Cintaku
              </Button>
              <Button
                width="250px"
                bg="#503C31"
                leftIcon={<RiDeleteBinLine />}
                variant="rusticWeddingBloom"
                aria-label="Edit"
                onClick={handleDeleteClick}
              >
                Hapus Cerita Cintaku
              </Button>
            </Flex>
          )}

          <MotionImage
            variants={animateTrigger1}
            src={image}
            alt={alt}
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" fontFamily="PoppinsSemibold">
              {title}
            </Heading>
            <Text fontFamily="PoppinsRegular">{description}</Text>
          </Stack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Love Story</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb="4rem">
              <MotionImage
                variants={animateTrigger1}
                src={image}
                alt={alt}
                borderRadius="lg"
                onClick={() => imgRef.current.click()}
              />
              <ImageCropperModal
                fileInputRef={imgRef}
                setImageFunc={updateLoveStoryImage}
                id={id}
                aspect={4 / 3}
                shape="rect"
              />
              <MotionBox variants={animateTrigger2}>
                <Stack mt="6" spacing="3">
                  <Heading size="md" fontFamily="PoppinsSemibold">
                    <Editable as="span" value={title}>
                      <EditableControls />
                      <EditablePreview />
                      <EditableInput
                        _focusVisible={{
                          boxShadow: 'none',
                        }}
                        onChange={(e) =>
                          updateLoveStoryTitle(id, e.target.value)
                        }
                      />
                    </Editable>
                  </Heading>
                  <Text fontFamily="PoppinsRegular">
                    <Editable as="span" value={description}>
                      <EditableControls />
                      <EditablePreview />
                      <EditableTextarea
                        h="3rem"
                        _focusVisible={{
                          boxShadow: 'none',
                        }}
                        onChange={(e) =>
                          updateLoveStoryDescription(id, e.target.value)
                        }
                      />
                    </Editable>
                  </Text>
                </Stack>
              </MotionBox>
            </ModalBody>
          </ModalContent>
        </Modal>
      </CardBody>
    </Card>
  );
}

export default function LoveStory() {
  const toast = useToast();
  const loveStoryRef = useRef(null);
  const isInView = useInView(loveStoryRef, { once: true });
  const { love_stories, addLoveStory, setShowLove, showLove } =
    useLoveStoryStore(); // Access state and actions from the store

  // Function to handle add button click
  const handleAddLoveStory = () => {
    const newLoveStory = {
      id: Date.now(),
      description: 'Akhirnya kami memutuskan untuk menikah',
      title: moment().format('DD MMMM YYYY').toUpperCase(),
      image: LoveStoryPH,
    };
    addLoveStory(newLoveStory);
  };

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
        animate={mainControls}
        p="1rem"
        borderRadius="1.5rem"
        bg="bgWhiteOp80.50"
        mb="1.5rem"
        sx={showLove ? { opacity: 1 } : { opacity: '0.5 !important' }}
      >
        <Button
          leftIcon={showLove ? <FaRegEye /> : <FaRegEyeSlash />}
          position="absolute"
          colorScheme="passPort"
          fontSize="0.7rem"
          borderRadius="2xl"
          top="-1"
          right="3"
          variant="rusticWeddingBloom"
          onClick={() => {
            setShowLove(!showLove);
          }}
          size="xs"
        >
          <Text mt="1">{showLove ? 'Sembunyikan' : 'Tampilkan'}</Text>
        </Button>
        <MotionHeading
          variants={fadeInTop}
          textAlign="center"
          variant="rusticWeddingBloomMolgakClassy"
color="passPort.500"
          mt="1.2rem"
        >
          Love Story
        </MotionHeading>
        <Box ref={loveStoryRef}></Box>
        {love_stories.map((story) => (
          <LoveStoryCard
            key={story.id}
            id={story.id}
            image={story.image}
            title={story.title}
            description={story.description}
            alt="Love Story Image"
          />
        ))}
        <Flex
          m="3"
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
            if (love_stories.length <= 9) {
              handleAddLoveStory();
            } else {
              toast({
                title: 'Batas cerita cinta tercapai',
                status: 'warning',
                duration: 5000,
                isClosable: true,
              });
            }
          }}
          cursor="pointer"
        >
          <FaPlus size="3rem" color="#5f5f5f" />
          <Text mt="3" fontFamily="PoppinsBold" color="#5f5f5f">
            {love_stories.length <= 9
              ? 'Tambah Foto Moment'
              : 'Batas cerita cinta tercapai'}
          </Text>
        </Flex>
      </MotionBox>
    </>
  );
}
