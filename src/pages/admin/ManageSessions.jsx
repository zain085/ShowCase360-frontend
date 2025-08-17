import 'react-toastify/dist/ReactToastify.css';

import React, {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import CustomTable from '../../components/Table';

const ManageSessions = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await axiosInstance.get("/sessions");
      setSessions(res.data.sessions || []);
    } catch (err) {
      console.error("Error fetching sessions:", err);
      toast.error("Failed to load sessions.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this session?"))
      return;
    try {
      await axiosInstance.delete(`/sessions/${id}`);
      toast.success("Session deleted successfully!");
      fetchSessions();
    } catch (err) {
      console.error("Error deleting session:", err);
      toast.error("Failed to delete session.");
    }
  };

  const headers = [
    "Topic",
    "Speaker",
    "Description",
    "Time",
    "Location",
    "Category",
    "Capacity",
    "Status",
    "Actions",
  ];

  const renderRow = (session) => (
    <>
      <td>{session.topic}</td>
      <td>{session.speaker}</td>
      <td>
        <div className="truncate-hover" title={session.description}>
          {session.description}
        </div>
      </td>
      <td>
        <div
          className="truncate-hover"
          title={`${session.time?.start} - ${session.time?.end}`}
        >
          {session.time?.start} - {session.time?.end}
        </div>
      </td>
      <td>
        <div className="truncate-hover" title={session.location}>
          {session.location}
        </div>
      </td>
      <td>{session.category}</td>
      <td>{session.capacity}</td>
      <td
        className={`fw-bold ${
          session.status === "live"
            ? "text-success"
            : session.status === "upcoming"
            ? "text-warning"
            : "text-light"
        }`}
      >
        {session.status}
      </td>
      <td>
        <div className="d-flex justify-content-center gap-2">
          <button
            className="btn btn-sm btn-outline-warning"
            title="Update"
            onClick={() => navigate(`/admin/sessions/update/${session._id}`)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            title="Delete"
            onClick={() => handleDelete(session._id)}
          >
            <i className="bi bi-trash3-fill"></i>
          </button>
        </div>
      </td>
    </>
  );

  return (
    <div className="bg-dark min-vh-100 text-white py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-light">Manage Sessions</h2>
          <button
            className="btn btn-purple"
            onClick={() => navigate("/admin/sessions/add")}
          >
            + Add Session
          </button>
        </div>

        <CustomTable headers={headers} rows={sessions} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default ManageSessions;
