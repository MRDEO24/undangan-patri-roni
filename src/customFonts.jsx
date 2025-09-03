import { Global } from '@emotion/react';
import { PROD } from './utils/env';

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'MolgakClassy';
        font-style: normal;
        font-display: swap;
        src: url('${PROD ? '' : '/public'}/rusticWeddingBloom/MolgakClassy-Regular.woff2') format('woff2');
      }
      @font-face {
        font-family: 'PoppinsRegular';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('${PROD ? '' : '/public'}/rusticWeddingBloom/Poppins-Regular.ttf') format('woff2');
      }
      @font-face {
        font-family: 'PoppinsSemibold';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('${PROD ? '' : '/public'}/rusticWeddingBloom/Poppins-SemiBold.ttf') format('woff2');
      }
      @font-face {
        font-family: 'PoppinsBold';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('${PROD ? '' : '/public'}/rusticWeddingBloom/Poppins-Bold.ttf') format('woff2');
      }
      @font-face {
        font-family: 'RoyalWedding';
        font-style: normal;
        font-display: swap;
        src: url('${PROD ? '' : '/public'}/rusticWeddingBloom/RoyalWedding-Regular.woff2') format('woff2');
      }
    `}
  />
);

export default Fonts;
