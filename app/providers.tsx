'use client'

import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/contexts/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#006A6B',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#98FB98',
              secondary: '#006A6B',
            },
          },
          error: {
            iconTheme: {
              primary: '#FF6B6B',
              secondary: '#006A6B',
            },
          },
        }}
      />
    </AuthProvider>
  )
}