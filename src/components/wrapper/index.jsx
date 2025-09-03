import Phone from '../phone';
import { forwardRef } from 'react';
import useScreenContext from '../../hooks/useScreenContext';

const Wrapper = ({ children }, ref) => {
  const isMobile = useScreenContext((s) => s.isMobile);

  if (isMobile) {
    return children;
  }

  return (
    <Phone ref={ref}>
      {children}
    </Phone>
  );
};

const WrapperWithRef = forwardRef(Wrapper);

export default WrapperWithRef;