import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import { AppRoutes } from "@/routes/AppRoutes"
import {Toaster} from "sonner"
import './App.css'

function App() {
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
         
          <Toaster/>
          <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App