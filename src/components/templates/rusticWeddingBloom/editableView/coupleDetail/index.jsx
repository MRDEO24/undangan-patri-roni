import {
  Box,
  Button,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Flex,
  IconButton,
  Input,
  InputGroup,
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
} from '@chakra-ui/react';
import GroomPhoto from '../../../../../assets/rusticWeddingBloom/groomRWD.png';
import BridePhoto from '../../../../../assets/rusticWeddingBloom/brideRWD.png';
import { useRef, useEffect, useState } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import {
  fadeInRight,
  fadeInTop,
  mainBox,
} from '../../../../../utils/animation';
import BadgeInstagram from '../badgeInstagram';
import MotionText from '../../../../motion/motionText';
import MotionBox from '../../../../motion/motionBox';
import EditableControls from '../../../../editButton';
import { IoIosClose } from 'react-icons/io';
import IconEdit from '../../../../iconEdit';
import ImageCropperModal from '../../../../imageCropper';
import { useBrideStore, useGreetingsStore, useGroomStore } from '../../../../../stores/editableView';


export default function CoupleDetail({ coupleDetailRef }) {
  const mainRef = useRef(null);
  const brideRef = useRef(null);
  const groomRef = useRef(null);
  const groomPhotoRef = useRef();
  const bridePhotoRef = useRef();
  const isInView = useInView(mainRef, { once: true });
  const isInViewBride = useInView(brideRef, { once: true });
  const isInViewGroom = useInView(groomRef, { once: true });
  const {
    isOpen: isGroomModalOpen,
    onOpen: onGroomModalOpen,
    onClose: onGroomModalClose,
  } = useDisclosure();

  const {
    isOpen: isBrideModalOpen,
    onOpen: onBrideModalOpen,
    onClose: onBrideModalClose,
  } = useDisclosure();

  const {
    isOpen: isGroomModalInstaOpen,
    onOpen: onGroomModalInstaOpen,
    onClose: onGroomModalInstaClose,
  } = useDisclosure();

  const {
    isOpen: isBrideModalInstaOpen,
    onOpen: onBrideModalInstaOpen,
    onClose: onBrideModalInstaClose,
  } = useDisclosure();

  const mainControls = useAnimation();
  const brideControls = useAnimation();
  const groomControls = useAnimation();

  const {
    religionGreeting,
    mainGreeting,
    secondaryGreeting,
    setReligionGreeting,
    setMainGreeting,
    setSecondaryGreeting,
  } = useGreetingsStore();

  const [groomName, setGroomName, groomPhoto, setGroomPhoto] = useGroomStore(
    (state) => [
      state.name,
      state.setName,
      state.groomPhoto,
      state.setGroomPhoto,
    ],
  );
  const [groomFather] = useGroomStore((state) => [
    state.father,
    state.setFather,
  ]);
  const [groomMother] = useGroomStore((state) => [
    state.mother,
    state.setMother,
  ]);
  const [groomInstagram, setGroomInstagram] = useGroomStore((state) => [
    state.instagram,
    state.setInstagram,
  ]);
  const [groomFamilyTree, setGroomFamilyTree] = useGroomStore((state) => [
    state.familyTree,
    state.setFamilyTree,
  ]);
  const [brideName, setBrideName, bridePhoto, setBridePhoto] = useBrideStore(
    (state) => [
      state.name,
      state.setName,
      state.bridePhoto,
      state.setBridePhoto,
    ],
  );
  const [brideFather] = useBrideStore((state) => [
    state.father,
    state.setFather,
  ]);
  const [brideMother] = useBrideStore((state) => [
    state.mother,
    state.setMother,
  ]);
  const [brideInstagram, setBrideInstagram] = useBrideStore((state) => [
    state.instagram,
    state.setInstagram,
  ]);
  const [brideFamilyTree, setBrideFamilyTree] = useBrideStore((state) => [
    state.familyTree,
    state.setFamilyTree,
  ]);

  useEffect(() => {
    if (isInView) {
      mainControls.start('animate');
    }
    if (isInViewBride) {
      // console.log('its birde');
      brideControls.start('animate');
    }
    if (isInViewGroom) {
      // console.log('its groom');
      groomControls.start('animate');
    }
  });

  const [instagramGroom, setInstagramGroom] = useState(groomInstagram);
  const [instagramBride, setInstagramBride] = useState(brideInstagram);

  const handleChangeGroom = (event) => {
    const inputValueGroom = event.target.value;
    const sanitizedValueGroom = inputValueGroom.replace(/\s/g, '');
    setInstagramGroom(sanitizedValueGroom);
    setGroomInstagram(sanitizedValueGroom);
  };

  const handleClearInputGroom = () => {
    setInstagramGroom('');
  };

  const handleChangeBride = (event) => {
    const inputValueBride = event.target.value;
    const sanitizedValueBride = inputValueBride.replace(/\s/g, '');
    setInstagramBride(sanitizedValueBride);
    setBrideInstagram(sanitizedValueBride);
  };

  const handleClearInputBride = () => {
    setInstagramBride('');
  };

  return (
    <Box mb="3rem" ref={coupleDetailRef}>
      <MotionBox
        p="1rem"
        py="2.5rem"
        borderRadius="1.5rem"
        textAlign="center"
        bg="bgWhiteOp80.50"
        ref={mainRef}
        variants={mainBox}
        initial="initial"
        animate={mainControls}
      >
        <MotionText
          variants={fadeInTop}
          fontSize="2xl"
          variant="rusticWeddingBloomTextSemi"
        >
          <Editable as="span" value={religionGreeting}>
            <EditableControls />
            <EditablePreview />
            <EditableInput
              _focusVisible={{
                boxShadow: 'none',
              }}
              onChange={(e) => setReligionGreeting(e.target.value)}
            />
          </Editable>
        </MotionText>

        <MotionText
          variants={fadeInTop}
          my="5"
          variant="rusticWeddingBloomTextSemi"
        >
          <Editable as="span" value={mainGreeting}>
            <EditableControls />
            <EditablePreview />
            <EditableInput
              _focusVisible={{
                boxShadow: 'none',
              }}
              onChange={(e) => setMainGreeting(e.target.value)}
            />
          </Editable>
        </MotionText>
        <MotionText
          variants={fadeInTop}
          my="5"
          variant="rusticWeddingBloomText"
        >
          <Editable as="span" value={secondaryGreeting}>
            <EditableControls />
            <EditablePreview />
            <EditableTextarea
              h="6rem"
              _focusVisible={{
                boxShadow: 'none',
              }}
              onChange={(e) => setSecondaryGreeting(e.target.value)}
            />
          </Editable>
        </MotionText>

        {/* Groom */}
        <MotionBox
          variants={{
            initial: { opacity: 0, y: '-60px' },
            animate: {
              opacity: 1,
              y: '0px',
              transition: {
                duration: 2,
                delayChildren: 0.5,
                staggerChildren: 0.5,
              },
            },
          }}
          initial="initial"
          animate={groomControls}
        >
          <IconButton
            right="3rem"
            position="absolute"
            isRound
            colorScheme="passPort"
            opacity="1"
            size="sm"
            onClick={() => groomPhotoRef.current.click()}
            aria-label="Edit instagram"
            icon={<IconEdit />}
          />
          <ImageCropperModal
            fileInputRef={groomPhotoRef}
            setImageFunc={setGroomPhoto}
            aspect={9 / 13}
            shape="rect"
          />
          <Center>
            <Box
              height="260px"
              width="180px"
              backgroundColor="red"
              backgroundImage={groomPhoto || GroomPhoto}
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              borderRadius="100"
              backgroundPosition="center"
            ></Box>
          </Center>
          <MotionText
            variants={fadeInRight}
            textTransform="capitalize"
            variant="rusticWeddingBloomName"
            color="passPort.500"
            ref={groomRef}
          >
            <Editable as="span" value={groomName}>
              <EditableControls />
              <EditablePreview />
              <EditableInput
                _focusVisible={{
                  boxShadow: 'none',
                }}
                onChange={(e) => setGroomName(e.target.value)}
              />
            </Editable>
          </MotionText>
          <MotionText
            variants={fadeInRight}
            fontSize="md"
            my="0.5rem"
            variant="rusticWeddingBloomTextSemi"
          >
            <Editable as="span" value={groomFamilyTree}>
              <EditableControls />
              <EditablePreview />
              <EditableInput
                _focusVisible={{
                  boxShadow: 'none',
                }}
                onChange={(e) => setGroomFamilyTree(e.target.value)}
              />
            </Editable>
          </MotionText>
          <Flex justify="center">
            <MotionText
              variants={fadeInRight}
              fontSize="md"
              mb="1rem"
              variant="rusticWeddingBloomText"
            >
              {groomFather || groomMother ? (
                <>
                  {groomFather && (
                    <>
                      Bapak {groomFather}
                      {groomMother ? ' dan ' : ''}
                    </>
                  )}
                  {groomMother && (
                    <>
                      Ibu {groomMother}
                      {!groomFather ? '' : ' '}
                    </>
                  )}
                </>
              ) : (
                <span style={{ opacity: '0.3' }}>Baris nama orang tua</span>
              )}
            </MotionText>
            <IconButton
              right="0.2rem"
              position="absolute"
              isRound
              colorScheme="passPort"
              opacity="0.7"
              size="xs"
              onClick={onGroomModalOpen}
              aria-label="Edit instagram"
              icon={<IconEdit />}
            />
            <ModalFaMo
              isOpen={isGroomModalOpen}
              onClose={onGroomModalClose}
              father={groomFather}
              mother={groomMother}
              isGroomModal
            />
          </Flex>
          <BadgeInstagram
            title="Laki-laki"
            username={instagramGroom}
            isOpen={isGroomModalInstaOpen}
            onOpen={onGroomModalInstaOpen}
            onClose={onGroomModalInstaClose}
            onChange={handleChangeGroom}
            onClick={handleClearInputGroom}
          />
        </MotionBox>

        <Text fontFamily="PoppinsBold" fontSize="3xl" my="3rem" color="passPort.500">
          &
        </Text>
        {/* Bride */}
        <MotionBox
          variants={{
            initial: { opacity: 0, y: '-60px' },
            animate: {
              opacity: 1,
              y: '0px',
              transition: {
                duration: 2,
                delayChildren: 0.5,
                staggerChildren: 0.5,
              },
            },
          }}
          initial="initial"
          animate={brideControls}
        >
          <IconButton
            right="3rem"
            position="absolute"
            isRound
            colorScheme="passPort"
            opacity="1"
            size="sm"
            onClick={() => bridePhotoRef.current.click()}
            aria-label="Edit instagram"
            icon={<IconEdit />}
          />
          <ImageCropperModal
            fileInputRef={bridePhotoRef}
            setImageFunc={setBridePhoto}
            aspect={9 / 13}
            shape="rect"
          />
          <Center>
            <Box
              height="260px"
              width="180px"
              backgroundColor="red"
              backgroundImage={bridePhoto || BridePhoto}
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              borderRadius="100"
              backgroundPosition="center"
            ></Box>
          </Center>
          <MotionText
            variants={fadeInRight}
            textTransform="capitalize"
            variant="rusticWeddingBloomName"
            color="passPort.500"
            ref={brideRef}
          >
            <Editable as="span" value={brideName}>
              <EditableControls />
              <EditablePreview />
              <EditableInput
                _focusVisible={{
                  boxShadow: 'none',
                }}
                onChange={(e) => setBrideName(e.target.value)}
              />
            </Editable>
          </MotionText>
          <MotionText
            variants={fadeInRight}
            fontSize="md"
            my="0.5rem"
            variant="rusticWeddingBloomTextSemi"
          >
            <Editable as="span" value={brideFamilyTree}>
              <EditableControls />
              <EditablePreview />
              <EditableInput
                _focusVisible={{
                  boxShadow: 'none',
                }}
                onChange={(e) => setBrideFamilyTree(e.target.value)}
              />
            </Editable>
          </MotionText>
          <Flex justify="center">
            <MotionText
              variants={fadeInRight}
              fontSize="md"
              mb="1rem"
              variant="rusticWeddingBloomText"
            >
              {brideFather || brideMother ? (
                <>
                  {brideFather && (
                    <>
                      Bapak {brideFather}
                      {brideMother ? ' dan ' : ''}
                    </>
                  )}
                  {brideMother && (
                    <>
                      Ibu {brideMother}
                      {!brideFather ? '' : ' '}
                    </>
                  )}
                </>
              ) : (
                <span style={{ opacity: '0.3' }}>Baris nama orang tua</span>
              )}
            </MotionText>
            <IconButton
              right="0.2rem"
              position="absolute"
              isRound
              colorScheme="passPort"
              opacity="0.7"
              size="xs"
              onClick={onBrideModalOpen}
              aria-label="Edit instagram"
              icon={<IconEdit />}
            />
            <ModalFaMo
              isOpen={isBrideModalOpen}
              onClose={onBrideModalClose}
              father={brideFather}
              mother={brideMother}
            />
          </Flex>
          <BadgeInstagram
            title="Wanita"
            username={instagramBride}
            isOpen={isBrideModalInstaOpen}
            onOpen={onBrideModalInstaOpen}
            onClose={onBrideModalInstaClose}
            onChange={handleChangeBride}
            onClick={handleClearInputBride}
          />
        </MotionBox>
      </MotionBox>
    </Box>
  );
}

function ModalFaMo({ onClose, isOpen, father, mother, isGroomModal }) {
  const handleClearFatherName = () => {
    isGroomModal
      ? useGroomStore.getState().setFather('')
      : useBrideStore.getState().setFather('');
  };
  const handleClearMotherName = () => {
    isGroomModal
      ? useGroomStore.getState().setMother('')
      : useBrideStore.getState().setMother('');
  };
  const handleSetFatherName = (e) => {
    isGroomModal
      ? useGroomStore.getState().setFather(e.target.value)
      : useBrideStore.getState().setFather(e.target.value);
  };
  const handleSetMotherName = (e) => {
    isGroomModal
      ? useGroomStore.getState().setMother(e.target.value)
      : useBrideStore.getState().setMother(e.target.value);
  };

  const inputFirst = useRef();

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      initialFocusRef={inputFirst}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent mx="3" bg="gray.100" borderRadius="20">
        <ModalHeader>
          <Text variant="rusticWeddingBloomText">
            Masukkan nama orang tua mempelai{' '}
            {isGroomModal ? 'laki-laki' : 'wanita'}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup size="md">
            <Input
              value={father}
              onChange={handleSetFatherName}
              fontFamily="PoppinsRegular"
              placeholder="Nama Ayah"
              bg="white"
              borderRadius="20"
              ref={inputFirst}
            />
            {father && (
              <InputRightElement>
                <IconButton
                  aria-label="Clear input"
                  icon={<IoIosClose />}
                  onClick={handleClearFatherName}
                  variant="ghost"
                  size="sm"
                />
              </InputRightElement>
            )}
          </InputGroup>
          <InputGroup size="md" mt="2">
            <Input
              value={mother}
              onChange={handleSetMotherName}
              fontFamily="PoppinsRegular"
              placeholder="Nama Ibu"
              bg="white"
              borderRadius="20"
            />
            {mother && (
              <InputRightElement>
                <IconButton
                  aria-label="Clear input"
                  icon={<IoIosClose />}
                  onClick={handleClearMotherName}
                  variant="ghost"
                  size="sm"
                />
              </InputRightElement>
            )}
          </InputGroup>

          <Text
            mt="1.5rem"
            fontFamily="PoppinsRegular"
            fontSize="0.8rem"
            textAlign="center"
          >
            Kosongkan input untuk tidak menampilkan nama
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
            onClick={onClose} // Attach handleSave function here
            w="full"
          >
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
