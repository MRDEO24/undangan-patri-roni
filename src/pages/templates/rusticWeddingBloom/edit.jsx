import { useState, useEffect } from 'react';
import useScreenContext from '../../../hooks/useScreenContext';
import { Box, Spinner, AbsoluteCenter } from '@chakra-ui/react';
import { screenPhoneHeight } from '../../../customTheme';
import ProvidersTemplate from '../../../components/providersTemplate';
import EditInvitation from './editInvitation';
import { useQuery } from '@tanstack/react-query';
import { getMusics } from '../../../data/music';

function Template() {
  const [isOpened] = useState(true);
  const isMobile = useScreenContext((s) => s.isMobile);
  const weddingAt = '2024-01-20T15:54:56.679Z';
  const { data: musicsData, isLoading: isLoadingMusic } = useQuery(['musics'], getMusics);
  useEffect(() => {
    if (!isOpened) {
      window.scrollTo({
        top: 0,
      });
    }
  }, [isOpened]);

  if (isLoadingMusic) {
    return (
      <Box position='relative' h='100vh'>
        <AbsoluteCenter p='4' color='white' axis='both'>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='yellow.500'
            size='xl'
          />
        </AbsoluteCenter>
      </Box>
    );
  }

  return (
    <Box
      maxH={isOpened ? undefined : isMobile ? '100vh' : screenPhoneHeight}
      overflow={isOpened ? undefined : 'hidden'}
      position="relative"
    >
      {/* <Opening
        weddingAt={weddingAt}
        openInvitation={() => !isOpened && setIsOpened(!isOpened)}
        isEdit = {true}
      /> */}

      <EditInvitation
        weddingAt={weddingAt}
        musicsData={musicsData}
      />
    </Box>
  );
}

function PageRusticWeddingBloomEdit() {
  return (
    <ProvidersTemplate>
      <Template />
    </ProvidersTemplate>
  );
}

export default PageRusticWeddingBloomEdit;
