'use client';

import { usePathname } from 'next/navigation';
import { Providers } from '@/store/provider';
import AuthProvider from '@/utility/AuthProvider';
import ThemeProvider from '@/common/theme';
import Audio from '@/components/atoms/audio';
import ModalContext from '@/utility/ModalContext';
import Header from '@/components/organisms/header';
import Box from '@/components/atoms/box';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  return (
    <Providers>
      <AuthProvider pathName={pathName}>
        <ThemeProvider>
          <Audio />
          <ModalContext />
          {!pathName?.includes('login') && pathName !== 'profile' && <Header />}
          <Box className={!pathName?.includes('login') && !pathName?.includes('profile') ? 'children' : ''}>
            {children}
          </Box>
        </ThemeProvider>
      </AuthProvider>
    </Providers>
  );
}
