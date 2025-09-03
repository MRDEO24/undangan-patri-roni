import {
  Box,
  Heading,
  Text,
  useToast,
  Collapse,
  Button,
  Center,
} from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import MotionBox from '../../../motion/motionBox';
import { useInView, useAnimation, useAnimationControls } from 'framer-motion';
import MotionHeading from '../../../motion/motionHeading/motionHeading';
import { fadeInRight, fadeInTop, mainBox } from '../../../../utils/animation';
import MotionButton from '../../../motion/motionButton';

export default function WeddingGift({ weddingGifts }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isInView) {
      mainControls.start('animate');
    }
  });

  const toggleCollapse = () => setIsOpen(!isOpen);

  return (
    <MotionBox
      variants={mainBox}
      initial="initial"
      animate={mainControls}
      p="1.5rem"
      borderRadius="1.5rem"
      bg="white"
      my="2rem"
    >
      <MotionHeading
        textAlign="center"
        my="1rem"
        variant="rusticWeddingBloomMolgakClassy"
        color="passport.500"
        variants={fadeInTop}
        ref={ref}
      >
        Wedding Gift
      </MotionHeading>

      <Text textAlign="center" variant="rusticWeddingBloomText" my="1rem">
        {weddingGifts.titleGift}
      </Text>
      <Center mb="1rem">
        <Button
          onClick={toggleCollapse}
          variant="ghost"
          rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
        >
          {isOpen ? 'Sembunyikan' : 'Tampilkan'}
        </Button>
      </Center>
      <Collapse in={isOpen} animateOpacity>
        {weddingGifts.giftWedding.map((weddingGift, index) => (
          <MotionBox key={index} variants={fadeInRight}>
            {weddingGift.is_bank ? (
              <WeddingBank
                bankName={weddingGift.gift_title}
                bankAccount={weddingGift.gift_address}
                receiver={weddingGift.gift_subtitle}
              />
            ) : (
              <GiftAddress
                title={weddingGift.gift_title}
                address={weddingGift.gift_address}
                receiver={weddingGift.gift_subtitle}
              />
            )}
          </MotionBox>
        ))}
      </Collapse>
    </MotionBox>
  );
}

function WeddingBank({ bankName, bankAccount, receiver }) {
  const toast = useToast({
    duration: 2000,
    isClosable: true,
    status: 'success',
  });
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
        {bankName}
      </MotionHeading>
      <Text my="0.5rem" fontFamily="PoppinsRegular">
        {bankAccount}
      </Text>
      <Text my="0.5rem" fontFamily="PoppinsRegular">
        {receiver}
      </Text>
      <MotionButton
        scale={1}
        variant="rusticWeddingBloom"
        bg="passPort.500"
        my="0.5rem"
        letterSpacing="widest"
        cursor="pointer"
        animate={controls}
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
        Salin Rekening
      </MotionButton>
    </MotionBox>
  );
}

function GiftAddress({ title, receiver, address }) {
  const toast = useToast({
    duration: 2000,
    isClosable: true,
    status: 'success',
  });
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
        {title}
      </Text>
      <Heading as="h2" fontSize="1rem" my="1.2rem" fontFamily="PoppinsSemibold">
        Penerima:<br></br>
        {receiver}
      </Heading>
      <Text my="0.5rem" fontSize="0.8rem" fontFamily="PoppinsRegular">
        {address}
      </Text>
      <MotionButton
        scale={1}
        variant="rusticWeddingBloom"
        bg="passPort.500"
        my="0.5rem"
        letterSpacing="widest"
        cursor="pointer"
        animate={controls}
        onClick={async () => {
          controls.start({
            scale: [1, 1.1, 1, 1.1, 1],
            rotate: [0, 10, -10, 10, -10, 0],
          });
          await navigator.clipboard.writeText(address);
          toast({
            title: 'Alamat',
            description: 'Salin alamat berhasil',
          });
        }}
      >
        Salin Alamat
      </MotionButton>
    </Box>
  );
}
