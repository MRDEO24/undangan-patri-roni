import { Box, Center, Flex, Heading, Image, Text } from '@chakra-ui/react';
import ButtonMaps from '../buttonMaps';
import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  fadeInRight,
  fadeInTopToBottom,
  mainBox,
  scaleUp,
} from '../../../../utils/animation';
import MotionBox from '../../../motion/motionBox';
import MotionHeading from '../../../motion/motionHeading/motionHeading';
import MotionText from '../../../motion/motionText';
import moment from 'moment';
import { getImageWithFormat } from '../../../../utils/url';
import { useLocation } from 'react-router-dom';
const MotionFlex = motion(Flex);
import Map from '../../../../assets/passPort/map.png';

export default function DetailEvent({ event }) {
  const detailRef = useRef(null);
  const isInView = useInView(detailRef, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('animate');
    }
  });
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const extractedPart = pathParts[pathParts.length - 1];
  const searchParams = new URLSearchParams(location.search);
  const timePart = searchParams.get('time') || 'default';
  console.log(timePart);

  return (
    <>
      {event?.map((evnt, index) => {
        return (
          <MotionBox
            key={index}
            p="2rem"
            mb="1rem"
            borderRadius="1.5rem"
            bg="bgWhiteOp80.50"
            variants={mainBox}
            initial="initial"
            animate={mainControls}
          >
            <Center>
              {evnt.image !== null && (
                <Image
                  borderRadius="full"
                  boxSize="80px"
                  src={getImageWithFormat(evnt.image, 'small')}
                  alt="Dan Abramov"
                />
              )}
            </Center>
            <MotionHeading
              variants={fadeInTopToBottom}
              textAlign="center"
              variant="rusticWeddingBloomMolgakClassy"
              color="passPort.500"
              my="1.5rem"
            >
              {evnt.name}
            </MotionHeading>
            <MotionFlex
              variants={fadeInTopToBottom}
              justifyContent="space-around"
              alignItems="center"
              my="2rem"
              ref={detailRef}
            >
              <Box borderRight="1px solid #6e6058" w="30vw" minH="100px">
                <Text
                  minH="100px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="1rem"
                  fontFamily="PoppinsRegular"
                >
                  {moment(evnt.date_at).format('dddd')}
                </Text>
              </Box>
              <Box w="15vw">
                <Text
                  textAlign="center"
                  fontFamily="PoppinsSemibold"
                  fontSize="2rem"
                >
                  {moment(evnt.date_at).format('Do')}
                </Text>
                <Text
                  textAlign="center"
                  fontFamily="PoppinsRegular"
                  fontSize="1rem"
                >
                  {moment(evnt.date_at).format('YYYY')}
                </Text>
              </Box>
              <Box borderLeft="1px solid #6e6058" w="30vw" minH="100px">
                <Text
                  minH="100px"
                  display="flex"
                  fontFamily="PoppinsRegular"
                  fontSize="1rem"
                  justifyContent="center"
                  alignItems="center"
                >
                  {moment(evnt.date_at).format('MMMM')}
                </Text>
              </Box>
            </MotionFlex>

            {evnt.time_at && (
              <Flex gap="0.5rem" justifyContent="center" my="2rem">
                <IconClock />
                <Heading as="h5" size="sm" fontFamily="PoppinsBold">
                  {evnt.name == 'Reception' && timePart
                    ? timePart === '10'
                      ? evnt.time_at
                      : timePart === '11'
                      ? '11:00 - 12:00 WIB'
                      : timePart === '12'
                      ? '12:00 - 13:00 WIB'
                      : evnt.time_at
                    : evnt.time_at}
                </Heading>
              </Flex>
            )}

            <MotionHeading
              variants={fadeInRight}
              textAlign="center"
              as="h5"
              size="md"
              fontFamily="PoppinsSemibold"
              fontSize="1rem"
            >
              {evnt.location_title}
            </MotionHeading>
            <MotionText
              variants={fadeInRight}
              textAlign="center"
              fontFamily="PoppinsRegular"
              textTransform="capitalize"
            >
              {evnt.location_detail}
            </MotionText>
            {extractedPart == 'Chalista_Adit' && evnt.name == 'Resepsi' && (
              <Center my="1rem">
                <Image
                  src={Map}
                  alt="Dan Abramov"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </Center>
            )}

            {(evnt.location_link ||
              evnt.location_latitude ||
              evnt.location_longitude) && (
              <ButtonMaps
                mapLink={evnt.location_link}
                latitude={evnt.location_latitude}
                longitude={evnt.location_longitude}
                animate={scaleUp}
                color="
                  passPort.500
                "
              />
            )}
          </MotionBox>
        );
      })}
    </>
  );
}

function IconClock() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 5.94824V11.5L16.2586 16.2586"
        stroke="#6E6058"
        strokeLinecap="round"
      />
      <circle cx="11.5" cy="11.5" r="10.9" stroke="#6E6058" strokeWidth="1.2" />
      <line
        x1="11.6034"
        y1="2.08618"
        x2="11.6034"
        y2="3.46549"
        stroke="#6E6058"
        strokeLinecap="round"
      />
      <line
        x1="20.9138"
        y1="11.6034"
        x2="19.5345"
        y2="11.6034"
        stroke="#6E6058"
        strokeLinecap="round"
      />
      <line
        x1="4.25867"
        y1="11.6034"
        x2="2.87936"
        y2="11.6034"
        stroke="#6E6058"
        strokeLinecap="round"
      />
      <line
        x1="11.6034"
        y1="19.5344"
        x2="11.6034"
        y2="20.9137"
        stroke="#6E6058"
        strokeLinecap="round"
      />
      <circle cx="5.94831" cy="5.94831" r="0.396552" fill="#6E6058" />
      <circle cx="17.8448" cy="5.94831" r="0.396552" fill="#6E6058" />
      <circle cx="17.8448" cy="17.8448" r="0.396552" fill="#6E6058" />
      <circle cx="5.94831" cy="17.8448" r="0.396552" fill="#6E6058" />
    </svg>
  );
}
