import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
} from '@chakra-ui/react';
import MotionBox from '../../../../motion/motionBox';
import { useRef, useEffect } from 'react';
import { useInView, useAnimation, useAnimationControls } from 'framer-motion';
import MotionHeading from '../../../../motion/motionHeading/motionHeading';
import {
  fadeInRight,
  fadeInTop,
  mainBox,
} from '../../../../../utils/animation';
import MotionButton from '../../../../motion/motionButton';
import { FaRegEye, FaRegEyeSlash, FaPlus } from 'react-icons/fa6';
import EditableControls from '../../../../editButton';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useGiftStore } from '../../../../../stores/editableView';



export default function WeddingGift() {
  const toast = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const {
    wedding_banks,
    addBank,
    removeBank,
    title_gift,
    showGift,
    setShowGift,
  } = useGiftStore();
  const mainControls = useAnimation();
  const banks = {
    id: Date.now(),
    gift_title: 'Nama Bank/Lainnya',
    gift_subtitle: 'a.n Putra Andika Seno',
    gift_address: '12456XXX',
    is_bank: true,
  };
  const handleAddBank = () => {
    addBank(banks);
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
      p="1.5rem"
      borderRadius="1.5rem"
      bg="bgWhiteOp80.50"
      my="2rem"
      sx={showGift ? { opacity: 1 } : { opacity: '0.5 !important' }}
    >
      <Button
        leftIcon={showGift ? <FaRegEye /> : <FaRegEyeSlash />}
        position="absolute"
        colorScheme="passPort"
        fontSize="0.7rem"
        borderRadius="2xl"
        top="-1"
        right="3"
        variant="rusticWeddingBloom"
        onClick={() => {
          setShowGift(!showGift);
        }}
        size="xs"
      >
        <Text mt="1">{showGift ? 'Sembunyikan' : 'Tampilkan'}</Text>
      </Button>
      <MotionHeading
        textAlign="center"
        my="1rem"
        variant="rusticWeddingBloomMolgakClassy"
color="passPort.500"
        variants={fadeInTop}
      >
        Wedding Gift
      </MotionHeading>
      <Text
        ref={ref}
        textAlign="center"
        variant="rusticWeddingBloomText"
        my="1rem"
      >
        {title_gift}
      </Text>
      {
        wedding_banks
          .filter((bank) => !bank.is_bank)
          .map((bank) => (
            <MotionBox variants={fadeInRight} key={bank.id}>
              <GiftAddress
                id={bank.id}
                title={bank.gift_title}
                receiver={bank.gift_subtitle}
                address={bank.gift_address}
              ></GiftAddress>
            </MotionBox>
          ))
      }
      {wedding_banks
        .filter((bank) => bank.is_bank)
        .map((bank) => (
          <MotionBox key={bank.id}>
            <WeddingBank
              id={bank.id}
              bankName={bank.gift_title}
              bankAccount={bank.gift_address}
              receiver={bank.gift_subtitle}
            ></WeddingBank>
          </MotionBox>
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
          if (wedding_banks.length <= 3) {
            handleAddBank();
          } else {
            toast({
              title: 'Batas rekening tercapai',
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
          {wedding_banks.length <= 3
            ? 'Tambah Rekening Tujuan'
            : 'Batas rekening tercapai'}
        </Text>
      </Flex>
    </MotionBox>
  );
}

function WeddingBank({ id, bankName, bankAccount, receiver }) {
  const toast = useToast({
    duration: 2000,
    isClosable: true,
    status: 'success',
  });
  const { updateGiftAddress, updateGiftSubTitle, updateGiftTitle, removeBank } =
    useGiftStore();
  const controls = useAnimationControls();

  return (
    <MotionBox
      bg="#F1EAE0"
      textAlign="center"
      p="1rem"
      borderRadius="1.5rem"
      mb="1rem"
    >
      <MotionHeading as="h2" variant="rusticWeddingBloomH1Poppins">
        <Editable as="span" value={bankName}>
          <EditableControls right="2rem" />
          <EditablePreview />
          <EditableInput
            _focusVisible={{
              boxShadow: 'none',
            }}
            onChange={(e) => updateGiftTitle(id, e.target.value)}
          />
        </Editable>
      </MotionHeading>
      <Text my="0.5rem" fontFamily="PoppinsRegular">
        <Editable as="span" value={bankAccount}>
          <EditableControls right="2rem" />
          <EditablePreview />
          <EditableInput
            _focusVisible={{
              boxShadow: 'none',
            }}
            onChange={(e) => updateGiftAddress(id, e.target.value)}
          />
        </Editable>
      </Text>
      <Text my="0.5rem" fontFamily="PoppinsRegular">
        <Editable as="span" value={receiver}>
          <EditableControls right="2.2rem" />
          <EditablePreview />
          <EditableInput
            _focusVisible={{
              boxShadow: 'none',
            }}
            onChange={(e) => updateGiftSubTitle(id, e.target.value)}
          />
        </Editable>
      </Text>
      <MotionButton
        initial="rest"
        animate={controls}
        variant="rusticWeddingBloom"
        my="0.5rem"
        letterSpacing="widest"
        cursor="pointer"
        onClick={async () => {
          controls.start({
            scale: [1, 1.1, 1, 1.1, 1],
            rotate: [0, 10, -10, 10, -10, 0],
          });
          await navigator.clipboard.writeText(bankAccount);
          toast({
            title: 'Nomor Rekening',
            description: 'Salin nomor berhasil',
          });
        }}
      >
        Salin Nomor Rekening
      </MotionButton>
      <IconButton
        position="absolute"
        right="1rem"
        bg="#503C31"
        icon={<RiDeleteBinLine />}
        colorScheme="passPort"
        fontSize="0.7rem"
        borderRadius="full"
        variant="rusticWeddingBloom"
        onClick={() => {
          removeBank(id);
        }}
        size="sm"
      />
    </MotionBox>
  );
}

function GiftAddress({ id, title, receiver, address }) {
  const toast = useToast({
    duration: 2000,
    isClosable: true,
    status: 'success',
  });
  const { updateGiftAddress, updateGiftSubTitle, updateGiftTitle } =
    useGiftStore();
  const controls = useAnimationControls();
  return (
    <Box
      bg="#F1EAE0"
      textAlign="center"
      p="1.5rem"
      borderRadius="1.5rem"
      mb="1rem"
    >
      <Text my="0.5rem" fontSize="0.8rem" fontFamily="PoppinsRegular">
        <Editable as="span" value={title}>
          <EditableControls right="2rem" />
          <EditablePreview />
          <EditableTextarea
            p="0"
            h="4rem"
            _focusVisible={{
              boxShadow: 'none',
            }}
            onChange={(e) => updateGiftTitle(id, e.target.value)}
          />
        </Editable>
      </Text>
      <Heading as="h2" fontSize="1rem" my="1.2rem" fontFamily="PoppinsSemibold">
        Penerima:<br></br>
        <Editable as="span" value={receiver}>
          <EditableControls right="2rem" />
          <EditablePreview />
          <EditableInput
            _focusVisible={{
              boxShadow: 'none',
            }}
            onChange={(e) => updateGiftSubTitle(id, e.target.value)}
          />
        </Editable>
      </Heading>
      <Text my="0.5rem" fontSize="0.8rem" fontFamily="PoppinsRegular" p="3">
        <Editable as="span" value={address}>
          <EditableControls right="2rem" />
          <EditablePreview />
          <EditableTextarea
            p="0"
            h="3rem"
            _focusVisible={{
              boxShadow: 'none',
            }}
            onChange={(e) => updateGiftAddress(id, e.target.value)}
          />
        </Editable>
      </Text>
      <MotionButton
        initial="rest"
        animate={controls}
        variant="rusticWeddingBloom"
        my="0.5rem"
        letterSpacing="widest"
        cursor="pointer"
        onClick={async () => {
          controls.start({
            scale: [1, 1.1, 1, 1.1, 1],
            rotate: [0, 10, -10, 10, -10, 0],
          });
          await navigator.clipboard.writeText(address);
          toast({
            title: 'Berhasil',
            description: 'Salin alamat berhasil',
          });
        }}
      >
        Salin Alamat
      </MotionButton>
    </Box>
  );
}
