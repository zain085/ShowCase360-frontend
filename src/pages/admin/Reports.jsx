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
  const [boothData, setBoothData] = useState([]);

  const COLORS = ['#6441a5', '#8e71d1'];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch expo and session analytics
        const [expoRes, sessionRes, boothsAvailableRes, boothsReservedRes] = await Promise.all([
          axiosInstance.get("/analytics/expos"),
          axiosInstance.get("/analytics/sessions"),
          axiosInstance.get("/booths/available"),
          axiosInstance.get("/booths/reserved"),
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

        if (boothsAvailableRes.data.success && boothsReservedRes.data.success) {
          setBoothData([
            { name: 'Available', count: boothsAvailableRes.data.booths.length },
            { name: 'Reserved', count: boothsReservedRes.data.booths.length },
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
    };

    fetchAnalytics();
  }, []);

  // Dummy chart data
  const expoData = [
    { name: 'TechCon', exhibitors: 12 },
    { name: 'HealthExpo', exhibitors: 8 },
    { name: 'EduFair', exhibitors: 5 }
  ];

  const sessionData = [
    { topic: 'AI in Business', attendees: 60 },
    { topic: 'Cybersecurity', attendees: 45 },
    { topic: 'Marketing Trends', attendees: 30 }
  ];

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
              <small className="text-secondary">Based on exhibitor signups</small>
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
              <h5 className='text-white'>Available Booths</h5>
              <h3 className="text-purple">{boothData.find(b => b.name === 'Available')?.count || 0}</h3>
              <small className="text-secondary">Booths not yet reserved</small>
            </div>
          </CustomCard>
        </div>

        <div className="col-md-3">
          <CustomCard>
            <div className="text-center">
              <h5 className='text-white'>Reserved Booths</h5>
              <h3 className="text-purple">{boothData.find(b => b.name === 'Reserved')?.count || 0}</h3>
              <small className="text-secondary">Booths assigned to exhibitors</small>
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
                <Bar dataKey="exhibitors" fill="#6441a5" />
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
                <Bar dataKey="attendees" fill="#8e71d1" />
              </BarChart>
            </ResponsiveContainer>
          </CustomCard>
        </div>
      </div>

      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <CustomCard>
            <h5 className="text-purple mb-3 text-center">Booth Availability</h5>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={boothData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {boothData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
