// import bgRusticWeddingBloom from '../../../assets/rusticWeddingBloom/rustic-wedding-background.webp';
// import bgRusticWeddingBloom from '../../../assets/passPort/navy-gloom-background.webp';
import bgRusticWeddingBloom from '../../../assets/passPort/pass-port-background-2.webp';
// import bgRusticWeddingBloom from '../../../assets/pinkPeony/pink-peony-background.webp';
import { Box } from '@chakra-ui/react';
import MotionImageLeftFlower from '../../../components/motion/motionImageLeftFlower';
import MotionImageRightFlower from '../../../components/motion/motionImageRightFlower';
import Hero from '../../../components/templates/rusticWeddingBloom/hero';
import CoupleDetail from '../../../components/templates/rusticWeddingBloom/coupleDetail';
import DetailEvent from '../../../components/templates/rusticWeddingBloom/detailEvent';
import FeatureInvitation from '../../../components/templates/rusticWeddingBloom/featureInvitation';
import LoveStory from '../../../components/templates/rusticWeddingBloom/loveStory';
import OurMoment from '../../../components/templates/rusticWeddingBloom/ourMoment';
import WeddingGift from '../../../components/templates/rusticWeddingBloom/weddingGift';
import Covid from '../../../components/templates/rusticWeddingBloom/covid';
import EndingQuote from '../../../components/templates/rusticWeddingBloom/endingQuote';
import Footer from '../../../components/templates/rusticWeddingBloom/footer';
import RsvpAndWishes from '../../../components/templates/rusticWeddingBloom/rsvpAndWishes';
import { useRef } from 'react';
import { useWeddingPreviewStore } from '../../../stores/weddingPreview';
import { getImageWithFormat } from '../../../utils/url';
import { useTemplate } from '../../../hooks/useTemplate';
import { useLocation } from 'react-router-dom';
import LocationMap from '../../../components/templates/rusticWeddingBloom/locationMap';

function Invitation() {
  const { pathname } = useLocation();
  const { template } = useTemplate();
  const data = useWeddingPreviewStore((state) => state.data);
  const coupleDetailRef = useRef(null);

  const scrollToCoupleDetail = () => {
    if (coupleDetailRef.current) {
      coupleDetailRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const extractedPart = pathParts[pathParts.length - 1];

  return (
    <>
      <Box
        bgImage={bgRusticWeddingBloom}
        bgSize="contain"
        maxW="100vw"
        position="relative"
        overflowX="hidden"
        p="0.5rem"
      >
        {data?.features.hero && (
          <>
            <MotionImageLeftFlower />
            <MotionImageRightFlower />
            <Hero
              weddingAt={data?.wedding_at}
              imageUrl={
                pathname.includes('/wedding/') ||
                pathname == `/templates/${template.path}`
                  ? getImageWithFormat(data?.image, 'small')
                  : data?.image.formats.small.url
              }
              nicknameFirst={data?.nickname_first}
              nicknameLast={data?.nickname_last}
              scroll={scrollToCoupleDetail}
            />
          </>
        )}
        {data?.features.couple_details && (
          <CoupleDetail
            bride={data?.bride}
            groom={data?.groom}
            greeting={data?.greeting}
            coupleDetailRef={coupleDetailRef}
          />
        )}
        {data?.features.detail_events && <DetailEvent event={data?.events} />}
        {data?.features.maps && <LocationMap image={getImageWithFormat(data?.image_denah, 'large')} title={data?.title_denah} />}

        {data?.features.live_streaming && (
          <FeatureInvitation
            heading="Live Streaming"
            text={data?.streaming.detail}
            buttonLink={data?.streaming.link}
            buttonLabel="Tonton Sekarang"
          />
        )}
        {data?.features.instagram_filter && (
          <FeatureInvitation
            heading="Filter Instagram"
            text="Abadikan momen kami ketika menghadiri acara pernikahan kami dengan menggunakan wedding filter dibawah"
            buttonLabel="Buka Filter IG"
          />
        )}
        {data?.features.love_story && (
          <LoveStory loveStories={data?.love_stories} />
        )}
        {data?.features.our_moment && <OurMoment moment={data?.moment} />}
        {data?.features.wedding_gift && (
          <WeddingGift
            weddingGifts={{
              titleGift: data?.title_gift,
              giftWedding: data?.wedding_banks,
            }}
          />
        )}
        {data?.features.covid && <Covid />}
        {data?.features.ending_quote && (
          <EndingQuote
            endingQuoteData={{
              quote_ending: data?.quote_ending,
              quote_ending_secondary: data?.quote_ending_secondary,
              moment_image: data?.moment?.images,
              nickname_first: data?.nickname_first,
              nickname_last: data?.nickname_last,
            }}
          />
        )}
        {data?.features.rsvp_wishes && (
          <RsvpAndWishes dataWishes={data?.wishes} />
        )}
        <Footer />
      </Box>
    </>
  );
}

export default Invitation;
