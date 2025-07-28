'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Toaster } from 'react-hot-toast'
import type { Database } from '@/types/database'

// Supabase Context
const SupabaseContext = createContext<any>(null)

export function Providers({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClientComponentClient<Database>())

  return (
    <SupabaseContext.Provider value={supabase}>
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
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used within a Providers component')
  }
  return context
}