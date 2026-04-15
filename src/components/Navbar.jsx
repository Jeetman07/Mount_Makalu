import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const [role, setRole] = useState('farmer')
  const navigate = useNavigate()

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value
    setRole(selectedRole)

    if (selectedRole === 'farmer') navigate('/farmer')
    if (selectedRole === 'expert') navigate('/expert')
    if (selectedRole === 'admin') navigate('/admin')
  }

  return (
    <nav className="navbar">
      <h2>Agriculture Support System</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>

        <select value={role} onChange={handleRoleChange}>
          <option value="farmer">Farmer</option>
          <option value="expert">Expert</option>
          <option value="admin">Admin</option>
        </select>

        {role === 'farmer' && (
          <>
            <Link to="/farmer">Dashboard</Link>
            <Link to="/problems">Problems</Link>
            <Link to="/weather">Weather</Link>
            <Link to="/tips">Tips</Link>
            <Link to="/upload-problem">Upload</Link>
          </>
        )}

        {role === 'expert' && (
          <>
            <Link to="/expert">Dashboard</Link>
            <Link to="/problems">Problems</Link>
          </>
        )}

        {role === 'admin' && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/problems">Problems</Link>
            <Link to="/weather">Weather</Link>
            <Link to="/tips">Tips</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar