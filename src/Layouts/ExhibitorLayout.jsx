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
  const profileImg = user?.profileImg || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { to: "/exhibitor/", icon: "bi-speedometer2", label: "Dashboard" },
    {
      to: "/exhibitor/expo-register",
      icon: "bi-calendar-event",
      label: "Expos",
    },
    { to: "/exhibitor/my-booth", icon: "bi-shop-window", label: "My Booth" },
    { to: "/exhibitor/messages", icon: "bi-envelope-paper", label: "Messages" },
    {
      to: "/exhibitor/exhibitor-profile",
      icon: "bi-person-badge",
      label: "Profile",
    },
    {
      to: "/exhibitor/create-profile",
      icon: "bi-file-earmark-plus",
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

          <div className="ms-auto d-flex align-items-center gap-1">
            {/* Profile Icon */}
            <Link
              to="/exhibitor/profile"
              className="btn btn-outline-purple btn-sm d-flex align-items-center gap-2"
              title="My Profile"
            >
              {profileImg ? (
                <img
                  src={profileImg}
                  alt="profile"
                  className="rounded-circle"
                  style={{ width: "28px", height: "28px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="rounded-circle bg-secondary d-flex align-items-center justify-content-center"
                  style={{ width: "28px", height: "28px" }}
                >
                  <span className="text-white fw-bold">
                    {username ? username.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
              )}
              <span className="text-purple d-none d-sm-inline">{username}</span>
            </Link>

            {/* Logout Button (Icon only, outline style) */}
            <button
              className="btn btn-outline-purple btn-sm d-flex align-items-center"
              onClick={handleLogout}
              title="Logout"
            >
              <i className="bi bi-box-arrow-right fs-5 text-purple"></i>
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
