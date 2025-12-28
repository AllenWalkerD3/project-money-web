'use client';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Paper, Typography } from '@mui/material';

export default function LoginPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user, authStatus } = useAuthenticator((context: any) => [context.user]);
  const router = useRouter();

  useEffect(() => {
    if (authStatus === 'authenticated') {
      router.push('/');
    }
  }, [authStatus, router]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Account Book
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Authenticator />
        </Box>
      </Paper>
    </Box>
  );
}
