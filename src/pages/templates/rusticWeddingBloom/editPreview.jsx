import { useState, useEffect, useRef } from 'react';
import useScreenContext from '../../../hooks/useScreenContext';
import { Box, Spinner, AbsoluteCenter, IconButton, Badge } from '@chakra-ui/react';
import { screenPhoneHeight } from '../../../customTheme';
import Opening from './opening';
import Invitation from './invitation';
import ProvidersTemplate from '../../../components/providersTemplate';
import { useQuery } from '@tanstack/react-query';
import { useWeddingPreviewStore } from '../../../stores/weddingPreview';
import { useShallow } from 'zustand/react/shallow';
import { pathImageToUrl } from '../../../utils/url';
import { MdOutlineMusicNote, MdOutlineMusicOff } from 'react-icons/md';
import { prepareWeddingCreate } from '../../../utils/prepareWeddingCreate';

function TemplateMusic(music, isOpened) {
  const { file: { url, mime } } = music;
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
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
    if (isOpened) {
      setIsPlaying(true);
      audioRef.current.play();
    }
  }, [isOpened]);

  return (
    <>
      <audio ref={audioRef}>
        <source src={pathImageToUrl(url)} type={mime || 'audio / mpeg'} />
      </audio>
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
    </>
  );
}

function EditCreatePreview() {
  const [setData] = useWeddingPreviewStore(
    useShallow((state) => {
      return [state.setData];
    }),
  );
  const { isLoading, data } = useQuery(
    ['template-create-preview'],
    prepareWeddingCreate,
    {
      onSuccess: (data) => setData(data),
    },
  );

  // TODO: need integrate with preview create data
  const welcomeEnabled = true;

  const [isOpened, setIsOpened] = useState(false);
  const isMobile = useScreenContext((s) => s.isMobile);

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

  return (
    <Box
      maxH={isOpened ? undefined : isMobile ? '100vh' : screenPhoneHeight}
      overflow={isOpened ? undefined : 'hidden'}
      position="relative"
    >
      <Box display="flex" justifyContent="center">
        <Badge
          bgColor="white"
          opacity={0.8}
          variant='outline'
          fontSize="medium"
          colorScheme="passPort"
          position="fixed"
          mt="5.5vh"
          zIndex={3}
        >
          Dalam Mode Preview
        </Badge>
      </Box>
      {welcomeEnabled && (
        <Opening
          openInvitation={() => !isOpened && setIsOpened(!isOpened)}
          wedding={data}
        />
      )}
      {/* TODO: uncomment when music has available in data wedding create */}
      {false && <TemplateMusic isOpened={isOpened} music={data.music} />}
      <Invitation />
    </Box>
  );
}

function PageRusticWeddingBloomEditPreview() {
  return (
    <ProvidersTemplate>
      <EditCreatePreview />
    </ProvidersTemplate>
  );
}

export default PageRusticWeddingBloomEditPreview;
