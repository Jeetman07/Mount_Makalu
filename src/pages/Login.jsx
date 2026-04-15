import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="page-center">
      <form className="form">
        <h2>Welcome Back</h2>
        <p className="form-subtitle">Login to continue to your agriculture support dashboard.</p>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <select>
          <option>Farmer</option>
          <option>Expert</option>
          <option>Admin</option>
        </select>
        <button type="submit">Login</button>
        <p className="link-text">
          Do not have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  )
}

export default Login