import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'

import FarmerDashboard from './pages/FarmerDashboard'
import ExpertDashboard from './pages/ExpertDashboard'
import AdminDashboard from './pages/AdminDashboard'

import Problems from './pages/Problems'
import UploadProblem from './pages/UploadProblem'
import ProblemDetails from './pages/ProblemDetails'

import WeatherPage from './pages/WeatherPage'
import TipsPage from './pages/TipsPage'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/farmer"
          element={
            <ProtectedRoute role="farmer">
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expert"
          element={
            <ProtectedRoute role="expert">
              <ExpertDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload-problem"
          element={
            <ProtectedRoute role="farmer">
              <UploadProblem />
            </ProtectedRoute>
          }
        />

        <Route path="/problems" element={<Problems />} />
        <Route path="/problems/:id" element={<ProblemDetails />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/tips" element={<TipsPage />} />
      </Routes>
    </>
  )
}

export default App