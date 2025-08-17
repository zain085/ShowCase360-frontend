import React from 'react';

import CustomCard from '../../components/Card';

const Dashboard = () => {
  const cardData = [
    {
      icon: 'bi-calendar-event',
      title: 'Total Expos',
      value: '12',
      subtitle: 'Updated today',
    },
    {
      icon: 'bi-person-badge',
      title: 'Exhibitors',
      value: '35',
      subtitle: '+3 this week',
    },
    {
      icon: 'bi-people',
      title: 'Attendees',
      value: '120',
      subtitle: '+15 today',
    },
    {
      icon: 'bi-chat-dots',
      title: 'Feedbacks',
      value: '45',
      subtitle: 'Reviewed this week',
    },
    {
      icon: 'bi-easel',
      title: 'Total Sessions',
      value: '18',
      subtitle: 'Scheduled for next month',
    },
    {
      icon: 'bi-door-open',
      title: 'Total Booths',
      value: '60',
      subtitle: '10 available',
    },
    {
      icon: 'bi-graph-up-arrow',
      title: 'Analytics & Reports',
      value: 'View',
      subtitle: 'Updated regularly',
    },
  ];

  return (
    <div className="container py-4">
      <h2 className="text-light mb-4">Welcome back</h2>

      <div className="row g-4 mb-5">
        {cardData.map((card, index) => (
          <div className="col-md-3" key={index}>
            <CustomCard>
              <div className="text-center">
                <i className={`bi ${card.icon} display-6 text-purple`}></i>
                <h5 className="mt-3 text-white">{card.title}</h5>
                <h3 className="text-purple">{card.value}</h3>
                <small className="text-secondary">{card.subtitle}</small>
              </div>
            </CustomCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
