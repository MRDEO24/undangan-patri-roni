import {
  Box,
  Button,
  Center,
  Editable,
  EditablePreview,
  EditableTextarea,
  Heading,
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
} from '@chakra-ui/react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { mainBox } from '../../../../../utils/animation';
import EditableControls from '../../../../editButton';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import IconEdit from '../../../../iconEdit';
import { IoIosClose } from 'react-icons/io';

const MotionBox = motion(Box);

export default function FeatureInvitation({
  heading,
  text,
  buttonLink,
  buttonLabel,
  show,
  set,
  toggle,
  onClose,
  onOpen,
  isOpen,
  setLink,
  isLiveStreaming,
}) {
  const featureRef = useRef(null);
  const modalRef = useRef();
  const isInView = useInView(featureRef, { once: true });

  const mainControls = useAnimation();

  const handleClear = () => {
    setLink('');
  };

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
      p="2rem"
      borderRadius="1.5rem"
      bg="bgWhiteOp80.50"
      my="2rem"
      sx={show ? { opacity: 1 } : { opacity: '0.5 !important' }}
    >
      <Button
        leftIcon={show ? <FaRegEye /> : <FaRegEyeSlash />}
        position="absolute"
        colorScheme="passPort"
        fontSize="0.7rem"
        borderRadius="2xl"
        top="-1"
        right="3"
        variant="rusticWeddingBloom"
        onClick={() => {
          toggle(!show);
        }}
        size="xs"
      >
        {show ? 'Sembunyikan' : 'Tampilkan'}
      </Button>
      

      <Heading variant="rusticWeddingBloomMolgakClassy"
color="passPort.500" textAlign="center">
        {heading}
      </Heading>
      <Text
        textAlign="center"
        fontSize="sm"
        fontFamily="PoppinsRegular"
        my="1rem"
      >
        <Editable as="span" value={text}>
          <EditableControls />
          <EditablePreview />
          <EditableTextarea
            p="0"
            h="6rem"
            _focusVisible={{
              boxShadow: 'none',
            }}
            onChange={() => {
              set(text);
            }}
          />
        </Editable>
      </Text>
      <Center>
      <IconButton
          ml="12.5rem"
          mb="1rem"
          position="absolute"
          isRound
          colorScheme="passPort"
          opacity="0.7"
          size="xs"
          onClick={onOpen}
          aria-label="Edit Modal"
          icon={<IconEdit />}
        />
        <Button
          ref={featureRef}
          variant="rusticWeddingBloom"
          as="a"
          href={buttonLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {buttonLabel}
        </Button>
        <Modal
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        initialFocusRef={modalRef}
      >
        <ModalOverlay />
        <ModalContent mx="3" bg="gray.100" borderRadius="20" height="200px">
          <ModalHeader>
            <Text variant="rusticWeddingBloomText">
              Masukkan Link {isLiveStreaming ? 'Live Streaming' : 'Filter Instagram'}
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
                Link
              </InputLeftAddon>
              <Input
                ref={modalRef}
                value={buttonLink}
                onChange={(e)=>{
                  setLink(e.target.value);
                }}
                fontFamily="PoppinsRegular"
                placeholder="https://"
                bg="white"
                borderRightRadius="20"
              />
              {buttonLink && (
                <InputRightElement>
                  <IconButton
                    aria-label="Clear input"
                    icon={<IoIosClose />}
                    onClick={handleClear}
                    variant="ghost"
                    size="sm"
                  />
                </InputRightElement>
              )}
            </InputGroup>

            {/* <Text
              mt="1.5rem"
              fontFamily="PoppinsRegular"
              fontStyle="italic"
              fontSize="0.8rem"
              textAlign="center"
            >
              Kosongkan input untuk tidak menampilkan instagram mempelai.
            </Text> */}
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
      </Center>
    </MotionBox>
  );
}
