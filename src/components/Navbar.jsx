import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }

  const roleMenus = {
    farmer: [
      { name: "Dashboard", path: "/farmer" },
      { name: "Problems", path: "/problems" },
      { name: "Weather", path: "/weather" },
      { name: "Tips", path: "/tips" },
      { name: "Upload", path: "/upload-problem" },
    ],
    expert: [
      { name: "Dashboard", path: "/expert" },
      { name: "Problems", path: "/problems" },
    ],
    admin: [
      { name: "Dashboard", path: "/admin" },
      { name: "Problems", path: "/problems" },
      { name: "Weather", path: "/weather" },
      { name: "Tips", path: "/tips" },
    ],
  }

  return (
    <nav className="navbar">
      <h2>Agriculture Support System</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <span style={{ color: "white", fontWeight: "600" }}>
              {user.name}
            </span>

            {roleMenus[user.role]?.map((item, index) => (
              <Link key={index} to={item.path}>
                {item.name}
              </Link>
            ))}

            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar