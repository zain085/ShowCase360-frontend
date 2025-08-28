import React, {
  useEffect,
  useState,
} from 'react';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import CustomCard from '../../components/Card.jsx';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "User";

  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/analytics/dashboard");
        if (res.data.success) {
          setStats(res.data.data);
        } else {
          toast.error("Failed to fetch dashboard stats");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching dashboard stats");
      }
    };

    fetchStats();
  }, []);

  const cardData = stats
  ? [
      {
        icon: "bi-calendar3", 
        title: "Total Expos",
        value: stats.totalExpos,
        subtitle: "Updated today",
      },
      {
        icon: "bi-person-badge-fill", 
        title: "Exhibitors",
        value: stats.totalExhibitors,
        subtitle: "+3 this week",
      },
      {
        icon: "bi-people-fill", 
        title: "Attendees",
        value: stats.totalAttendees,
        subtitle: "+15 today",
      },
      {
        icon: "bi-card-text", 
        title: "Feedbacks",
        value: stats.totalFeedbacks,
        subtitle: "Reviewed this week",
      },
      {
        icon: "bi-journal-check", 
        title: "Total Sessions",
        value: stats.totalSessions,
        subtitle: "Scheduled for next month",
      },
      {
        icon: "bi-door-closed", 
        title: "Total Booths",
        value: stats.totalBooths,
        subtitle: "10 available",
      },
      {
        icon: "bi-chat-left-text", 
        title: "Total Messages",
        value: stats.totalMessages,
        subtitle: `${stats.totalAttendeeMessages} from attendees, ${stats.totalExhibitorMessages} from exhibitors`,
      },
      {
        icon: "bi-bar-chart-line", 
        title: "Analytics & Reports",
        value: (
          <Link
            to="/admin/reports"
            className="text-purple text-decoration-none"
          >
            View
          </Link>
        ),
        subtitle: "Updated regularly",
      },
    ]
  : [];


  return (
    <div className="container py-4">
      <h2 className="text-light mb-4">
        Welcome back <span className="text-purple">{username}</span> 👨‍💼
      </h2>

      <div className="row g-4 mb-5">
        {cardData.length > 0 ? (
          cardData.map((card, index) => (
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
          ))
        ) : (
          <p className="text-secondary">Loading dashboard stats...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
