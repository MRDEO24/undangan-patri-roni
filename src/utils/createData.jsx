import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from './env';
import {
  useHeroStore,
  useGreetingsStore,
  useGroomStore,
  useBrideStore,
  useEventStore,
  useFeatureStore,
  useLoveStoryStore,
  useMomentStore,
  useGiftStore,
  useWishStore,
  useCovidStore,
  useEndingQuoteStore,
} from '../stores/editableView';
import { uploadFile } from './fileManager';
import { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

export const prepareData = async () => {
  const heroStore = useHeroStore.getState();
  const greetingsStore = useGreetingsStore.getState();
  const groomStore = useGroomStore.getState();
  const eventStore = useEventStore.getState();
  const brideStore = useBrideStore.getState();
  const featureStore = useFeatureStore.getState();
  const loveStoryStore = useLoveStoryStore.getState();
  const momentStore = useMomentStore.getState();
  const giftStore = useGiftStore.getState();
  const wishStore = useWishStore.getState();
  const covidStore = useCovidStore.getState();
  const endingStore = useEndingQuoteStore.getState();

  const names = heroStore.names.split(' & ');
  let loveStoryNew = null;
  let eventNew = eventStore.events.map((event) => {
    const { id, ...newEvent } = event;
    return newEvent;
  });
  let heroImage = null;
  let groomImage = null;
  let brideImage = null;
  let momentNew = null;
  let giftNew = giftStore.wedding_banks.map((e) => {
    const { id, ...newGift } = e;
    return newGift;
  });

  try {
    let data = {
      template_id: '-',
      features: {
        welcome: true,
        hero: true,
        couple_details: true,
        detail_events: true,
        live_streaming: featureStore.showLiveStreaming,
        instagram_filter: featureStore.showInstagramFilter,
        love_story: loveStoryStore.showLove,
        our_moment: momentStore.showMoment,
        wedding_gift: giftStore.showGift,
        rsvp_wishes: wishStore.showWish,
        covid: covidStore.showCovid,
        ending_quote: endingStore.showEnding,
      },
      image: heroImage,
      groom: {
        name: groomStore.name,
        image: groomImage,
        father: groomStore.father,
        mother: groomStore.mother,
        instagram: groomStore.instagram,
        family_tree: groomStore.familyTree,
      },
      bride: {
        name: brideStore.name,
        image: brideImage,
        father: brideStore.father,
        mother: brideStore.mother,
        instagram: brideStore.instagram,
        family_tree: brideStore.familyTree,
      },
      music_id: '2c8d1f7c-e09f-412d-a528-2c36a2c8b131',
      greeting: {
        religion_greeting: greetingsStore.religionGreeting,
        main_greeting: greetingsStore.mainGreeting,
        secondary_greeting: greetingsStore.secondaryGreeting,
      },
      quote_ending: {
        text: endingStore.quoteText,
        title: endingStore.quoteTitle,
      },
      quote_ending_secondary: {
        text: endingStore.quoteText2,
        title: endingStore.quoteTitle2,
      },
      moment: {
        images: momentNew,
        videos: momentStore.videos != '' ? [momentStore.videos] : [],
      },
      
      streaming: {
        link: featureStore.linkLiveStreaming,
        detail: featureStore.detailLiveStreaming,
      },
      filter: {
        link: featureStore.linkInstagramFilter,
        detail: featureStore.detailInstagramFilter,
      },
      wedding_at: heroStore.weddingAt,
      events: eventNew,
      love_stories: loveStoryNew,
      wedding_banks: giftNew,
      title_gift: giftStore.title_gift,
      nickname_first: names[0],
      nickname_last: names[1],
    };

    return data;
  } catch (error) {
    /* handle error */
    console.error(error);
    throw error; // Reject the promise with the error
  }
};

export const uploadFiles = async (
  data,
  heroStore,
  groomStore,
  brideStore,
  eventStore,
  loveStoryStore,
  momentStore,
) => {
  let heroImgPromise = async () => {
    const blobUrl = heroStore.imageHero;
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const file = new File([blob], 'hero.jpeg', { type: 'image/jpeg' });
    const res = await uploadFile({ test: file });
    return res.test.id;
  };

  let groomImgPromise = async () => {
    const blobUrl = groomStore.groomPhoto;
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const file = new File([blob], 'groom.jpeg', { type: 'image/jpeg' });
    const res = await uploadFile({ test: file });
    return res.test.id;
  };

  let brideImgPromise = async () => {
    const blobUrl = brideStore.bridePhoto;
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const file = new File([blob], 'bride.jpeg', { type: 'image/jpeg' });
    const res = await uploadFile({ test: file });
    return res.test.id;
  };

  let eventProm = eventStore.events.map(async (event, index) => {
    const blobUrl = event.image;

    const response = await fetch(blobUrl);
    const blob = await response.blob();

    const file = new File([blob], `event-${index}.jpeg`, {
      type: 'image/jpeg',
    });

    const res = await uploadFile({ test: file });
    let date = new Date(event.date_at);
    const newEvent = {
      ...event,
      date_at: date,
      image: res.test.id, // Use the ID from the response here
    };
    return newEvent;
  });

  let loveProm = loveStoryStore.love_stories.map(async (love, index) => {
    const blobUrl = love.image;
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const file = new File([blob], `loveStory-${index}.jpeg`, {
      type: 'image/jpeg',
    });
    const res = await uploadFile({ test: file });

    const { id, ...newLoveWithoutId } = love;
    const newLove = {
      ...newLoveWithoutId,
      image: res.test.id, // Use the ID from the response here
    };
    return newLove;
  });
  let momentProm = momentStore.images.map(async (moment, index) => {
    const blobUrl = moment.data;
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const file = new File([blob], `moment-${index}.jpeg`, {
      type: 'image/jpeg',
    });

    // Upload the file using your `uploadFile` function
    const res = await uploadFile({ test: file });

    return res.test.id;
  });
  const [
    heroImageId,
    updatedLove,
    updatedEvents,
    updatedMoment,
    groomImageId,
    brideImageId,
  ] = await Promise.all([
    heroImgPromise(),
    Promise.all(loveProm),
    Promise.all(eventProm),
    Promise.all(momentProm),
    groomImgPromise(),
    brideImgPromise(),
  ]);
  data.image = heroImageId;
  data.events = updatedEvents;
  data.love_stories = updatedLove;
  data.moment.images = updatedMoment;
  data.groom.image = groomImageId;
  data.bride.image = brideImageId;
};

export const useWeddingData = () => {
  const [token] = useAuthContext((auth) => [auth.token]);
  const postData = async (data) => {
    const response = await axios.post(API_URL + 'wedding', data, {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const mutation = useMutation(postData, {
    onError: (error) => {
      // Display error message to console
      console.error(error);
      // Or display error message to user in another way
    },
  });

  return mutation;
};

export const SubmitButton = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const heroStore = useHeroStore.getState();
  const groomStore = useGroomStore.getState();
  const brideStore = useBrideStore.getState();
  const eventStore = useEventStore.getState();
  const loveStoryStore = useLoveStoryStore.getState();
  const momentStore = useMomentStore.getState();
  const [data, setData] = useState(null);
  const [dataReady, setDataReady] = useState(false);
  const navigate = useNavigate();
  const mutation = useWeddingData();
  useEffect(() => {
    const heroUnsubscribe = useHeroStore.subscribe(() => handleStoreChange());
    const greetingsUnsubscribe = useGreetingsStore.subscribe(() =>
      handleStoreChange(),
    );
    const groomUnsubscribe = useGroomStore.subscribe(() => handleStoreChange());
    const brideUnsubscribe = useBrideStore.subscribe(() => handleStoreChange());
    const eventUnsubscribe = useEventStore.subscribe(() => handleStoreChange());
    const featureUnsubscribe = useFeatureStore.subscribe(() =>
      handleStoreChange(),
    );
    const loveStoryUnsubscribe = useLoveStoryStore.subscribe(() =>
      handleStoreChange(),
    );
    const momentUnsubscribe = useMomentStore.subscribe(() =>
      handleStoreChange(),
    );
    const giftUnsubscribe = useGiftStore.subscribe(() => handleStoreChange());
    const wishUnsubscribe = useWishStore.subscribe(() => handleStoreChange());
    const covidUnsubscribe = useCovidStore.subscribe(() => handleStoreChange());
    const endingUnsubscribe = useEndingQuoteStore.subscribe(() =>
      handleStoreChange(),
    );

    return () => {
      heroUnsubscribe();
      greetingsUnsubscribe();
      groomUnsubscribe();
      brideUnsubscribe();
      eventUnsubscribe();
      featureUnsubscribe();
      loveStoryUnsubscribe();
      momentUnsubscribe();
      giftUnsubscribe();
      wishUnsubscribe();
      covidUnsubscribe();
      endingUnsubscribe();
    };
  }, []);

  const handleStoreChange = async (heroStore, groomStore, brideStore, eventStore, loveStoryStore, momentStore) => {
    if (!dataReady) {
      const newData = await prepareData(heroStore, groomStore, brideStore, eventStore, loveStoryStore, momentStore);
      setData(newData);
      setDataReady(true);
    }
  };

  const handleClick = async () => {
    setIsSubmitting(true);
    if (data && dataReady) {
      const finalData = await uploadFiles(
        data,
        heroStore,
        groomStore,
        brideStore,
        eventStore,
        loveStoryStore,
        momentStore,
      );
      console.log(data);
      mutation.mutate(data, {
        onSuccess: () => navigate('/templates/me'),
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Button
      leftIcon={<AiOutlineSend />}
      isLoading={isSubmitting}
      loadingText="Harap Tunggu"
      variant="rusticWeddingBloom"
      onClick={handleClick}
      isDisabled={data && dataReady ? false : true}
    >
      Simpan Undangan
    </Button>
  );
};