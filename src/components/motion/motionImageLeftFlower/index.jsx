import MotionBox from '../motionBox';
import MotionImage from '../motionImage';
import { animateRightToLeft, animateTopRight } from '../../../utils/animation';
// import ImageTopRight from '../../../assets/passPort/navy-gloom-bloom1.webp';
import ImageTopRight from '../../../assets/passPort/pass-port-bloom1.webp';
// import ImageTopRight from '../../../assets/pinkPeony/pink-peony-bloom1.webp';
// import ImageTopRight from '../../../assets/rusticWeddingBloom/rustic-wedding-bloom1.webp';
import { useLocation } from 'react-router-dom';
export default function MotionImageLeftFlower({opening}) {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const extractedPart = pathParts[pathParts.length -  1];
  return (
    <MotionBox {...animateRightToLeft}>
      <MotionImage {...animateTopRight} src={ImageTopRight} maxW='clamp(7.75rem, 23vh, 11.875rem)' position='absolute' right='-5' top='-5' />
      {/* <MotionImage {...animateTopRight} maxW={{base: '11rem', sm: '11rem', md: '10rem', xl:'14rem'}} src={ImageTopRight} position='absolute' right='-5' top='-5' /> */}
    </MotionBox>
  );
}