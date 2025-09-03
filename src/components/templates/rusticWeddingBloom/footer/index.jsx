import { Box, Center, Image, Text } from '@chakra-ui/react';
import Barcode from '../../../../assets/passPort/barcode.png';
import PaperParty from '../../../../assets/paper_party.png';


import { useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const extractedPart = pathParts[pathParts.length -  1];
  return (
    <>
    
  <Center mt="2rem">
    <Image

      src={Barcode}
      alt='Dan Abramov'
    />
  </Center>
    <Box my="3rem" pt="3rem">
    
  <Center mb="2rem">
    <Text fontFamily="PoppinsBold" align="center">
    Design undangan <br></br> Create with love by 
    </Text>
    
  </Center>
  <Center>
    <Image
      borderRadius='full'
      boxSize='5rem'
      src={PaperParty}
      alt='Dan Abramov'
    />
  </Center>
  
</Box>
    </>
  );
}
