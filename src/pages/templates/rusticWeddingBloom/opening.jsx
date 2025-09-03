import { useState, useRef } from 'react';
import MotionBox from '../../../components/motion/motionBox';
// import bgRusticWeddingBloom from '../../../assets/passPort/navy-gloom-background.webp';
import bgRusticWeddingBloom from '../../../assets/passPort/pass-port-background.webp';
// import bgRusticWeddingBloom from '../../../assets/pinkPeony/pink-peony-background.webp';
// import bgRusticWeddingBloom from '../../../assets/rusticWeddingBloom/rustic-wedding-background.webp';
import Hero from '../../../components/templates/rusticWeddingBloom/hero';
import EditHero from '../../../components/templates/rusticWeddingBloom/editableView/hero';
import { useLocation } from 'react-router-dom';

function Opening({ weddingAt, openInvitation, isEdit, wedding }) {
  console.log(wedding);
  const [isDisappear, setIsDisappear] = useState(false);
  const ref = useRef();
  const handleOpenInvitation = () => {
    openInvitation();
    setIsDisappear(!isDisappear);
  };

  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const extractedPart = pathParts[pathParts.length -  1];

  return (
    <MotionBox
      initial={{ opacity: 1, y: 0 }}
      ref={ref}
      animate={
        isDisappear
          ? { y: -ref.current.offsetHeight, opacity: 0.9 }
          : { opacity: 1, y: 0 }
      }
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.7, type: 'ease-in' }}
      bgImage={bgRusticWeddingBloom}
      bgSize="cover"
      maxW="100vw"
      position="absolute"
      zIndex="2"
      w="full"
      h="100vh"
      overflowX="hidden"
    >


      {isEdit ? (
        <EditHero
          weddingAt={weddingAt}
          isOpening={true}
          openInvitation={handleOpenInvitation}
        />
      ) : (
        <Hero
          isOpening={true}
          openInvitation={handleOpenInvitation}
          weddingAt={wedding?.wedding_at}
          imageUrl={wedding?.image?.formats.small.url}
          nicknameFirst={wedding?.nickname_first}
          nicknameLast={wedding?.nickname_last}
        />
      )}
    </MotionBox>
  );
}

export default Opening;
