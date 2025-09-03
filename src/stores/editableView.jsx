import { create } from 'zustand';
import GroomPhoto from '../assets/rusticWeddingBloom/groomRWD.png';
import BridePhoto from '../assets/rusticWeddingBloom/brideRWD.png';
import moment from 'moment';
import { persist } from 'zustand/middleware';
import createStorePersist from '../utils/createStorePersist';
import { WEDDING_CREATE_STORE } from '../constants/weddingCreateStore';

const initialDate = new Date(moment().add('day', 1).toDate());

export const useHeroStore = create(persist(
  (set) => ({
    imageHero: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/d326487b83a64.jpg',
    names: 'Putra & Putri',
    weddingAt: initialDate, // Initial value for weddingAt
    setImageHero: (file) => set({ imageHero: file }),
    setNames: (newNames) => set({ names: newNames }),
    setWeddingAt: (newWeddingAt) => set({ weddingAt: newWeddingAt }),
  }),
  createStorePersist(WEDDING_CREATE_STORE.hero),
));

export const useGreetingsStore = create(persist(
  (set) => ({
    religionGreeting: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم',
    mainGreeting: 'Assalamu’alaikum warahmatullahi wabarakatuh',
    secondaryGreeting:
      'Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan',

    // Buat fungsi untuk mengubah data
    setReligionGreeting: (newValue) => set({ religionGreeting: newValue }),
    setMainGreeting: (newValue) => set({ mainGreeting: newValue }),
    setSecondaryGreeting: (newValue) => set({ secondaryGreeting: newValue }),
  }),
  createStorePersist(WEDDING_CREATE_STORE.greeting),
));

export const useGroomStore = create(persist(
  (set) => ({
    name: 'Putra Andika Seno',
    groomPhoto: GroomPhoto,
    father: 'Parto Judika',
    mother: 'Pretty Yulia',
    instagram: 'andi_kaps',
    familyTree: 'Anak Pertama Dari',

    // Functions to update groom's data
    setName: (newName) => set({ name: newName }),
    setGroomPhoto: (file) => set({ groomPhoto: file }),
    setFather: (newFather) => set({ father: newFather }),
    setMother: (newMother) => set({ mother: newMother }),
    setInstagram: (newInstagram) => set({ instagram: newInstagram }),
    setFamilyTree: (newFamilyTree) => set({ familyTree: newFamilyTree }),
  }),
  createStorePersist(WEDDING_CREATE_STORE.groom),
));

export const useBrideStore = create(persist(
  (set) => ({
    name: 'Putri Cantika Sari',
    image: 20,
    bridePhoto: BridePhoto,
    father: 'Mardi Yudha',
    mother: 'Eliza Rochefort',
    instagram: 'putri_cs',
    familyTree: 'Anak Kedua Dari',

    // Functions to update bride's data
    setName: (newName) => set({ name: newName }),
    setBridePhoto: (file) => set({ bridePhoto: file }),
    setFather: (newFather) => set({ father: newFather }),
    setMother: (newMother) => set({ mother: newMother }),
    setInstagram: (newInstagram) => set({ instagram: newInstagram }),
    setFamilyTree: (newFamilyTree) => set({ familyTree: newFamilyTree }),
  }),
  createStorePersist(WEDDING_CREATE_STORE.bride),
));

export const useEventStore = create(persist(
  (set) => {
    const newEvent = {
      id: initialDate,
      date_at: initialDate,
      location_title: 'Rumah Mempelai Pria',
      location_detail: 'Jl. Sudirman no.46',
      name: 'Akad Nikah',
      location_latitude: 0,
      location_longitude: 0,
      location_link: '',
      image:
        'https://cdn.imweb.me/upload/S201904265cc294845b98d/d326487b83a64.jpg',
      time_at: 'Pukul 08:00 WIB',
    };
    // Check if geolocation is supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Update the newEvent object with the current location
        newEvent.location_latitude = latitude;
        newEvent.location_longitude = longitude;
      });
    }
    return {
      events: [newEvent],
      addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
      removeEvent: (id) =>
        set((state) => ({
          events: state.events.filter((even) => even.id !== id),
        })),
      updateName: (id, name) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, name } : event,
          ),
        })),
      updateDateAt: (id, date_at) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, date_at } : event,
          ),
        })),
      updateLocationTitle: (id, location_title) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, location_title } : event,
          ),
        })),
      updateLocationDetail: (id, location_detail) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, location_detail } : event,
          ),
        })),
      updateLocationLatitude: (id, location_latitude) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, location_latitude } : event,
          ),
        })),
      updateLocationLongitude: (id, location_longitude) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, location_longitude } : event,
          ),
        })),
      updateLocationLink: (id, location_link) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, location_link } : event,
          ),
        })),
      updateImage: (id, image) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, image } : event,
          ),
        })),
      updateTimeAt: (id, time_at) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, time_at } : event,
          ),
        })),
    };
  },
  createStorePersist(WEDDING_CREATE_STORE.event),
));

export const useFeatureStore = create(persist(
  (set) => ({
    showInstagramFilter: true,
    showLiveStreaming: true,
    linkInstagramFilter: 'https://instagram.com/samir',
    linkLiveStreaming: 'https://instagram.com',
    detailInstagramFilter:
      'Abadikan momen kami ketika menghadiri acara pernikahan kami dengan menggunakan wedding filter dibawah',
    detailLiveStreaming:
      'Kami juga berencana untuk mempublikasikan acara akad kami secara virtual melalui live instagram yang bisa anda ikuti melalui link berikut:',

    setInstagramFilterDetail: (newValue) =>
      set({ detailInstagramFilter: newValue }),
    setLiveStreamingDetail: (newValue) => set({ detailLiveStreaming: newValue }),
    setInstagramFilterLink: (newValue) => set({ linkInstagramFilter: newValue }),
    setLiveStreamingLink: (newValue) => set({ linkLiveStreaming: newValue }),
    setInstagramFilterShow: (newValue) => set({ showInstagramFilter: newValue }),
    setLiveStreamingShow: (newValue) => set({ showLiveStreaming: newValue }),
  }),
  createStorePersist(WEDDING_CREATE_STORE.feature),
));

export const useLoveStoryStore = create(persist(
  (set) => ({
    love_stories: [],
    addLoveStory: (loveStory) =>
      set((state) => ({ love_stories: [...state.love_stories, loveStory] })),
    removeLoveStory: (id) =>
      set((state) => ({
        love_stories: state.love_stories.filter((story) => story.id !== id),
      })),
    updateLoveStoryTitle: (id, title) =>
      set((state) => ({
        love_stories: state.love_stories.map((story) =>
          story.id === id ? { ...story, title } : story,
        ),
      })),
    updateLoveStoryDescription: (id, description) =>
      set((state) => ({
        love_stories: state.love_stories.map((story) =>
          story.id === id ? { ...story, description } : story,
        ),
      })),
    updateLoveStoryImage: (id, image) =>
      set((state) => ({
        love_stories: state.love_stories.map((story) =>
          story.id === id
            ? { ...story, image }
            : story,
        ),
      })),
    showLove: true,
    setShowLove: (newValue) => set({ showLove: newValue }),
  }),
  createStorePersist(WEDDING_CREATE_STORE.loveStory),
));

let id = 1;

export const useMomentStore = create(persist(
  (set) => ({
    images: [
      {
        alt: 'Image1s alt text',
        id: 214,
        data: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/f908a110ef855.jpg',
      },
      {
        alt: 'Image2s alt text',
        id: 69,
        data: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/fc0878238538a.jpg',
      },
      {
        alt: 'Image1s alt text',
        id: 24,
        data: 'https://cdn.imweb.me/upload/S201904265cc294845b98d/f908a110ef855.jpg',
      },
    ],
    videos: '',

    addVideo: (link) => set({ videos: link }),
    addImage: (imageData) =>
      set((state) => ({
        images: [
          ...state.images,
          { id: id++, data: imageData, alt: `Moment ${id}` },
        ],
      })),
    removeImage: (id) =>
      set((state) => ({
        images: state.images.filter((image) => image.id !== id),
      })),
    showMoment: true,
    setShowMoment: (newValue) => set({ showMoment: newValue }),
  }),
  createStorePersist(WEDDING_CREATE_STORE.moment),
));

export const useGiftStore = create(persist(
  (set) => {
    const address = {
      id: initialDate,
      gift_title:
        'Bagi Bapak/Ibu/Saudara/i yang ingin memberikan hadiah, silakan dikirim ke alamat berikut :',
      gift_subtitle: 'Putra Andika Seno',
      gift_address: 'Jl. Cilandak KKO, Jakarta Selatan Johor Bahru no 96',
      is_bank: false,
    };
    return {
      wedding_banks: [address],
      title_gift:
        'Bagi Bapak/Ibu/Saudara/i yang ingin mengirimkan hadiah pernikahan dapat melalui virtual account di bawah ini :',
      addBank: (bank) =>
        set((state) => ({ wedding_banks: [...state.wedding_banks, bank] })),
      removeBank: (id) =>
        set((state) => ({
          wedding_banks: state.wedding_banks.filter((bank) => bank.id !== id),
        })),
      updateGiftTitle: (id, gift_title) =>
        set((state) => ({
          wedding_banks: state.wedding_banks.map((e) =>
            e.id === id ? { ...e, gift_title } : e,
          ),
        })),
      updateGiftSubTitle: (id, gift_subtitle) =>
        set((state) => ({
          wedding_banks: state.wedding_banks.map((e) =>
            e.id === id ? { ...e, gift_subtitle } : e,
          ),
        })),
      updateGiftAddress: (id, gift_address) =>
        set((state) => ({
          wedding_banks: state.wedding_banks.map((e) =>
            e.id === id ? { ...e, gift_address } : e,
          ),
        })),
      showGift: true,
      setShowGift: (newValue) => set({ showGift: newValue }),
    };
  },
  createStorePersist(WEDDING_CREATE_STORE.gift),
));

export const useWishStore = create(persist(
  (set) => ({
    showWish: true,
    setShowWish: (newValue) => set({ showWish: newValue }),
  }),
  createStorePersist(WEDDING_CREATE_STORE.wish),
));

export const useEndingQuoteStore = create(persist(
  (set) => ({
    showEnding: true,
    quoteText:
      'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang',
    quoteTitle: 'Q.S Ar-Rum : 21',
    quoteText2:
      'Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do’a restu kepada kami.',
    quoteTitle2: 'Wassalamu’alaikum warahmatullahi wabarakatuh',
    setShowEnding: (showEnding) => set({ showEnding: showEnding }),
    setQuoteText: (quoteText) => set({ quoteText: quoteText }),
    setQuoteTitle: (quoteTitle) => set({ quoteTitle: quoteTitle }),
    setQuoteText2: (quoteText2) => set({ quoteText2: quoteText2 }),
    setQuoteTitle2: (quoteTitle2) => set({ quoteTitle2: quoteTitle2 }),
  }),
  createStorePersist(WEDDING_CREATE_STORE.ending),
));

export const useCovidStore = create(persist(
  (set) => ({
    showCovid: true,
    setShowCovid: (newValue) => set({ showCovid: newValue }),
  }),
  createStorePersist(WEDDING_CREATE_STORE.covid),
));
