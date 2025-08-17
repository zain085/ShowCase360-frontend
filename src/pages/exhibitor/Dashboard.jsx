import React from 'react';

const ExhibitorDashboard = () => {
  return (
    <div className="container py-4">
      <h3 className="text-light mb-4">Welcome back</h3>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card bg-dark-custom text-light border-purple shadow text-center">
            <div className="card-body">
              <i className="bi bi-calendar2-check display-6 text-purple"></i>
              <h5 className="mt-3">My Registered Expos</h5>
              <h3 className="text-purple">5</h3>
              <small className="text-secondary">Active: 2</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-dark-custom text-light border-purple shadow text-center">
            <div className="card-body">
              <i className="bi bi-shop display-6 text-purple"></i>
              <h5 className="mt-3">Booth Visits</h5>
              <h3 className="text-purple">230</h3>
              <small className="text-secondary">This Week</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-dark-custom text-light border-purple shadow text-center">
            <div className="card-body">
              <i className="bi bi-chat-dots display-6 text-purple"></i>
              <h5 className="mt-3">Messages</h5>
              <h3 className="text-purple">14</h3>
              <small className="text-secondary">Unread: 3</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitorDashboard;
