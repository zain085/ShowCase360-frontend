import 'react-toastify/dist/ReactToastify.css';

import React, {
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import CustomCard from '../../components/Card';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [bookmarked, setBookmarked] = useState({});
  const [registeredSessions, setRegisteredSessions] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.role === "attendee") {
      setRegisteredSessions(userData.registeredSessions || []);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionRes, bookmarkRes] = await Promise.all([
          axiosInstance.get("/sessions"),
          axiosInstance.get("/bookmarks"),
        ]);

        if (sessionRes.data.success) setSessions(sessionRes.data.sessions);

        if (bookmarkRes.data.success) {
          const initialBookmarks = {};
          bookmarkRes.data.bookmarks.forEach((b) => {
            initialBookmarks[b.sessionId._id] = true;
          });
          setBookmarked(initialBookmarks);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load sessions or bookmarks");
      }
    };

    fetchData();
  }, []);

  const formatTimeRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const options = { hour: "2-digit", minute: "2-digit" };
    return `${startDate.toLocaleTimeString("en-US", options)} - ${endDate.toLocaleTimeString("en-US", options)}`;
  };

  const getStatusBadge = (status) => {
    const base = "badge rounded-pill px-3 py-1 fw-semibold";
    switch (status) {
      case "upcoming":
        return `${base} bg-warning text-dark`;
      case "live":
        return `${base} bg-success`;
      default:
        return `${base} bg-dark text-white`;
    }
  };

  const toggleBookmark = async (sessionId) => {
    try {
      if (bookmarked[sessionId]) {
        await axiosInstance.delete(`/bookmarks/${sessionId}`);
        setBookmarked((prev) => ({ ...prev, [sessionId]: false }));
        toast.success("Bookmark removed");
      } else {
        await axiosInstance.post("/bookmarks", { sessionId });
        setBookmarked((prev) => ({ ...prev, [sessionId]: true }));
        toast.success("Session bookmarked");
      }
    } catch (err) {
      console.error("Bookmark toggle failed:", err);
      toast.error("Failed to toggle bookmark");
    }
  };

  const handleRegister = async (sessionId) => {
    try {
      const res = await axiosInstance.post(`/auth/register-session/${sessionId}`);
      if (res.data.success) {
        setRegisteredSessions((prev) => [...prev, sessionId]);

        const user = JSON.parse(localStorage.getItem("user"));
        const updatedUser = {
          ...user,
          registeredSessions: [...(user?.registeredSessions || []), sessionId],
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        toast.success("Session registered successfully");
      }
    } catch (err) {
      console.error("Session registration failed:", err);
      toast.error(err.response?.data?.message || "Failed to register for session");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-purple fw-bold mb-4">Featured Sessions</h2>

      <div className="row g-4">
        {sessions.map((session) => {
          const isRegistered = registeredSessions.includes(session._id);
          const isBookmarked = bookmarked[session._id];
          const timeRange = formatTimeRange(session.time.start, session.time.end);

          return (
            <div className="col-md-6 col-lg-4" key={session._id}>
              <CustomCard
                onBookmark={() => toggleBookmark(session._id)}
                isBookmarked={isBookmarked}
              >
                <span
                  className={`${getStatusBadge(session.status)} mb-2 position-absolute`}
                  style={{ top: "24px", left: "12px", zIndex: 2 }}
                >
                  {session.status}
                </span>

                <h5 className="text-light mt-5">{session.topic}</h5>

                <p className="text-secondary small mb-1">
                  <i className="bi bi-person me-1"></i>Speaker: {session.speaker}
                </p>
                <p className="text-secondary small mb-1">
                  <i className="bi bi-clock me-1"></i>{timeRange}
                </p>
                <p className="text-secondary small mb-3">
                  <i className="bi bi-geo-alt me-1"></i>
                  {session.location} {session.expoId?.title ? `— ${session.expoId.title}` : ""}
                </p>

                <button
                  className="btn btn-purple mt-auto"
                  disabled={isRegistered}
                  onClick={() => handleRegister(session._id)}
                >
                  {isRegistered ? "Registered" : "Register"}
                </button>
              </CustomCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sessions;
