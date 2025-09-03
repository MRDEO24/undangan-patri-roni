import {
  useBrideStore,
  useCovidStore,
  useEndingQuoteStore,
  useEventStore,
  useFeatureStore,
  useGiftStore,
  useGreetingsStore,
  useGroomStore,
  useHeroStore,
  useLoveStoryStore,
  useMomentStore,
  useWishStore,
} from '../stores/editableView';

export const prepareWeddingCreate = async (templateId) => {
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
  let loveStoryNew = [];
  loveStoryStore.love_stories.map((loveStory) => {
    loveStoryNew.push({ ...loveStory, image: { formats: { small: { url: loveStory.image } } } });
  })
  let eventNew = eventStore.events.map((event) => {
    const { id, ...newEvent } = event;
    return newEvent;
  });
  let heroImage = { formats: { small: { url: heroStore.imageHero } } };
  let groomImage = { formats: { small: { url: groomStore.groomPhoto } } };
  let brideImage = { formats: { small: { url: brideStore.bridePhoto } } };
  let momentNew = [];
  momentStore.images.map((momentImage) => {
    momentNew.push(momentImage.data);
  })

  let giftNew = giftStore.wedding_banks.map((e) => {
    const { id, ...newGift } = e;
    return newGift;
  });


  try {
    let data = {
      template_id: templateId,
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
        videos: momentStore.videos || [''],
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