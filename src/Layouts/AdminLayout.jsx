import { useState } from 'react';

import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

const AdminLayout = () => {
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
    { to: "/admin/", icon: "bi-speedometer2", label: "Dashboard" },
    {
      to: "/admin/manage-expos",
      icon: "bi-calendar-event",
      label: "Manage Expos",
    },
    {
      to: "/admin/manage-exhibitors",
      icon: "bi-people",
      label: "Manage Exhibitors",
    },
    {
      to: "/admin/manage-sessions",
      icon: "bi-calendar-check",
      label: "Manage Sessions",
    },
    {
      to: "/admin/booth-allocation",
      icon: "bi-grid",
      label: "Booth Allocation",
    },
    { 
      to: "/admin/fetch-users", 
      icon: "bi-people-fill", 
      label: "Attendee Info" 
    },
    {
      to: "/admin/fetch-exhibitors",
      icon: "bi-building",
      label: "Exhibitor Info",
    },
    {
      to: "/admin/reports",
      icon: "bi-file-earmark-bar-graph",
      label: "Reports",
    },
    {
      to: "/admin/fetch-feedback",
      icon: "bi-chat-left-dots",
      label: "Feedbacks",
    },
    {
      to: "/admin/attendee-messages",
      icon: "bi-chat-left-text",
      label: "Attendee Messages",
    },
    {
      to: "/admin/exhibitor-messages",
      icon: "bi-chat-dots",
      label: "Exhibitor Messages",
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
          <h4 className="text-center text-purple mb-4">Admin Panel</h4>
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

      {/* Main Content Area */}
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
              to="/admin/profile"
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

export default AdminLayout;
