import { Box, Center, Image, Text } from '@chakra-ui/react';
// import GroomPhoto from '../../../../assets/rusticWeddingBloom/groomRWD.png';
// import BridePhoto from '../../../../assets/rusticWeddingBloom/brideRWD.png';
import { useRef, useEffect } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import { fadeInRight, fadeInTop, mainBox } from '../../../../utils/animation';
import BadgeInstagram from '../badgeInstagram';
import MotionText from '../../../motion/motionText';
import MotionBox from '../../../motion/motionBox';
import { getImageWithFormat } from '../../../../utils/url';
import { useTemplate } from '../../../../hooks/useTemplate';
import { useLocation } from 'react-router-dom';
import Ticket from '../../../../assets/passPort/ticket.png';
export default function CoupleDetail({
  bride,
  groom,
  greeting,
  coupleDetailRef,
}) {
  const { pathname } = useLocation();
  const { template } = useTemplate();
  const mainRef = useRef(null);
  const brideRef = useRef(null);
  const groomRef = useRef(null);

  const isInView = useInView(mainRef, { once: true });
  const isInViewBride = useInView(brideRef, { once: true });
  const isInViewGroom = useInView(groomRef, { once: true });

  const mainControls = useAnimation();
  const brideControls = useAnimation();
  const groomControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('animate');
    }
    if (isInViewBride) {
      brideControls.start('animate');
    }
    if (isInViewGroom) {
      groomControls.start('animate');
    }
  });

  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const extractedPart = pathParts[pathParts.length - 1];

  return (
    <Box mb="3rem" ref={coupleDetailRef}>
      {extractedPart == 'Dendy_Marlin' && (
        <Center>
          <Image src={Ticket} alt="Dan Abramov" />
        </Center>
      )}
      <Center>
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
          <MotionText variants={fadeInTop} fontSize="2xl">
            {greeting?.religion_greeting}
          </MotionText>
          <MotionText
            variants={fadeInTop}
            my="5"
            variant="latinos"
            fontSize={'1rem'}
          >
            {greeting?.main_greeting}
          </MotionText>
          <MotionText
            variants={fadeInTop}
            my="5"
            variant="latinos"
            fontSize={'1rem'}
          >
            {greeting?.secondary_greeting}
          </MotionText>

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
            <Center>
              <Box
                height="260px"
                width="180px"
                backgroundColor="red"
                backgroundImage={
                  pathname.includes('/wedding/') ||
                  pathname == `/templates/${template.path}`
                    ? getImageWithFormat(groom?.image, 'small')
                    : groom?.image.formats.small.url
                }
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
                borderRadius="100"
                backgroundPosition="center"
              ></Box>
            </Center>

            <MotionText
               fontSize="1.5rem"
              my={'0.5rem'}
              variants={fadeInRight}
              textTransform="capitalize"
              fontFamily={'MolgakClassy'}
              color="#b68e27"
              ref={groomRef}
              mt={'2rem'}
            >
              {groom?.name}
            </MotionText>
            <MotionText
              variants={fadeInRight}
              fontSize="md"
              my="0.5rem"
              variant="rusticWeddingBloomTextSemi"
            >
              {groom?.family_tree}
            </MotionText>
            <MotionText
              variants={fadeInRight}
              fontSize="md"
              mb="1rem"
              variant="rusticWeddingBloomText"
            >
              {groom?.father} & {groom?.mother}
            </MotionText>
            {groom?.instagram && <BadgeInstagram username={groom.instagram} />}
          </MotionBox>
          <Text fontFamily="PoppinsBold" fontSize="3xl" my="3rem">
            &
          </Text>
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
            <Center>
              <Box
                height="260px"
                width="180px"
                backgroundColor="red"
                backgroundImage={
                  pathname.includes('/wedding/') ||
                  pathname == `/templates/${template.path}`
                    ? getImageWithFormat(bride?.image, 'small')
                    : bride?.image.formats.small.url
                }
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
                borderRadius="100"
                backgroundPosition="center"
              ></Box>
            </Center>

            <MotionText
              fontSize="1.5rem"
              my={'0.5rem'}
              variants={fadeInRight}
              textTransform="capitalize"
              fontFamily={'MolgakClassy'}
              color="#b68e27"
              ref={brideRef}
            >
              {bride?.name}
            </MotionText>
            <MotionText
              variants={fadeInRight}
              fontSize="md"
              my="0.5rem"
              variant="rusticWeddingBloomTextSemi"
            >
              {bride?.family_tree}
            </MotionText>
            <MotionText
              variants={fadeInRight}
              fontSize="md"
              mb="1rem"
              variant="rusticWeddingBloomText"
            >
              {bride?.father} & {bride?.mother}
            </MotionText>
            {bride?.instagram && <BadgeInstagram username={bride.instagram} />}
          </MotionBox>
        </MotionBox>
      </Center>
    </Box>
  );
}
