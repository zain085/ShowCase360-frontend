import { useState } from 'react';

import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

const ExhibitorLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { to: "/exhibitor/", icon: "bi-speedometer2", label: "Dashboard" },
    { to: "/exhibitor/expo-register", icon: "bi-person", label: "Expos" },
    { to: "/exhibitor/my-booth", icon: "bi-shop", label: "My Booth" },
    { to: "/exhibitor/messages", icon: "bi-chat-dots", label: "Messages" },
    { to: "/exhibitor/exhibitor-profile", icon: "bi-person", label: "Profile" },
    {
      to: "/exhibitor/create-profile",
      icon: "bi-person",
      label: "Create Profile",
    },
  ];

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className={`bg-dark-custom text-light ${
          collapsed ? "d-none d-md-block" : ""
        }`}
        style={{ width: "250px" }}
      >
        <div className="p-3">
          <h4 className="text-center text-purple mb-4">Exhibitor Panel</h4>
          <hr className="border-purple" />
          <ul className="nav nav-pills flex-column">
            {navItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <Link
                  to={item.to}
                  className={`nav-link text-light ${
                    location.pathname === item.to ? "active bg-purple" : ""
                  }`}
                >
                  <i className={`bi ${item.icon} me-2`}></i>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-grow-1 bg-dark text-light">
        {/* Top Navbar */}
        <nav className="navbar navbar-dark bg-dark border-bottom border-purple px-3">
          <button
            className="btn btn-sm btn-outline-light d-md-none me-2"
            onClick={() => setCollapsed(!collapsed)}
          >
            <i className="bi bi-list"></i>
          </button>

          <div className="ms-auto d-flex align-items-center gap-2">
            {/* Profile Icon */}
            <Link
              to="/exhibitor/profile"
              className="btn btn-outline-purple btn-sm d-flex align-items-center gap-2"
              title="My Profile"
            >
              <i className="bi bi-person-circle fs-5 text-purple"></i>
              <span className="text-purple d-none d-sm-inline">{username}</span>
            </Link>

            {/* Logout Button */}
            <button
              className="btn btn-purple btn-sm d-flex align-items-center"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ExhibitorLayout;
