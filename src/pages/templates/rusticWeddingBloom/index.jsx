import { useState, useEffect, useMemo, useRef } from 'react';
import useScreenContext from '../../../hooks/useScreenContext';
import { Box, Spinner, AbsoluteCenter, IconButton } from '@chakra-ui/react';
import { screenPhoneHeight } from '../../../customTheme';
import Opening from './opening';
import Invitation from './invitation';
import ProvidersTemplate from '../../../components/providersTemplate';
import { getWeddingPreview } from '../../../data/weddingPreview';
import { useQuery } from '@tanstack/react-query';
import { useWeddingPreviewStore } from '../../../stores/weddingPreview';
import { useShallow } from 'zustand/react/shallow';
import { Templates } from '../../../constants/templates';
import { findTemplates } from '../../../data/templates';
import { useLocation,useParams  } from 'react-router-dom';
import { pathImageToUrl } from '../../../utils/url';
import { useWeddingStore } from '../../../stores/wedding';
import { MdOutlineMusicNote, MdOutlineMusicOff } from 'react-icons/md';
import { useTemplate } from '../../../hooks/useTemplate';
import { getWeddingBasedUrl } from '../../../data/wedding';

function Template() {
  const { pathname } = useLocation();
  const { template } = useTemplate();

  const { dataWedding } = useWeddingStore(
    useShallow((state) => ({ dataWedding: state.data })),
  );
  const { data } = useQuery(
    [
      'templates-find',
      Templates.map((template) => template.uuid),
    ],
    findTemplates,
  );
  const previewUUID = pathname.includes('/templates/') && data?.data?.find(({ uuid }) => template.uuid === uuid)?.previews?.[0];
  const { data: dataWeddingPreview, isLoading: isLoadingWeddingPreview } = useQuery(
    [
      'weddingPreview',
      previewUUID,
    ],
    getWeddingPreview,
    {
      enabled: !!previewUUID,
    },
  );
  const wedding = dataWeddingPreview?.data ?? dataWedding;

  const welcomeEnabled = useMemo(() =>
    pathname.includes('/wedding/')
      ? dataWedding?.features.welcome
      : dataWeddingPreview?.data?.features.welcome,
    [dataWedding?.features.welcome, dataWeddingPreview?.data?.features.welcome, pathname],
  );

  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const isMobile = useScreenContext((s) => s.isMobile);
  const audioRef = useRef();

  const [setData] = useWeddingPreviewStore(
    useShallow((state) => {
      return [state.setData];
    }),
  );

  const playingButton = () => {
    if (isPlaying) {
      setIsPlaying(prevIsPlaying => !prevIsPlaying);
      audioRef.current.pause(); // this will pause the audio
    } else {
      setIsPlaying(prevIsPlaying => !prevIsPlaying);
      audioRef.current.play(); // this will play the audio
    }
  };

  useEffect(() => {
    if (!isOpened) {
      window.scrollTo({
        top: 0,
      });
    }
  }, [isOpened]);

  useEffect(() => {
    if (welcomeEnabled === false) {
      setIsOpened(true);
    }
  }, [welcomeEnabled]);

  if (pathname.includes('/templates/')) {
    if (isLoadingWeddingPreview) {
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
  } else {
    setData(wedding);
  }

  if (!isLoadingWeddingPreview) {
    setData(wedding);
  }

  return (
    <>
    
    <Box
      maxH={isOpened ? undefined : isMobile ? '100vh' : screenPhoneHeight}
      overflow={isOpened ? undefined : 'hidden'}
      position="relative"
    >
      <audio ref={audioRef}>
        <source src={pathImageToUrl(pathname.includes('/wedding/') ? dataWedding?.music.file.url : dataWeddingPreview?.data.music.file.url)} type="audio/mpeg" />
      </audio>
      {welcomeEnabled && (
        <Opening
          openInvitation={() => {
            !isOpened && setIsOpened(!isOpened);
            setIsPlaying(true);
            audioRef.current.play();
          }}
          wedding={pathname.includes('/wedding/') ? dataWedding : dataWeddingPreview.data}
        />
      )}
      <Invitation />
      {isOpened && (
        <IconButton
          position="fixed"
          bottom="20px"
          right={['16px', '84px']}
          isRound
          colorScheme="passPort"
          opacity="1"
          size="lg"
          onClick={playingButton}
          aria-label="Edit instagram"
          icon={isPlaying ? <MdOutlineMusicNote /> : <MdOutlineMusicOff />}
        />
      )}
      
    </Box>
    </>
  );
}

function PageRusticWeddingBloom() {
  const {wedding_url} = useParams();
  const { data: weddingData, isLoading } = useQuery(['weddingData', wedding_url], getWeddingBasedUrl);
  const { setDataWedding } = useWeddingStore(
    useShallow((state) => ({ setDataWedding: state.setData })),
  );
  if (isLoading) {
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

  setDataWedding(weddingData?.data);
  return (
    <ProvidersTemplate>
      <Template />
    </ProvidersTemplate>
  );
}

export default PageRusticWeddingBloom;
