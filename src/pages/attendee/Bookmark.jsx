import React, {
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import CustomCard from '../../components/Card';

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [registeredSessions, setRegisteredSessions] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.role === "attendee") {
      setRegisteredSessions(userData.registeredSessions || []);
    }
  }, []);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await axiosInstance.get("/bookmarks");
        if (res.data.success) {
          setBookmarks(res.data.bookmarks);
        }
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      }
    };

    fetchBookmarks();
  }, []);

  const formatTimeRange = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    const opts = { hour: "2-digit", minute: "2-digit" };
    return `${s.toLocaleTimeString("en-US", opts)} - ${e.toLocaleTimeString(
      "en-US",
      opts
    )}`;
  };

  const getStatusBadge = (status) => {
    const base = "badge rounded-pill px-3 py-1 fw-semibold";
    switch (status) {
      case "upcoming":
        return `${base} bg-warning text-dark`;
      case "live":
        return `${base} bg-success`;
      case "completed":
        return `${base} bg-secondary`;
      default:
        return `${base} bg-dark text-white`;
    }
  };

  const handleUnbookmark = async (sessionId) => {
    try {
      await axiosInstance.delete(`/bookmarks/${sessionId}`);
      setBookmarks((prev) => prev.filter((b) => b.sessionId._id !== sessionId));
      toast.success("Session removed from bookmarks");
    } catch (err) {
      console.error("Error unbookmarking session:", err);
      toast.error("Failed to remove bookmark");
    }
  };

  const handleRegister = async (sessionId) => {
    if (registeredSessions.includes(sessionId)) return;

    try {
      const res = await axiosInstance.post(
        `/auth/register-session/${sessionId}`
      );
      if (res.data.success) {
        setRegisteredSessions((prev) => [...prev, sessionId]);

        const user = JSON.parse(localStorage.getItem("user"));
        const updatedUser = {
          ...user,
          registeredSessions: [...(user?.registeredSessions || []), sessionId],
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        toast.success("Successfully registered for session");
      }
    } catch (err) {
      console.error("Session registration failed:", err);
      toast.error(
        err.response?.data?.message || "Failed to register for session"
      );
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-purple fw-bold mb-4">Bookmarked Sessions</h2>

      {bookmarks.length === 0 ? (
        <p className="text-secondary">
          You haven't bookmarked any sessions yet.
        </p>
      ) : (
        <div className="row g-4">
          {bookmarks.map((bookmark) => {
            const session = bookmark.sessionId;
            const isRegistered = registeredSessions.includes(session._id);

            return (
              <div className="col-md-6 col-lg-4" key={session._id}>
                <CustomCard
                  isBookmarked={true}
                  onBookmark={() => handleUnbookmark(session._id)}
                >
                  <span
                    className={`${getStatusBadge(session.status)} mb-2`}
                    style={{ width: "fit-content" }}
                  >
                    {session.status}
                  </span>

                  <h5 className="text-light mt-4">{session.topic}</h5>

                  <p className="text-secondary small mb-1">
                    <i className="bi bi-person me-1"></i>Speaker:{" "}
                    {session.speaker}
                  </p>
                  <p className="text-secondary small mb-1">
                    <i className="bi bi-clock me-1"></i>
                    {formatTimeRange(session.time.start, session.time.end)}
                  </p>
                  <p className="text-secondary small mb-3">
                    <i className="bi bi-geo-alt me-1"></i>
                    {session.location}{" "}
                    {session.expoId?.title ? `— ${session.expoId.title}` : ""}
                  </p>

                  <button
                    className="btn btn-purple mt-auto"
                    onClick={() => handleRegister(session._id)}
                    disabled={isRegistered}
                  >
                    {isRegistered ? "Registered" : "Register"}
                  </button>
                </CustomCard>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Bookmark;
