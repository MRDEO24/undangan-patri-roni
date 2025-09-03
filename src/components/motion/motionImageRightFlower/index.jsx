import MotionBox from '../motionBox';
import MotionImage from '../motionImage';
// import ImageTopLeft from '../../../assets/passPort/navy-gloom-bloom2.webp';
import ImageTopLeft from '../../../assets/passPort/pass-port-bloom2.webp';
// import ImageTopLeft from '../../../assets/pinkPeony/pink-peony-bloom2.webp';
// import ImageTopLeft from '../../../assets/rusticWeddingBloom/rustic-wedding-bloom2.webp';
import { animateLeftToRight, animateTopLeft } from '../../../utils/animation';
import { useLocation } from 'react-router-dom';
export default function MotionImageRightFlower({opening}) {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const extractedPart = pathParts[pathParts.length -  1];
  return (
    <MotionBox {...animateLeftToRight}>
      <MotionImage {...animateTopLeft} src={ImageTopLeft} maxW='clamp(7.75rem, 23vh, 11.875rem)' position='absolute' left='-5' top='-5' />
    </MotionBox>
  );
}