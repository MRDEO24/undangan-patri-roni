import { useState } from 'react';
import FsLightbox from 'fslightbox-react';
import { Box, Image } from '@chakra-ui/react';
import { getImageWithFormat } from '../../../../utils/url';

export default function ImageGallery({
  imgArray,
  columnWidth = 230,
  gapSize = 24,
}) {
  console.log({ imgArray });
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  const imgElementArray = imgArray?.map((item, index) => (
    <Box
      style={{ marginBottom: `${gapSize}px` }}
      key={index}
      position="relative"
      margin={0}
    >
      <Image
        src={getImageWithFormat(item, 'small')}
        onClick={() => openLightboxOnSlide(index + 1)}
        rounded="lg"
        display="block"
        width="100%"
        cursor="pointer"
      />
    </Box>
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
        sources={imgArray?.map((item) => getImageWithFormat(item, 'medium'))}
        types={imgArray?.map(() => 'image')}
      />
    </Box>
  );
}