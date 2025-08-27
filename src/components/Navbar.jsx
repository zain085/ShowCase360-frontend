import React from 'react';

import {
  Link,
  NavLink,
  useNavigate,
} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "User";
  const profileImg = user?.profileImg || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-purple px-4">
      <div className="container-fluid">
        {/* Brand */}
        <Link to="/attendee/" className="navbar-brand text-purple fw-bold">
          ShowCase360
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler text-white border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
        >
          <i className="bi bi-list fs-3"></i>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/attendee/" end className="nav-link text-light">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/attendee/expos" className="nav-link text-light">
                Expos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/attendee/sessions" className="nav-link text-light">
                Sessions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/attendee/exhibitors"
                className="nav-link text-light"
              >
                Exhibitors
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/attendee/floor-plan"
                className="nav-link text-light"
              >
                Floor Plan
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/attendee/about" className="nav-link text-light">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/attendee/contact" className="nav-link text-light">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/attendee/feedback" className="nav-link text-light">
                Feedback
              </NavLink>
            </li>
          </ul>

          {/* Right Side Buttons */}
          <div className="d-flex align-items-center gap-1">
            {/* Bookmark Icon */}
            <Link
              to="/attendee/bookmark"
              className="btn btn-outline-purple btn-sm d-flex align-items-center"
              title="View Bookmarked Sessions"
            >
              <i className="bi bi-bookmark-star-fill fs-5 text-purple"></i>
            </Link>

            {/* Profile Icon */}
            <Link
              to="/attendee/profile"
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
