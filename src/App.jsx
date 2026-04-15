import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import FarmerDashboard from './pages/FarmerDashboard'
import ExpertDashboard from './pages/ExpertDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Problems from './pages/Problems'
import Weather from './pages/Weather'
import Tips from './pages/Tips'
import UploadProblem from './pages/UploadProblem'
import ProblemDetails from './pages/ProblemDetails'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/expert" element={<ExpertDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problems/:id" element={<ProblemDetails />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/upload-problem" element={<UploadProblem />} />
      </Routes>
    </>
  )
}

export default App