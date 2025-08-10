import React from 'react';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Rent from '..';
import messages from '../../../../../resources/en.json';

// Mock the useRentHook
jest.mock('../useRentHook', () => ({
  __esModule: true,
  default: () => ({
    isMobile: false,
    isTablet: false,
    isTabletMini: false,
    loading: false,
    initLoading: false,
    cardColumnCount: 4,
    Column: () => <div>Column</div>,
    currentVideoIndex: 0,
    mediaLinks: [''],
    activeTab: 0,
    activeLocation: '',
    activeRecently: '',
    activePublic: '',
    activeGender: '',
    activeCity: '',
    locationData: [],
    recentlySelectionData: [],
    publicSelectionData: [],
    genderSelectionData: [],
    EthnicityData: [],
    sliderRef: { current: null },
    items: [],
    time: null,
    data: null,
    reset: false,
    nickname: '',
    favouritesV2: [],
    filterIsOpen: false,
    regionState: [],
    showScrollToTop: false,
    scrollToTop: jest.fn(),
    onClickBabeCard: jest.fn(),
    handleTabChange: jest.fn(),
    handleSearch: jest.fn(),
    handleNext: jest.fn(),
    handleApply: jest.fn(),
    handlePrev: jest.fn(),
    handleLocationChange: jest.fn(),
    handleDirectLocationChange: jest.fn(),
    handleRecentlyChange: jest.fn(),
    handlePublicChange: jest.fn(),
    handleGenderChange: jest.fn(),
    handleEthnicityChange: jest.fn(),
    backVideoHandler: jest.fn(),
    nextVideoHandler: jest.fn(),
    fetchMoreData: jest.fn(),
    onOpenFilter: jest.fn(),
    onCloseFilter: jest.fn(),
    setActiveLocation: jest.fn(),
  }),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock firebase
jest.mock('../../../../credentials/firebase', () => ({
  auth: {},
  db: {},
  storage: {},
  functions: {},
}));

// Mock @react-google-maps/api
jest.mock('@react-google-maps/api', () => ({
  useLoadScript: () => ({ isLoaded: true }),
  Autocomplete: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Rent component', () => {
  it('renders the component and checks for translated text', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Rent />
      </NextIntlClientProvider>
    );

    // Check if the translated text "Favourites" is present
    expect(screen.getByText('Favourites')).toBeInTheDocument();

    // Check if the translated text "Apply" is present
    expect(screen.getByText('Apply')).toBeInTheDocument();
  });
});
