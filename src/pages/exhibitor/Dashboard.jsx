import React from 'react';

const ExhibitorDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "User";

  const cards = [
    {
      icon: "bi bi-calendar2-check",
      title: "Registered Expos",
      value: "5",
      subtitle: "Active: 2",
    },
    {
      icon: "bi bi-shop",
      title: "Booth Visits",
      value: "230",
      subtitle: "This Week",
    },
    {
      icon: "bi bi-chat-dots",
      title: "Messages",
      value: "14",
      subtitle: "Unread: 3",
    },
    {
      icon: "bi bi-file-earmark-text",
      title: "Uploaded Documents",
      value: "8",
      subtitle: "Verified: 6",
    },
    {
      icon: "bi bi-person-badge",
      title: "Profile Status",
      value: "Complete",
      subtitle: "100%",
    },
    {
      icon: "bi bi-graph-up-arrow",
      title: "Engagement",
      value: "87%",
      subtitle: "Visitor Interest",
    },
  ];

  return (
    <div className="container py-4">
      <h3 className="text-light mb-4">
        Welcome back, <span className="text-purple">{username}</span>
      </h3>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {cards.map((card, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card bg-dark-custom text-light border-purple shadow-sm h-100 text-center rounded-4">
              <div className="card-body d-flex flex-column justify-content-center">
                <i className={`${card.icon} display-5 text-purple mb-3`}></i>
                <h5 className="fw-semibold">{card.title}</h5>
                <h3 className="text-purple fw-bold">{card.value}</h3>
                <small className="text-secondary">{card.subtitle}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExhibitorDashboard;
