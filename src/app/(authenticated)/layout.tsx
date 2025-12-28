'use client';
import MainLayout from '@/components/MainLayout';
// import { useAuthenticator } from '@aws-amplify/ui-react';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import { CircularProgress, Box } from '@mui/material';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  // const { authStatus } = useAuthenticator(context => [context.authStatus]);
  // const router = useRouter();

  // useEffect(() => {
  //   if (authStatus === 'unauthenticated') {
  //     router.push('/login');
  //   }
  // }, [authStatus, router]);

  // if (authStatus !== 'authenticated') {
  //     return (
  //         <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
  //             <CircularProgress />
  //         </Box>
  //     )
  // }

  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
