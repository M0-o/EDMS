import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import { AppRoutes } from "@/routes/AppRoutes"
import {Toaster} from "sonner"
import './App.css'
import { ModeToggle } from './components/mode-toggle'
function App() {
  
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <ModeToggle />
         
          <Toaster/>
          <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App