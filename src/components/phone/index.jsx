import { forwardRef, useEffect } from 'react';
import './index.css';
import { useDraggable } from 'react-use-draggable-scroll';
import { Center } from '@chakra-ui/react';
import { screenPhoneHeight } from '../../customTheme';

// NOTE: source https://github.com/marvelapp/devices.css 
const Phone = ({ children }, ref) => {
  const { events } = useDraggable(ref);

  useEffect(() => {
    document.documentElement.style.setProperty('--height-phone', screenPhoneHeight);
  }, []);

  return (
    <Center height="100vh">
      <div className="marvel-device iphone-x">
        <div className="notch">
          <div className="camera"></div>
          <div className="speaker"></div>
        </div>
        <div className="top-bar"></div>
        <div className="sleep"></div>
        <div className="bottom-bar"></div>
        <div className="volume"></div>
        <div className="overflow">
          <div className="shadow shadow--tr"></div>
          <div className="shadow shadow--tl"></div>
          <div className="shadow shadow--br"></div>
          <div className="shadow shadow--bl"></div>
        </div>
        <div className="inner-shadow"></div>
        <div className="screen" ref={ref} {...events} >
          {children}
        </div>
      </div>
    </Center>
  );
};

const ForwardedRefPhone = forwardRef(Phone);

export default ForwardedRefPhone;