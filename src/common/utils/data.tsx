import Box from '@/components/atoms/box';
import EmeetIcon from '@/components/atoms/icons/emeetIcon';
import FireIcon from '@/components/atoms/icons/fire';
import RemoteIcon from '@/components/atoms/icons/gameremote';
import GlassesIcon from '@/components/atoms/icons/glasses';
import GlitterIcon from '@/components/atoms/icons/glitters';
import KaraokeIcon from '@/components/atoms/icons/karaokeIcon';
import ChinaLangIcon from '@/components/atoms/icons/language/china';
import EnLangIcon from '@/components/atoms/icons/language/en';
import IndoLangIcon from '@/components/atoms/icons/language/indo';
import SpainLangIcon from '@/components/atoms/icons/language/spain';
import ThaiLangIcon from '@/components/atoms/icons/language/thai';
import MealsIcon from '@/components/atoms/icons/meals';
import MobileLegendsIcon from '@/components/atoms/icons/mobileLegendsIcon';
import ProfileIcon from '@/components/atoms/icons/profile';
import Typography from '@/components/atoms/typography';

export const data = [
  {
    lable: 'table',
    content: 'Content1',
  },
  {
    lable: 'chair',
    content: 'Content2',
  },
  {
    lable: 'sofa',
    content: 'Content3',
  },
  {
    lable: 'light',
    content: 'Content4',
  },
  {
    lable: 'table',
    content: 'Content5',
  },
  {
    lable: 'table',
    content: 'Content6',
  },
  {
    lable: 'table',
    content: 'Content7',
  },
  {
    lable: 'table',
    content: 'Content8',
  },
];

export const dummy = [
  {
    text: (
      <Typography variant="subtitle2" component="span" fontWeight={500}>
        Share
      </Typography>
    ),
    id: 1,
  },
  {
    text: (
      <Typography variant="subtitle2" component="span" fontWeight={500} color="error">
        Report
      </Typography>
    ),
    id: 2,
  },
];

export const avatarData = [
  { alt: 'H', src: <EmeetIcon /> },
  { alt: 'V', src: <MealsIcon /> },
  { alt: 'C', src: <GlassesIcon /> },
  { alt: 'X', src: <GlitterIcon /> },
  { alt: 'E', src: <RemoteIcon /> },
  { alt: 'B', src: 'B' },
  { alt: 'Z', src: 'Z' },
];

export const temp: any = {
  Meals: { alt: 'V', src: <MealsIcon /> },
  'E-Meet': { alt: 'H', src: <EmeetIcon /> },
  Drinks: { alt: 'E', src: <GlassesIcon /> },
  'Mobile Legends': { alt: 'E', src: <RemoteIcon /> },
  'Emotional support': {
    alt: 'C',
    src: `https://${process.env.NEXT_PUBLIC_IMAGE_PREFIX}/IMAGES/SERVICES/EMEET/support.jpg?`,
  },
  'Brawl Stars': { alt: 'V', src: `https://${process.env.NEXT_PUBLIC_IMAGE_PREFIX}/IMAGES/SERVICES/GAMES/brawl.jpg?` },
  'League of Legends': { alt: 'V', src: <RemoteIcon /> },
  // "Karaoke": { alt: 'K', src: `https://${process.env.NEXT_PUBLIC_IMAGE_PREFIX}/IMAGES/SERVICES/EMEET/karaoke.jpg?` },
  Karaoke: { alt: 'K', src: <KaraokeIcon /> },
  'Fine Dining': { alt: 'D', src: <GlitterIcon /> },
};

export const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 37,
    label: '37',
  },
  {
    value: 100,
    label: '100',
  },
];

export const cardData = {
  name: 'Zynx',
  status: true,
  verfied: true,
  social: 'https://instagram.com/',
  profilePic:
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
  activity: avatarData,
  voiceTag: '',
  rating: {
    rating: 4.9,
    count: 100,
  },
  priceLabel: { min: 110, max: 250, hr: 1 },
};

export const accdata = [
  {
    label: 'Lorem ipsum dolor met?',
    summary:
      'SummaryLorem ipsum dolor sit amet consectetur. Nisi sit adipiscing morbi eget a velit faucibus. Turpis maecenas facilisis blandit et lectus urna ut. Senectus rhoncus egestas duis integer quis quis pellentesque pulvinar. Volutpat viverra tempor commodo ante laoreet aliquam elit convallis urna. Luctus dui sed blandit porttitor. Elementum auctor orci ac tempor quisque neque mauris faucibus semper. Porttitor id ac fusce pretium.',
  },
  {
    label: 'Lorem ipsum dolor met 1?',
    summary:
      'SummaryLorem ipsum dolor sit amet consectetur. Nisi sit adipiscing morbi eget a velit faucibus. Turpis maecenas facilisis blandit et lectus urna ut. Senectus rhoncus egestas duis integer quis quis pellentesque pulvinar. Volutpat viverra tempor commodo ante laoreet aliquam elit convallis urna. Luctus dui sed blandit porttitor. Elementum auctor orci ac tempor quisque neque mauris faucibus semper. Porttitor id ac fusce pretium.',
  },
  {
    label: 'Lorem ipsum dolor met 23ndfvsn?',
    summary:
      'SummaryLorem ipsum dolor sit amet consectetur. Nisi sit adipiscing morbi eget a velit faucibus. Turpis maecenas facilisis blandit et lectus urna ut. Senectus rhoncus egestas duis integer quis quis pellentesque pulvinar. Volutpat viverra tempor commodo ante laoreet aliquam elit convallis urna. Luctus dui sed blandit porttitor. Elementum auctor orci ac tempor quisque neque mauris faucibus semper. Porttitor id ac fusce pretium.',
  },
];

export const emeetOrder = {
  rating: {
    rating: 4.9,
    count: 100,
  },

  priceLabel: { min: 110, max: 250, hr: 1 },
};

export const transactionInfo = {
  time: 'Sep 12, 9:41 AM',
  status: 'Bundled Recharge',
  transactionID: 123456788,
  amount: 340,
};

export const transactionStatusInfo = {
  time: 'Sep 12, 9:41 AM',
  status: 'cancelled',
  transactionID: 123456788,
  amount: 340,
  profilePic: <ProfileIcon />,
  remainingTime: '',
  name: 'limblake',
};

const labelComp = (icon: any, text: string) => {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      {icon}
      <Typography>{text}</Typography>
    </Box>
  );
};
export const languageData = [
  {
    value: 'en',
    label: labelComp(<EnLangIcon />, 'EN'),
  },
  {
    value: 'es',
    label: labelComp(<SpainLangIcon />, 'Español'),
  },
  {
    value: 'zh',
    label: labelComp(<ChinaLangIcon />, '中文'),
  },
  {
    value: 'in',
    label: labelComp(<IndoLangIcon />, 'INDO'),
  },
  {
    value: 'th',
    label: labelComp(<ThaiLangIcon />, 'ภาษาไทย'),
  },
];

export const locationData = [
  {
    value: 'Barbières France',
    label: 'Barbières France',
  },
  {
    value: 'Barbieri Province of Cuneo, Italy',
    label: 'Barbieri Province of Cuneo, Italy',
  },
];
export const termsImage = 'https://images.rentbabe.com/TERMS/termsv2.png';
export const FBLogo = 'https://images.rentbabe.com/assets/fb_logo.svg';
export const ISGBlackLogo = 'https://images.rentbabe.com/assets/insta_logo_black.svg';
export const TiktokLogo = 'https://images.rentbabe.com/assets/tiktok.svg';
export const TelegramLogo = 'https://images.rentbabe.com/assets/app/telegram.svg';
export const WhatsAppLogo = 'https://images.rentbabe.com/assets/app/whatsapp.svg';
export const DiscordAppLogo = 'https://images.rentbabe.com/assets/app/discord.svg';
export const ViberAppLogo = 'https://images.rentbabe.com/assets/app/viber.svg';
export const LineAppLogo = 'https://images.rentbabe.com/assets/app/line.svg';
export const WechatAppLogo = 'https://images.rentbabe.com/assets/app/wechat.svg';
export const KakaotalkAppLogo = 'https://images.rentbabe.com/assets/app/kakaotalk.svg';

export const mediaLinks = [
  'https://www.youtube.com/embed/Hj4HWnXe8vk',
  'https://www.youtube.com/embed/8IwThm4Fizo',
  'https://www.youtube.com/embed/z7dQzkKrXTk',
  'https://www.youtube.com/embed/9Nug7n1CuRs',
  'https://www.youtube.com/embed/Fp0ykAVyulk',
  'https://www.youtube.com/embed/afkr_fLi3tE',
  'https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fdoubleupsg%2Fvideos%2F598883757878310%2F&show_text=false&width=560&t=0',
  'https://www.youtube.com/embed/WYplgVAxMv4',
  'https://www.youtube.com/embed/T-qRwQ5D0e0',
  'https://www.youtube.com/embed/cSz4m15Y0sc',
  'https://www.youtube.com/embed/_FZb1mFdPoI',
  'https://www.youtube.com/embed/kDMV7scaLvk',
];

export const tabsData = [
  {
    content: 'Content1',
    lable: 'Meet up',
  },
  {
    content: 'Content2',
    lable: 'E-Meet',
  },
  {
    content: 'Content3',
    lable: 'Games',
  },
  {
    content: 'Content4',
    lable: 'Sports',
  },
];

export const serviceIcon = {
  0: <MealsIcon />,
  1: <EmeetIcon />,
  2: <RemoteIcon />,
  3: <GlitterIcon />,
};

export const CountryLookUpTable: { [country: string] : string } = {
  Singapore: 'sg',
  Philippines: 'ph',
  'Metro Manila': 'ph',
  Jakarta: 'id',
  Indonesia: 'id',
  India: 'in',
  Malaysia: 'my',
  USA: 'us',
  Netherlands: 'nl',
  Canada: 'ca',
  Germany: 'de',
  Brazil: 'br',
  'South Africa': 'za',
  'Timor-Leste': 'tl',
  Macaristan: 'hu',
  Hungary: 'hu',
  'United Kingdom': 'uk',
  Portugal: 'pt',
  Serbia: 'rs',
  Colombia: 'co',
  'South Korea': 'kr',
};


export const tabs = [
  {
    icon: <FireIcon />,
    label: 'For you',
  },
  {
    icon: <RemoteIcon />,
    label: 'Games',
  },
  {
    icon: <EmeetIcon />,
    label: 'E-Meet',
  },
  {
    icon: <MealsIcon />,
    label: 'Meals',
  },
  {
    icon: <GlassesIcon />,
    label: 'Drinks',
  },
  {
    icon: <GlitterIcon />,
    label: 'Relationship Advice',
  },
  {
    icon: <MobileLegendsIcon />,
    label: 'Mobile Legends',
  },
];

export const genderData = [
  {
    label: (
      <Typography variant="body1" fontWeight={500} color="#1A1A1A" mr={2}>
        Male
      </Typography>
    ),
    key: 'Male',
    value: 1,
  },
  {
    label: (
      <Typography variant="body1" fontWeight={500} color="#1A1A1A" mr={2}>
        Female
      </Typography>
    ),
    key: 'Female',
    value: 0,
  },
];

export const privacyData = [
  {
    label: (
      <Typography variant="body1" fontWeight={500} color="#1A1A1A" mr={2}>
        Public
      </Typography>
    ),
    key: 'Public',
    value: 'Public',
  },
  {
    label: (
      <Typography variant="body1" fontWeight={500} color="#1A1A1A" mr={2}>
        Private
      </Typography>
    ),
    key: 'Private',
    value: 'Private',
  },
];

export const marksForPriceSelect = [
  {
    value: 0,
    label: 0,
  },
  {
    value: 25,
    label: 50,
  },
  {
    value: 50,
    label: 100,
  },
  {
    value: 100,
    label: 200,
  },
];

export const raceEnums = [
  {
    label: 'Asian',
    key: '10',
    value: '15',
  },
  {
    label: 'Chinese',
    key: '0',
    value: '0',
  },
  {
    label: 'Malay',
    key: '1',
    value: '1',
  },
  {
    label: 'Indian',
    key: '2',
    value: '2',
  },
  // {
    //   label: 'eurasian',
    //   key: '4',
    //   value: '4',
    // },
    {
      label: 'Korean / Japanese',
      key: '5',
      value: '6',
    },
    {
      label: 'White / Caucasian',
      key: '3',
      value: '3',
    },
  // {
  //   label: 'korean',
  //   key: '6',
  //   value: '5',
  // },
  // {
  //   label: 'viet',
  //   key: '7',
  //   value: '12',
  // },
  {
    label: 'Black',
    key: '8',
    value: '13',
  },
  {
    label: 'Mixed',
    key: '9',
    value: '14',
  },
  {
    label: 'Others',
    key: '11',
    value: '99',
  },
  // {
  //   label: 'all',
  //   key: '12',
  //   value: '999',
  // },
];

export const meetUpServices = [
  {
    id: 1,
    type: 'Double Dates',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fdouble%20date.svg?alt=media&token=3a7e8ee2-3c83-4727-a13e-8cd11ec31b99',
    tooltip: 'Clients want to meet 2 people at the same time. Invite your friend to join you on a 2 on 1 meetup.',
  },
  {
    id: 2,
    type: 'Meals',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fmeals.svg?alt=media&token=5c3c2952-e348-41a8-af8c-140f9ed9da69',
    tooltip: 'Dinner, lunch or breakfast together',
  },
  {
    id: 3,
    type: 'Hiking',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fhiking.svg?alt=media&token=a56df2b6-f6e9-4dea-979b-0f3af7063010',
    tooltip: 'Hiking buddies',
  },
  {
    id: 4,
    type: 'Fine Dining',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Ffine%20dining.svg?alt=media&token=75887d2e-7ec6-4f2b-9d81-79cb09a98610',
    tooltip: 'Formal dress up dinner',
  },
  {
    id: 5,
    type: 'Drinks',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fdrink.svg?alt=media&token=89b3b444-308b-4d0c-b2c0-e7d8a92147f2',
    tooltip: 'Chill drinks together',
  },
  {
    id: 6,
    type: 'Photoshoot',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fphotoshoot.svg?alt=media&token=9a8b0e57-9d8b-42cf-8f62-f8308b0a5993',
    tooltip: 'Outdoor or studio modelling photoshoot',
  },
  {
    id: 7,
    type: 'Gathering',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fgathering.svg?alt=media&token=1f604555-b57a-4b86-baee-f4e703fcdfde',
    tooltip: '+1 for gathering',
  },
  {
    id: 8,
    type: 'Movies',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fmovies.svg?alt=media&token=e6375466-70ce-4933-9541-0229c715d3a5',
    tooltip: 'Watch movies together',
  },
];

export const gamesServices = [
  {
    id: 1,
    type: 'Mobile Legends',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fmobile%20legends.svg?alt=media&token=10d6a138-cfb5-49c5-9dca-9f77e24513a1',
    tooltip: '',
  },
  {
    id: 2,
    type: 'Among us',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Famong-us.svg?alt=media&token=034a052b-99d8-4d7e-a3dd-cafd0d64e6a3',
    tooltip: '',
  },
  {
    id: 3,
    type: 'Apex',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fapex.svg?alt=media&token=f395a750-211c-4b68-94e7-a4897ad6d669',
    tooltip: '',
  },
  {
    id: 4,
    type: 'fortnite',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Ffortnite.svg?alt=media&token=863d1853-abf5-4d95-b672-4f0224a3ef50',
    tooltip: '',
  },
  {
    id: 5,
    type: 'Brawl Star',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fbrawl-star.svg?alt=media&token=a78e1a90-abed-4432-a0f3-c5e74efa94f7',
    tooltip: '',
  },
  {
    id: 6,
    type: 'CS Go',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fcsgo.svg?alt=media&token=55f59d3f-000f-444f-8e46-fa9d1acc0f55',
    tooltip: '',
  },
  {
    id: 7,
    type: 'Call Of Duty',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fcall-of-duty.svg?alt=media&token=17461675-bda0-4d41-87cf-7cc95bcae1b0',
    tooltip: '',
  },
  {
    id: 8,
    type: 'Mine Craft',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fminecraft.svg?alt=media&token=d831d069-c44f-4787-9cb2-1c5efb30926b',
    tooltip: '',
  },
  {
    id: 9,
    type: 'PUBG',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fpubg.svg?alt=media&token=e2360aa5-cc7c-4afa-8306-41d9eb373fa3',
    tooltip: '',
  },
  {
    id: 10,
    type: 'Dota 2',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fdota2.svg?alt=media&token=aff83311-fe93-492c-9aa7-f1a5594f518e',
    tooltip: '',
  },
  {
    id: 11,
    type: 'valorant',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fvalorant.svg?alt=media&token=02b6e1c3-7978-44a1-b252-ee8879ded0ab',
    tooltip: '',
  },
  {
    id: 12,
    type: 'LOL',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Flol.svg?alt=media&token=47f49244-c1c7-42d9-9887-5d9f06ddab65',
    tooltip: '',
  },
  {
    id: 13,
    type: 'Over Watch',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fover-watch.svg?alt=media&token=b2152c73-eeeb-425f-9a72-4d7d3cfe17ea',
    tooltip: '',
  },
];

export const EmeetServices = [
  {
    id: 1,
    type: 'E-Meet',
    image: 'https://images.rentbabe.com/IMAGES/SERVICES/EMEET/emeet.svg',
    tooltip: 'Chat with clients online',
  },
  {
    id: 2,
    type: 'Relationship Advice',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Frelationship%20advice.svg?alt=media&token=5772f1f4-91cc-4970-bb43-9b751d4406a5',
    tooltip: 'Share your experience and perspective',
  },
  {
    id: 3,
    type: 'Karaoke',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fkaraoke.svg?alt=media&token=519b824c-c2b9-4461-8665-24a3b35d0c0d',
    tooltip: 'Sing with each other',
  },
  {
    id: 4,
    type: 'Emotional Support',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Femotional%20support.svg?alt=media&token=d9c4ac3e-36c7-4791-985f-ac5c5b0006b7',
    tooltip: 'Provide emotional support to people in need',
  },
  {
    id: 5,
    type: 'Fortune Telling',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Ffortune%20telling.svg?alt=media&token=e51dc033-aa78-4227-9274-b117707d8856',
    tooltip: 'Fortune telling through Tarot',
  },
  {
    id: 6,
    type: 'Wake-up Call',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fwake%20up%20call.svg?alt=media&token=634c04ee-fecc-41b2-b8c6-7031df40b470',
    tooltip: 'Call and wake up your client at an agreed time',
  },
  {
    id: 7,
    type: 'Language Exchange',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Flanguage%20exchange.svg?alt=media&token=2260a20e-cc92-46db-8c60-ae2a7b992283',
    tooltip: 'Teach clients the languages you speak',
  },
  {
    id: 8,
    type: 'Sleep Call',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fsleep%20call.svg?alt=media&token=9a38cf92-c0b0-4d1d-aa69-76568ce1d4c6',
    tooltip: 'Read bedtime stories for your client',
  },
  {
    id: 9,
    type: 'Upbeat Conversation',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fupbeat%20conversation.svg?alt=media&token=3368d2d8-e750-42cb-ae68-318f1ca621ba',
    tooltip: 'Share positive and memes with clients',
  },
  {
    id: 10,
    type: 'Asmr',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fasmr.svg?alt=media&token=4937126c-a58d-4926-ac38-dd76ba03227f',
    tooltip: 'Gentle whisper to your client, excellent mic is required',
  },
  {
    id: 11,
    type: 'Drawing',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fdrawing.svg?alt=media&token=810cfb9a-7584-4262-80a2-498c41c5b8eb',
    tooltip: 'Draw something for your client',
  },
  {
    id: 12,
    type: 'Off my chest',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Foff%20my%20chest.svg?alt=media&token=769b78a9-8558-44ee-a19b-df5ef2349a10',
    tooltip: 'Listen to clients vent their problems',
  },
];

export const sportServicesData = [
  {
    id: 1,
    type: 'Badminton',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fbadminton.svg?alt=media&token=4d16e64c-890d-4519-b022-86658e0c2b69',
    tooltip: '',
  },
  {
    id: 2,
    type: 'Bowlling',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fbowling.svg?alt=media&token=941c3273-874c-4894-8535-9b486c559efd',
    tooltip: '',
  },
  {
    id: 3,
    type: 'Tennis',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Ftennis.svg?alt=media&token=2031f225-993f-47d8-ba66-b25fe24960da',
    tooltip: '',
  },
  {
    id: 4,
    type: 'Golf',
    image:
      'https://firebasestorage.googleapis.com/v0/b/rb-dev-819c4.appspot.com/o/ONBOARDING%2Fgolf.svg?alt=media&token=25d3379a-96c9-4133-9afa-661d74ff7ee8',
    tooltip: '',
  },
];

export const extractKeyValuePairs = (data: any) => {
  const result: { [key: string]: string } = {};
  data.forEach((item: any) => {
    if (item.includes(':')) {
      const [key, ...value] = item.split(':');
      result[key.trim()] = value.join(':').trim();
    }
  });
  return result;
};
