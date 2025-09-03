import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Cropper from 'react-easy-crop';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import getCroppedImg from './cropped';
import { useState, useRef } from 'react';

function ImageCropperModal({ fileInputRef, setImageFunc, aspect, shape, id }) {
  //? Image Cropper
  const cropperRef = useRef();
  const toast = useToast();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const {
    isOpen: isImgOpen,
    onOpen: onImgOpen,
    onClose: onImgClose,
  } = useDisclosure();
  const [image, setImage] = useState(null);
  const [imgHeight, setImgHeight] = useState('');
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const handleModalClose = async () => {
    // Get the current cropper instance
    const cropper = cropperRef.current;

    if (cropper) {
      // Get the cropped image
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);

      // Set the cropped image to the state
      if (id) {
        setImageFunc(id, croppedImage);
      } else {
        setImageFunc(croppedImage);
      }
    }

    // Close the modal
    onImgClose();
  };

  return (
    <>
      <Input
        ref={fileInputRef}
        type="file"
        display="none"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            if (file.size > 2 * 1024 * 1024) {
              toast({
                title: 'Ukuran file melebihi batas.',
                description: 'Ukuran file tidak boleh melebihi 2MB.',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
            } else if (
              file.type !== 'image/jpeg' &&
              file.type !== 'image/png' &&
              file.type !== 'image/webp'
            ) {
              toast({
                title: 'Format gambar tidak didukung',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
            } else {
              const reader = new FileReader();
              reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                  setImgHeight(img.height);
                  setImage(reader.result);
                  onImgOpen();
                };
              };
              reader.readAsDataURL(file);
            }
          } else {
            return null;
          }
          e.target.value = null;
        }}
      />
      <Modal
        isOpen={isImgOpen}
        onClose={onImgClose}
        blockScrollOnMount={true}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text variant="rusticWeddingBloomText">
              Crop gambar sesuai keinginan
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box position="relative" h="300">
              <Cropper
                ref={cropperRef}
                cropShape={shape}
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                onMediaLoaded={(mediaSize) => {
                  // Adapt zoom based on media size to fit max height
                  setZoom(imgHeight / mediaSize.naturalHeight);
                }}
                style={{ position: 'relative' }}
              />
              <Button
                variant="rusticWeddingBloom"
                position="absolute"
                top="0.5rem"
                right="0.5rem"
                onClick={handleModalClose}
              >
                Simpan
              </Button>
            </Box>
            <Box mt="2">
              <Slider
                colorScheme="passPort"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(e)}
              >
                <SliderTrack>
                  <Box position="relative" right={10} />
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb boxSize={8}>
                  <FaMagnifyingGlass />
                </SliderThumb>
              </Slider>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageCropperModal;
