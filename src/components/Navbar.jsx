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
          EventSphere
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
          <div className="d-flex align-items-center gap-2">
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
              <i className="bi bi-person-circle fs-5 text-purple"></i>
              <span className="text-purple d-none d-sm-inline">{username}</span>
            </Link>

            {/* Logout Button */}
            <button className="btn btn-purple btn-sm" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
