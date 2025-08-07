import { Routes, Route, Navigate } from 'react-router-dom'
import StudentsPage from '../pages/students/StudentsPage'
import DiplomasPage from '../pages/diplomas/DiplomasPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/auth/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import CreateStudentPage from '../pages/students/CreateStudentPage'
import CreateDiplomaPage from '../pages/diplomas/CreateDiplomaPage'
import { Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import StudentDetailsPage from '@/pages/students/SudentDetailPage'
import DiplomaDetailsPage from '@/pages/diplomas/DiplomaDetailsPage'

function PrivateRoute({ redirectTo = '/login' }: { redirectTo?: string }) {
  const { isSignedIn , isLoaded} = useUser()
 if (!isLoaded) {
    return null   // or a spinner
  }
  return isSignedIn ? <Outlet /> : <Navigate to={redirectTo} replace />
}


export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Main app routes */}
      <Route element={<PrivateRoute />}>

        <Route path="/" element={<HomePage />} />
        
        <Route path="/students">
          <Route index element={<StudentsPage />} />
          <Route path=":studentId" element={<StudentDetailsPage />} />
          <Route path="create" element={<CreateStudentPage />} />
        </Route>

        <Route path="/diplomas">
          <Route index element={<DiplomasPage />} />
          <Route path=":diplomaId" element={<DiplomaDetailsPage />} />
          <Route path="create" element={<CreateDiplomaPage />} />
        </Route>

      </Route>
      {/* Redirect root to home */}
      
      {/* Redirect */}
      <Route path="/dashboard" element={<Navigate to="/" replace />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes