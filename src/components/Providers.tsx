'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import ThemeRegistry from './ThemeRegistry/ThemeRegistry';
import { configureAmplify } from '@/lib/auth';
import AuthWrapper from './AuthWrapper';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    configureAmplify();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeRegistry>
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </ThemeRegistry>
    </QueryClientProvider>
  );
}
