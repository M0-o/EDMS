import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
       appearance={{
    variables: {
      colorPrimary: 'var(--primary)',
      colorText: 'var(--foreground)',
      colorBackground: 'var(--card)',
      colorInputBackground: 'var(--input)',
      colorInputText: 'var(--foreground)',
      colorDanger: 'var(--destructive)',
      colorSuccess: 'var(--chart-4)',
      borderRadius: '0.75rem',
      colorPrimaryForeground: 'var(--primary-foreground)',
      
    },
  
  }}>
    <App />
    </ClerkProvider>
  </StrictMode>,
)
