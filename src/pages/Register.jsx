import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="page-center">
      <form className="form">
        <h2>Create Account</h2>
        <p className="form-subtitle">Register to use the agriculture support system.</p>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Phone" />
        <input type="text" placeholder="Location" />
        <select>
          <option>Farmer</option>
          <option>Expert</option>
          <option>Admin</option>
        </select>
        <input type="password" placeholder="Password" />
        <button type="submit">Register</button>
        <p className="link-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register