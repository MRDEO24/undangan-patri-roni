import bgRusticWeddingBloom from '../../../assets/rusticWeddingBloom/rustic-wedding-background.webp';
import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  ModalCloseButton,
  List,
  // ListItem,
  Text,
} from '@chakra-ui/react';
import MotionImageLeftFlower from '../../../components/motion/motionImageLeftFlower';
import MotionImageRightFlower from '../../../components/motion/motionImageRightFlower';

import Hero from '../../../components/templates/rusticWeddingBloom/editableView/hero';
import CoupleDetail from '../../../components/templates/rusticWeddingBloom/editableView/coupleDetail';
import DetailEvent from '../../../components/templates/rusticWeddingBloom/editableView/detailEvent';
import FeatureInvitation from '../../../components/templates/rusticWeddingBloom/editableView/featureInvitation';
import LoveStory from '../../../components/templates/rusticWeddingBloom/editableView/loveStory';
import OurMoment from '../../../components/templates/rusticWeddingBloom/editableView/ourMoment';
import WeddingGift from '../../../components/templates/rusticWeddingBloom/editableView/weddingGift';
import Covid from '../../../components/templates/rusticWeddingBloom/editableView/covid';
import EndingQuote from '../../../components/templates/rusticWeddingBloom/editableView/endingQuote';
import RsvpAndWishes from '../../../components/templates/rusticWeddingBloom/editableView/rsvpAndWishes';
import { MdOutlineWindow } from 'react-icons/md';
import { SiApplemusic } from 'react-icons/si';
import { useRef, useState } from 'react';
import { useFeatureStore } from '../../../stores/editableView';
import { FaShareFromSquare, FaMagnifyingGlass } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useTemplate } from '../../../hooks/useTemplate';
import Footer from '../../../components/templates/rusticWeddingBloom/editableView/footer';
import { pathImageToUrl } from '../../../utils/url';

function EditInvitation({ weddingAt, musicsData }) {
  const coupleDetailRef = useRef(null);
  const navigate = useNavigate();
  const scrollToCoupleDetail = () => {
    if (coupleDetailRef.current) {
      coupleDetailRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [
    showInstagramFilter,
    showLiveStreaming,
    linkInstagramFilter,
    linkLiveStreaming,
    detailInstagramFilter,
    detailLiveStreaming,
    setInstagramFilterDetail,
    setLiveStreamingDetail,
    setInstagramFilterLink,
    setLiveStreamingLink,
    setInstagramFilterShow,
    setLiveStreamingShow,
  ] = useFeatureStore((state) => [
    state.showInstagramFilter,
    state.showLiveStreaming,
    state.linkInstagramFilter,
    state.linkLiveStreaming,
    state.detailInstagramFilter,
    state.detailLiveStreaming,
    state.setInstagramFilterDetail,
    state.setLiveStreamingDetail,
    state.setInstagramFilterLink,
    state.setLiveStreamingLink,
    state.setInstagramFilterShow,
    state.setLiveStreamingShow,
  ]);
  const { isOpen, onClose } = useDisclosure();
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const toggleMusicModal = () => {
    setIsMusicOpen(!isMusicOpen);
  };
  const {
    isOpen: isLiveModalOpen,
    onOpen: onLiveModalOpen,
    onClose: onLiveModalClose,
  } = useDisclosure();

  const {
    isOpen: isFilterModalOpen,
    onOpen: onFilterModalOpen,
    onClose: onFilterModalClose,
  } = useDisclosure();

  const ActionButtons = () => {
    const { template } = useTemplate();

    return (
      <Box display="flex" justifyContent="end" position="relative" zIndex={2}>
        <Box position="fixed" mt="calc(var(--height-phone) - 70px)" mr="5px">
          <Menu closeOnSelect={false}>
            <MenuButton as={Box} cursor="pointer">
              <IconButton
                shadow="sm"
                icon={<MdOutlineWindow />}
                rounded="full"
                variant="rusticWeddingBloom"
                size="lg"
              />
            </MenuButton>
            <MenuList minWidth='240px' backgroundColor="transparent" border="none" shadow="none" padding={0} alignItems="end" display="flex" flexDir="column" gap="5px">
              <MenuItemOption value='asc' bgColor="transparent" padding={0}>
                <Button
                  rightIcon={<FaShareFromSquare />}
                  rounded="full"
                  float="right"
                  variant="rusticWeddingBloom"
                  size="sm"
                >
                  Simpan Undangan
                </Button>
              </MenuItemOption>
              <MenuItemOption value='desc' bgColor="transparent" padding={0}>
                <Button
                  rightIcon={<FaMagnifyingGlass />}
                  rounded="full"
                  float="right"
                  variant="rusticWeddingBloom"
                  size="sm"
                  onClick={() => navigate(`/templates/${template.path}/create-preview`)}
                >
                  Preview Undangan
                </Button>
              </MenuItemOption>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    );
  };

  const MusicModal = ({ isOpen, onClose, musicList }) => {
    const [audio, setAudio] = useState(null);
    const [currentAudioUrl, setCurrentAudioUrl] = useState('');

    const playAudio = (url) => {
      if (currentAudioUrl === url && audio) {
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
      } else {
        if (audio) {
          audio.pause();
        }
        const newAudio = new Audio(url);
        newAudio.play();
        setAudio(newAudio);
        setCurrentAudioUrl(url);
      }
    };

    const isPlaying = (url) => {
      return currentAudioUrl === url && audio && !audio.paused;
    };
    console.log(musicList);
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Music List</ModalHeader>
          <ModalCloseButton onClick={() => {
            if (audio) {
              audio.pause();
              audio.currentTime = 0;
            }
            onClose();
          }} />
          <ModalBody>
            <List spacing={3}>
              {musicList.map((music, index) => (
                <Box
                  key={index}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={3}
                  cursor="pointer"
                  borderColor={isPlaying(pathImageToUrl(music.file.url)) ? 'blue.500' : 'gray.200'}
                  _hover={{ borderColor: 'blue.500' }}
                  // onClick={() => playAudio(pathImageToUrl(music.file.url))}
                >
                  <Text fontWeight="bold">{music.title}</Text>
                  <Text>{music.artist}</Text>
                  {isPlaying(pathImageToUrl(music.file.url)) ? (
                    <Button size="sm" onClick={() => playAudio(pathImageToUrl(music.file.url))}>
                      Pause
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => playAudio(pathImageToUrl(music.file.url))}>
                      Play
                    </Button>
                  )}
                </Box>
              ))}
            </List>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={() => {
              if (audio) {
                audio.pause();
                audio.currentTime = 0;
              }
              onClose();
            }}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <Box
      bgImage={bgRusticWeddingBloom}
      bgSize="contain"
      position="relative"
      overflowX="hidden"
      p="0.5rem"
    >
      <ActionButtons />
      <br />
      <br />
      <br />
      <Box display="flex" justifyContent="end" position="relative" zIndex={2}>
        <Box position="fixed" mt="calc(var(--height-phone) - 100px)" mr="5px">
          <IconButton
            onClick={toggleMusicModal}
            shadow="sm"
            icon={<SiApplemusic />}
            rounded="full"
            variant="rusticWeddingBloom"
            size="lg"
          />
        </Box>
      </Box>
      <MusicModal isOpen={isMusicOpen} onClose={toggleMusicModal} musicList={musicsData.data} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Refresh</ModalHeader>
          <ModalBody>
            Data akan hilang jika direfresh. Apakah Anda yakin?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={() => window.location.reload()}>
              Ya
            </Button>
            <Button ml={3} onClick={onClose}>
              Tidak
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <MotionImageLeftFlower />
      <MotionImageRightFlower />
      <Hero weddingAt={weddingAt} scroll={scrollToCoupleDetail} />
      <CoupleDetail coupleDetailRef={coupleDetailRef} />
      <DetailEvent />

      <FeatureInvitation
        heading="Live Streaming"
        text={detailLiveStreaming}
        buttonLink={linkLiveStreaming}
        buttonLabel="Tonton Sekarang"
        isLiveStreaming
        show={showLiveStreaming}
        set={setLiveStreamingDetail}
        toggle={setLiveStreamingShow}
        isOpen={isLiveModalOpen}
        onClose={onLiveModalClose}
        onOpen={onLiveModalOpen}
        setLink={setLiveStreamingLink}
      />

      <FeatureInvitation
        heading="Filter Instagram"
        text={detailInstagramFilter}
        buttonLink={linkInstagramFilter}
        buttonLabel="Buka Filter IG"
        show={showInstagramFilter}
        set={setInstagramFilterDetail}
        toggle={setInstagramFilterShow}
        isOpen={isFilterModalOpen}
        onClose={onFilterModalClose}
        onOpen={onFilterModalOpen}
        setLink={setInstagramFilterLink}
      />
      <LoveStory />
      <OurMoment />
      <WeddingGift />
      <RsvpAndWishes />
      <Covid />
      <EndingQuote />
      <Footer />
    </Box>
  );
}

export default EditInvitation;
