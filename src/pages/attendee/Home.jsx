import React from 'react';

import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-dark text-white">
      {/* Hero Section */}
      <section className="py-5 bg-dark">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                <span className="text-purple">Transform</span> Your Event
                Experience
              </h1>
              <p className="lead text-white-50 mb-4">
                EventSphere bridges the gap between physical and virtual events,
                offering seamless access to global expos, interactive sessions,
                and meaningful networking opportunities.
              </p>
              <div className="d-flex gap-3">
                <Link
                  to="/attendee/floor-plan"
                  className="btn btn-purple btn-lg px-4"
                >
                  View Floor Plan
                </Link>
                <Link
                  to="/attendee/exhibitors"
                  className="btn btn-outline-light btn-lg px-4"
                >
                  View Exhibitors
                </Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865"
                alt="Conference attendees"
                className="img-fluid rounded-3 shadow-lg border border-purple"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Sessions Carousel with Banner Images - Constrained Width */}
      <section className="bg-dark py-0">
        <div className="container px-0" style={{ maxWidth: "1200px" }}>
          <div
            id="upcomingSessionsCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="3000"
          >
            <div className="carousel-inner rounded-3 overflow-hidden">
              {/* Slide 1 */}
              <div className="carousel-item active position-relative">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  className="d-block w-100"
                  alt="AI in Events"
                  style={{
                    height: "500px",
                    objectFit: "cover",
                    filter: "brightness(0.5)",
                  }}
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                  <div className="container px-4">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <h2 className="text-purple fw-bold mb-3 display-6">
                          Upcoming Session:{" "}
                          <span className="text-light">
                            "The Future of AI in Events"
                          </span>
                        </h2>
                        <div className="d-flex flex-wrap gap-4 mb-3">
                          <p className="text-white-50 fs-5 mb-0">
                            <i className="bi bi-calendar-event me-2"></i>
                            <strong>October 22, 2025</strong>
                          </p>
                          <p className="text-white-50 fs-5 mb-0">
                            <i className="bi bi-clock me-2"></i>
                            <strong>11:00 AM – 12:00 PM</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 2 */}
              <div className="carousel-item position-relative">
                <img
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  className="d-block w-100"
                  alt="Hybrid Conferences"
                  style={{
                    height: "500px",
                    objectFit: "cover",
                    filter: "brightness(0.5)",
                  }}
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                  <div className="container px-4">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <h2 className="text-purple fw-bold mb-3 display-6">
                          Session Spotlight:{" "}
                          <span className="text-light">
                            "Navigating Hybrid Conferences"
                          </span>
                        </h2>
                        <div className="d-flex flex-wrap gap-4 mb-3">
                          <p className="text-white-50 fs-5 mb-0">
                            <i className="bi bi-calendar-event me-2"></i>
                            <strong>October 24, 2025</strong>
                          </p>
                          <p className="text-white-50 fs-5 mb-0">
                            <i className="bi bi-clock me-2"></i>
                            <strong>2:00 PM – 3:00 PM</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 3 */}
              <div className="carousel-item position-relative">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  className="d-block w-100"
                  alt="Event Planning"
                  style={{
                    height: "500px",
                    objectFit: "cover",
                    filter: "brightness(0.5)",
                  }}
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                  <div className="container px-4">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <h2 className="text-purple fw-bold mb-3 display-6">
                          Highlighted Session:{" "}
                          <span className="text-light">
                            "Sustainable Tech for Tomorrow"
                          </span>
                        </h2>
                        <div className="d-flex flex-wrap gap-4 mb-3">
                          <p className="text-white-50 fs-5 mb-0">
                            <i className="bi bi-calendar-event me-2"></i>
                            <strong>October 27, 2025</strong>
                          </p>
                          <p className="text-white-50 fs-5 mb-0">
                            <i className="bi bi-clock me-2"></i>
                            <strong>9:00 AM – 10:30 AM</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#upcomingSessionsCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#upcomingSessionsCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-dark">
        <div className="container">
          <div className="row g-4 text-center">
            {[
              { title: "Global Events", value: "250+" },
              { title: "Active Users", value: "50K+" },
              { title: "Connections Made", value: "1M+" },
              { title: "Satisfaction Rate", value: "95%" },
            ].map((stat, index) => (
              <div className="col-md-3" key={index}>
                <div className="card bg-dark-custom border-purple h-100 shadow-sm p-4">
                  <h2 className="text-purple display-4 fw-bold">
                    {stat.value}
                  </h2>
                  <p className="mb-0 text-light">{stat.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-dark">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-purple fw-bold">Why Choose EventSphere?</h2>
            <p className="text-white-50 lead">
              Empower your event journey with tools tailored for every attendee.
              From registration to networking — we've got you covered.
            </p>
          </div>
          <div className="row g-4">
            {[
              {
                icon: "bi-check2-circle",
                title: "Easy Registration",
                text: "Sign up for expos and sessions in just a few clicks.",
                points: [
                  "One-click event registration",
                  "Session reminders & updates",
                  "Bookmark your favorite events",
                ],
              },
              {
                icon: "bi-chat-left-text",
                title: "Real-Time Interaction",
                text: "Engage with exhibitors, speakers, and fellow attendees.",
                points: [
                  "Live Q&A during sessions",
                  "Private & group chat with exhibitors",
                  "Request meetings instantly",
                ],
              },
              {
                icon: "bi-graph-up",
                title: "Track Your Journey",
                text: "View insights on your participation and connections.",
                points: [
                  "Personalized dashboard",
                  "Session history & engagement",
                  "Download participation certificates",
                ],
              },
            ].map((feature, index) => (
              <div className="col-lg-4" key={index}>
                <div className="card bg-dark-custom border-purple h-100 shadow-sm">
                  <div className="card-body p-4">
                    <div
                      className="bg-purple rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <i className={`bi ${feature.icon} fs-3 text-white`}></i>
                    </div>
                    <h4 className="text-light">{feature.title}</h4>
                    <p className="text-white-50">{feature.text}</p>
                    <ul className="text-white-50">
                      {feature.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Expo Section */}
      <section className="py-5 bg-dark">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="text-light fw-bold mb-4">
                Explore the <span className="text-purple">Virtual Expo</span>
              </h2>
              <p className="text-white-50 mb-4">
                Dive into a realistic virtual event experience — all from your
                screen.
              </p>
              <div className="d-flex flex-column gap-3">
                {[
                  "Visit Interactive Exhibitor Booths",
                  "Attend Live Product Demos & Sessions",
                  "Chat Directly with Exhibitors",
                  "Download Resources & Presentations",
                ].map((item, index) => (
                  <div className="d-flex align-items-start" key={index}>
                    <i className="bi bi-check-circle-fill text-purple me-3 mt-1"></i>
                    <span className="text-light">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/attendee/expos" className="btn btn-purple mt-4 px-4">
                Enter Virtual Expo
              </Link>
            </div>
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                alt="Virtual expo"
                className="img-fluid rounded-3 shadow-lg border border-purple"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Sessions */}
      <section className="py-5 bg-dark">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2 className="text-purple fw-bold mb-0">
              Upcoming <span className="text-light">Sessions</span>
            </h2>
            <Link to="/attendee/sessions" className="btn btn-outline-light">
              View All Sessions
            </Link>
          </div>
          <div className="row g-4">
            {[1, 2, 3].map((session) => (
              <div className="col-md-4" key={session}>
                <div className="card bg-dark-custom border-purple h-100 p-4 shadow-sm">
                  <div className="mb-3 d-flex justify-content-between">
                    <span className="badge bg-dark-custom text-purple border border-purple">
                      <i className="bi bi-calendar-event me-1"></i> Oct{" "}
                      {18 + session}, 2025
                    </span>
                    <span className="badge bg-dark-custom text-purple border border-purple">
                      <i className="bi bi-clock me-1"></i>{" "}
                      {["10:00 AM", "1:00 PM", "4:00 PM"][session - 1]}
                    </span>
                  </div>
                  <h5 className="text-light fw-bold mb-2">
                    {
                      [
                        "AI in Marketing",
                        "Future of Remote Work",
                        "Sustainable Tech",
                      ][session - 1]
                    }
                  </h5>
                  <p className="text-white-50 mb-3">
                    {
                      [
                        "Explore how AI is revolutionizing digital campaigns.",
                        "Discuss emerging trends in hybrid work environments.",
                        "Discover green innovations shaping tomorrow’s tech.",
                      ][session - 1]
                    }
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="text-purple small">
                      <i className="bi bi-person-video3 me-1"></i>{" "}
                      {["Emily Zhang", "John Malik", "Sara Noor"][session - 1]}
                    </span>
                    <Link
                      to="/attendee/sessions"
                      className="btn btn-sm btn-purple"
                    >
                      View Session
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-dark">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-light fw-bold">
              Trusted by <span className="text-purple">Thousands</span>
            </h2>
            <p className="text-white-50">
              Don’t just take our word for it. Here’s what our community says.
            </p>
          </div>
          <div className="row g-4">
            {[
              {
                quote:
                  "EventSphere revolutionized how we organize our annual conference.",
                name: "Jessica T.",
                role: "Event Organizer, TechConf",
                img: "1",
              },
              {
                quote:
                  "The lead generation tools and analytics helped us measure ROI easily.",
                name: "Michael R.",
                role: "Marketing Director, InnovateX",
                img: "2",
              },
              {
                quote: "The networking opportunities are incredible.",
                name: "Priya K.",
                role: "Freelance Developer",
                img: "3",
              },
            ].map((testimonial, index) => (
              <div className="col-md-4" key={index}>
                <div className="card bg-dark-custom border-purple h-100 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className="bi bi-star-fill text-warning me-1"
                        ></i>
                      ))}
                    </div>
                    <p className="text-light fst-italic mb-4">
                      "{testimonial.quote}"
                    </p>
                    <div className="d-flex align-items-center">
                      <img
                        src={`https://randomuser.me/api/portraits/women/${testimonial.img}.jpg`}
                        className="rounded-circle me-3 border border-purple"
                        width="50"
                        height="50"
                        alt={testimonial.name}
                      />
                      <div>
                        <h6 className="text-purple mb-0">{testimonial.name}</h6>
                        <small className="text-white-50">
                          {testimonial.role}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
