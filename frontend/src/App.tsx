import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import { AppRoutes } from "@/routes/AppRoutes"
import {Toaster} from "sonner"

import './App.css'
function App() {
  
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
      
          <Toaster richColors/>
          <AppRoutes />
      
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App