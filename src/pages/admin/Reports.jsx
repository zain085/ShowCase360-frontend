import React, {
  useEffect,
  useState,
} from 'react';

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import axiosInstance from '../../api/axiosInstance';
import CustomCard from '../../components/Card';

const Reports = () => {
  const [expoCount, setExpoCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [expoRes, sessionRes] = await Promise.all([
          axiosInstance.get("/analytics/expos"),
          axiosInstance.get("/analytics/sessions"),
        ]);

        if (expoRes.data.success && sessionRes.data.success) {
          const expoRegistrations = expoRes.data.data.reduce(
            (total, expo) => total + expo.attendeeCount,
            0
          );

          const sessionRegistrations = sessionRes.data.data.reduce(
            (total, session) => total + session.attendeeCount,
            0
          );

          setExpoCount(expoRegistrations);
          setSessionCount(sessionRegistrations);
        }
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
    };

    fetchAnalytics();
  }, []);

  const expoData = [
    { name: 'TechCon', attendees: 400 },
    { name: 'HealthExpo', attendees: 300 },
    { name: 'EduFair', attendees: 250 }
  ];

  const sessionData = [
    { topic: 'AI in Business', count: 60 },
    { topic: 'Cybersecurity', count: 45 },
    { topic: 'Marketing Trends', count: 30 }
  ];

  const boothData = [
    { booth: 'CyberTech', visits: 320 },
    { booth: 'GreenEnergy', visits: 270 },
    { booth: 'EduZone', visits: 180 }
  ];

  const feedbackData = [
    { category: 'Clarity', value: 180 },
    { category: 'Engagement', value: 120 },
    { category: 'Content', value: 90 }
  ];

  const COLORS = ['#6441a5', '#8e71d1', '#bca6ff'];

  return (
    <div className="container py-4">
      <h3 className="text-light mb-4">Analytics & Reports</h3>

      {/* Overview Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <CustomCard>
            <div className="text-center">
              <h5 className='text-white'>Registered Expos</h5>
              <h3 className="text-purple">{expoCount}</h3>
              <small className="text-secondary">Based on attendee signups</small>
            </div>
          </CustomCard>
        </div>

        <div className="col-md-3">
          <CustomCard>
            <div className="text-center">
              <h5 className='text-white'>Registered Sessions</h5>
              <h3 className="text-purple">{sessionCount}</h3>
              <small className="text-secondary">Based on attendee signups</small>
            </div>
          </CustomCard>
        </div>

        <div className="col-md-3">
          <CustomCard>
            <div className="text-center">
              <h5 className='text-white'>Booth Interactions</h5>
              <h3 className="text-purple">34</h3>
              <small className="text-secondary">Top: A12, B07</small>
            </div>
          </CustomCard>
        </div>

        <div className="col-md-3">
          <CustomCard>
            <div className="text-center">
              <h5 className='text-white'>Feedback Entries</h5>
              <h3 className="text-purple">27</h3>
              <small className="text-secondary">Mostly positive</small>
            </div>
          </CustomCard>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row g-4">
        <div className="col-md-6">
          <CustomCard>
            <h5 className="text-purple mb-3 text-center">Expo Registrations</h5>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={expoData}>
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="attendees" fill="#6441a5" />
              </BarChart>
            </ResponsiveContainer>
          </CustomCard>
        </div>

        <div className="col-md-6">
          <CustomCard>
            <h5 className="text-purple mb-3 text-center">Session Registrations</h5>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sessionData}>
                <XAxis dataKey="topic" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="count" fill="#8e71d1" />
              </BarChart>
            </ResponsiveContainer>
          </CustomCard>
        </div>
      </div>

      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <CustomCard>
            <h5 className="text-purple mb-3 text-center">Booth Interactions</h5>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={boothData}>
                <XAxis dataKey="booth" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="visits" fill="#bca6ff" />
              </BarChart>
            </ResponsiveContainer>
          </CustomCard>
        </div>

        <div className="col-md-6">
          <CustomCard>
            <h5 className="text-purple mb-3 text-center">Feedback Breakdown</h5>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={feedbackData}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {feedbackData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CustomCard>
        </div>
      </div>
    </div>
  );
};

export default Reports;
