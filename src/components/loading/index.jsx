import { AbsoluteCenter, Box, Spinner } from '@chakra-ui/react';

export default function Loading() {
  return (
    <><Box position='relative' h='100vh'>
    <AbsoluteCenter p='4' color='white' axis='both'>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='yellow.500'
        size='xl'
      />
    </AbsoluteCenter>
  </Box></>
  );
}
