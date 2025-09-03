import { useState } from 'react';
import FsLightbox from 'fslightbox-react';
import { Box, Button, Image } from '@chakra-ui/react';
import { RiDeleteBinLine } from 'react-icons/ri';
import MotionBox from '../../../../motion/motionBox';
import { AnimatePresence } from 'framer-motion';
import { useMomentStore } from '../../../../../stores/editableView';

export default function ImageGallery({
  imgArray,
  columnWidth = 230,
  gapSize = 24,
}) {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  const [hoveredImageId, setHoveredImageId] = useState(null);
  const removeImage = useMomentStore((state) => state.removeImage);
  const imgElementArray = imgArray.map((item, index) => (
    <AnimatePresence key={item.id}>
      <MotionBox
        style={{ marginBottom: `${gapSize}px` }}
        key={index}
        position="relative"
        margin={0}
        onMouseEnter={() => setHoveredImageId(index)}
        onMouseLeave={() => setHoveredImageId(null)}
        initial={{ opacity: 0 }} // <-- Add this line
        animate={{ opacity: 1 }} // <-- Add this line
        exit={{ opacity: 0 }} // <-- Add this line
        transition={{ duration: 0.5 }} // <-- Add this line
      >
        <Image
          alt={item.alt}
          src={item.data}
          rounded="lg"
          display="block"
          width="100%"
          cursor="pointer"
        />
        {hoveredImageId === index && ( // <-- Only show overlay if this image is hovered
          <Box
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            bg="rgba(217,217,217,0.6)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="lg"
          >
            <Button
              size="xs"
              height="2rem"
              bg="#503C31"
              leftIcon={<RiDeleteBinLine />}
              variant="rusticWeddingBloom"
              aria-label="Edit"
              onClick={() => removeImage(item.id)}
            >
              Hapus Moment
            </Button>
          </Box>
        )}
      </MotionBox>
    </AnimatePresence>
  ));

  function openLightboxOnSlide(number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    });
  }

  return (
    <Box
      className="codesweetly-rigg-imgs-container"
      style={{ columnWidth: `${columnWidth}px`, columnGap: `${gapSize}px` }}
    >
      {imgElementArray}
      <FsLightbox
        toggler={lightboxController.toggler}
        slide={lightboxController.slide}
        sources={imgArray.map((item) => item.src)}
      />
    </Box>
  );
}
