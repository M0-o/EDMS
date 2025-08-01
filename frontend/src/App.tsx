import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { AppRoutes } from "@/routes/AppRoutes"
import {Toaster} from "sonner"
import './App.css'

function App() {
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
          <ModeToggle />
          <Toaster/>
          <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App