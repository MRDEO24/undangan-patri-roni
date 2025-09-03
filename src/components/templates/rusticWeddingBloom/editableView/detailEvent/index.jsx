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
  Image,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalFooter,
  Text,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightElement,
  Switch,
} from '@chakra-ui/react';
import ButtonMaps from '../buttonMaps';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  fadeInRight,
  fadeInTopToBottom,
  mainBox,
  scaleUp,
} from '../../../../../utils/animation';
import MotionBox from '../../../../motion/motionBox';
import MotionHeading from '../../../../motion/motionHeading/motionHeading';
import MotionText from '../../../../motion/motionText';
import EditableControls from '../../../../editButton';
import IconEdit from '../../../../iconEdit';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ImageCropperModal from '../../../../imageCropper';
import { FaPlus } from 'react-icons/fa6';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../../../../assets/leaflet.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useEventStore } from '../../../../../stores/editableView';
import { IoIosClose } from 'react-icons/io';

const MotionFlex = motion(Flex);

function Events({
  id,
  date_at,
  location_title,
  location_detail,
  name,
  location_latitude,
  location_longitude,
  location_link,
  image,
  time_at,
  add,
  hapus,
}) {
  const {
    updateDateAt,
    updateImage,
    updateLocationDetail,
    updateLocationLatitude,
    updateLocationLongitude,
    updateLocationLink,
    updateLocationTitle,
    updateName,
    updateTimeAt,
  } = useEventStore();
  const imageRef = useRef();
  const detailRef = useRef(null);
  const isInView = useInView(detailRef, { once: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mainControls = useAnimation();
  const [position, setPosition] = useState([
    location_latitude,
    location_longitude,
  ]);

  const markerRef = useRef();
  const mapLinkRef = useRef();
  const { events } = useEventStore();

  function SearchControl({ id }) {
    const map = useMap();
    const { updateLocationLatitude, updateLocationLongitude } = useEventStore();
    const provider = new OpenStreetMapProvider();

    useEffect(() => {
      const searchControl = new GeoSearchControl({
        provider: provider,
        showMarker: true,
        marker: markerRef.current,
        autoClose: true,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: true,
        draggable: true,
      });

      map.addControl(searchControl);

      map.on('geosearch/showlocation', (result) => {
        const newPosition = [result.location.y, result.location.x];
        markerRef.current.setLatLng(newPosition);
        setPosition(newPosition);
        updateLocationLatitude(id, newPosition[0]);
        updateLocationLongitude(id, newPosition[1]);
      });

      return () => {
        map.removeControl(searchControl);
      };
    }, []);

    return null;
  }

  useEffect(() => {
    if (isInView) {
      mainControls.start('animate');
    }
  });

  const [eventDate, seteventDate] = useState(date_at);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const toggleDatePicker = (e) => {
    e.preventDefault();
    setShowDatePicker(!showDatePicker);
  };

  const handleChangeDate = (e) => {
    setShowDatePicker(!showDatePicker);
    seteventDate(e);
    updateDateAt(id, e);
  };

  const handleClear = (id) => {
    updateLocationLink(id, '');
  };

  const handleToggleMap = (id) => {
    if (!showMap) {
      setShowMap(true);
      handleClear(id);
    } else {
      setShowMap(false);
      handleClear(id);
    }
  };

  return (
    <MotionBox
      mb="1.5rem"
      p="2rem"
      borderRadius="1.5rem"
      bg="bgWhiteOp80.50"
      variants={mainBox}
      initial="initial"
      animate={mainControls}
    >
      <Flex position="absolute" top="-3.5" right="3">
        <Button
          leftIcon={<FaPlus />}
          colorScheme="passPort"
          fontSize="0.7rem"
          borderRadius="md"
          variant="rusticWeddingBloom"
          onClick={add}
          size="sm"
          mr="1"
        >
          <Text mt="1">Tambah Acara</Text>
        </Button>
        <IconButton
          hidden={events.length <= 1 ? true : false}
          bg="#503C31"
          icon={<RiDeleteBinLine />}
          colorScheme="passPort"
          fontSize="0.7rem"
          borderRadius="md"
          variant="rusticWeddingBloom"
          onClick={() => {
            hapus(id);
          }}
          size="sm"
        />
      </Flex>
      <Flex justify="center">
        <Image
          borderRadius="full"
          boxSize="80px"
          src={
            image ||
            'https://cdn.imweb.me/upload/S201904265cc294845b98d/d326487b83a64.jpg'
          }
        />

        <IconButton
          ml="5rem"
          mt="3rem"
          position="absolute"
          isRound
          colorScheme="passPort"
          opacity="1"
          size="sm"
          onClick={() => imageRef.current.click()}
          aria-label="Edit instagram"
          icon={<IconEdit />}
        />
        <ImageCropperModal
          fileInputRef={imageRef}
          setImageFunc={updateImage}
          id={id}
          aspect={1}
          shape="round"
        />
      </Flex>
      <MotionHeading
        variants={fadeInTopToBottom}
        textAlign="center"
        variant="rusticWeddingBloomMolgakClassy"
color="passPort.500"
        my="1.5rem"
      >
        <Editable as="span" value={name}>
          <EditableControls />
          <EditablePreview />
          <EditableInput
            _focusVisible={{
              boxShadow: 'none',
            }}
            onChange={(e) => updateName(id, e.target.value)}
          />
        </Editable>
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
            {moment(eventDate).locale('id').format('dddd')}
          </Text>
        </Box>
        <Box w="15vw">
          <Flex position="absolute" top="-0.8rem" right="45%">
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
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  right: '-425%',
                }}
              >
                <DatePicker
                  selected={eventDate}
                  onChange={handleChangeDate}
                  popperPlacement="top"
                  minDate={new Date()}
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
          <Text textAlign="center" fontFamily="PoppinsSemibold" fontSize="2rem">
            {moment(eventDate).locale('id').format('DD')}
          </Text>
          <Text textAlign="center" fontFamily="PoppinsRegular" fontSize="1rem">
            {moment(eventDate).locale('id').format('YYYY')}
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
            {moment(eventDate).locale('id').format('MMMM')}
          </Text>
        </Box>
      </MotionFlex>

      <Flex gap="0.5rem" justifyContent="center" my="2rem" alignItems="center">
        <IconClock />
        <Heading as="h5" size="md" fontFamily="PoppinsBold">
          <Editable as="span" value={time_at}>
            <EditableControls />
            <EditablePreview />
            <EditableInput
              w="10rem"
              _focusVisible={{
                boxShadow: 'none',
              }}
              onChange={(e) => updateTimeAt(id, e.target.value)}
            />
          </Editable>
        </Heading>
      </Flex>
      <MotionHeading
        variants={fadeInRight}
        color="passPort.500"
        textAlign="center"
        size="lg"
        fontFamily="PoppinsRegular"
        mb="1rem"
      >
        Lokasi Acara
      </MotionHeading>
      <MotionHeading
        variants={fadeInRight}
        textAlign="center"
        as="h5"
        size="md"
        fontFamily="PoppinsSemibold"
      >
        <Editable as="span" value={location_title}>
          <EditableControls />
          <EditablePreview />
          <EditableInput
            _focusVisible={{
              boxShadow: 'none',
            }}
            onChange={(e) => updateLocationTitle(id, e.target.value)}
          />
        </Editable>
      </MotionHeading>
      <MotionText
        variants={fadeInRight}
        textAlign="center"
        fontFamily="PoppinsRegular"
        textTransform="capitalize"
      >
        <Editable as="span" value={location_detail}>
          <EditableControls />
          <EditablePreview />
          <EditableTextarea
            p="0"
            h="5.5rem"
            _focusVisible={{
              boxShadow: 'none',
            }}
            onChange={(e) => updateLocationDetail(id, e.target.value)}
          />
        </Editable>
      </MotionText>
      <Flex justify="center">
        <ButtonMaps
          latitude={location_latitude}
          longitude={location_longitude}
          link={location_link}
          animate={scaleUp}
        />
        <IconButton
          ml="11rem"
          mt="1rem"
          position="absolute"
          isRound
          colorScheme="passPort"
          opacity="0.5"
          size="xs"
          onClick={onOpen}
          aria-label="Edit instagram"
          icon={<IconEdit />}
        />
        <Modal
          onClose={onClose}
          isOpen={isOpen}
          initialFocusRef={mapLinkRef}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent mx="3" bg="gray.100" borderRadius="20">
            <ModalHeader>
              <Text variant="rusticWeddingBloomText">
                Tentukan Lokasi Acara
              </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {!showMap ? (
                <InputGroup size="md" mb="3">
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
                    ref={mapLinkRef}
                    value={location_link}
                    onChange={(e) => {
                      updateLocationLink(id, e.target.value);
                    }}
                    fontFamily="PoppinsRegular"
                    placeholder="https://"
                    bg="white"
                    borderRightRadius="20"
                  />
                  {location_link && (
                    <InputRightElement>
                      <IconButton
                        aria-label="Clear input"
                        icon={<IoIosClose />}
                        onClick={() => {
                          handleClear(id);
                        }}
                        variant="ghost"
                        size="sm"
                      />
                    </InputRightElement>
                  )}
                </InputGroup>
              ) : (
                <MapContainer
                  style={{ height: '500px', width: '100%' }}
                  center={position}
                  zoom={20}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker
                    position={position}
                    draggable={true}
                    eventHandlers={{
                      dragend: () => {
                        let newPosition = markerRef.current.getLatLng();
                        setPosition([newPosition.lat, newPosition.lng]);
                        updateLocationLatitude(id, newPosition.lat);
                        updateLocationLongitude(id, newPosition.lng);
                      },
                    }}
                    ref={markerRef}
                  />
                  <SearchControl id={id} />
                </MapContainer>
              )}
              <Flex mt="2">
                <Text variant="ruscticWeddingBloomTextSemi" mr="2">
                  Gunakan Map
                </Text>
                <Switch
                  colorScheme="passPort"
                  id="toggle-map-input"
                  isChecked={showMap ? true : false}
                  onChange={() => {
                    handleToggleMap(id);
                  }}
                />
              </Flex>
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
      </Flex>
    </MotionBox>
  );
}

export default function DetailEvent() {
  const { events, addEvent, removeEvent } = useEventStore();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        // Handle error here
      },
    );
  }, []);
  const newEvent = {
    id: Date.now(),
    date_at: Date.now(),
    location_title: 'Rumah Mempelai Pria',
    location_detail: 'Jl. Sudirman no.46',
    name: 'Akad Nikah',
    location_latitude: latitude,
    location_longitude: longitude,
    location_link: '',
    image:
      'https://cdn.imweb.me/upload/S201904265cc294845b98d/d326487b83a64.jpg',
    time_at: 'Pukul 08:00 WIB',
  };
  const handleAddEvent = () => {
    addEvent(newEvent);
  };
  const handleDeleteClick = (e) => {
    removeEvent(e);
  };
  return (
    <Box>
      {events.map((event) => (
        <Events
          key={event.id}
          id={event.id}
          date_at={new Date(event.date_at)}
          location_title={event.location_title}
          location_detail={event.location_detail}
          name={event.name}
          location_latitude={event.location_latitude}
          location_longitude={event.location_longitude}
          location_link={event.location_link}
          image={event.image}
          time_at={event.time_at}
          add={handleAddEvent}
          hapus={handleDeleteClick}
        ></Events>
      ))}
      {/* <button
        onClick={() => {
          console.log(events);
        }}
      >
        Youryl
      </button> */}
    </Box>
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
