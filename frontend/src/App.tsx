import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { AppRoutes } from "@/routes/AppRoutes"
import {Toaster} from "sonner"
import './App.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
          <ModeToggle />
          <Toaster/>
             <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
          <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App