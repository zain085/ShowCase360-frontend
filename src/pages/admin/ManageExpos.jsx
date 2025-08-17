import React, {
  useEffect,
  useState,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import CustomTable from '../../components/Table';

const ManageExpos = () => {
  const [expos, setExpos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpos();
  }, []);

  const fetchExpos = async () => {
    try {
      const response = await axiosInstance.get("/expos");
      setExpos(response.data.expos || []);
    } catch (err) {
      console.error("Error fetching expos:", err);
      toast.error("Failed to fetch expos");
    }
  };

  const handleDelete = async (expoId) => {
    if (!window.confirm("Are you sure you want to delete this expo?")) return;
    try {
      await axiosInstance.delete(`/expos/${expoId}`);
      setExpos((prev) => prev.filter((expo) => expo._id !== expoId));
      toast.success("Expo deleted successfully");
    } catch (err) {
      console.error("Error deleting expo:", err);
      toast.error("Failed to delete expo");
    }
  };

  const headers = ["Title", "Description", "Theme", "Date", "Location", "Actions"];

  return (
    <div className="container py-4 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Expos</h2>
        <Link to="/admin/add-expo" className="btn btn-purple">
          + Add Expo
        </Link>
      </div>

      <CustomTable
        headers={headers}
        rows={expos}
        renderRow={(expo) => (
          <>
            <td>{expo.title}</td>
            <td>
              <div className="truncate-hover" title={expo.description}>
                {expo.description}
              </div>
            </td>
            <td>{expo.theme}</td>
            <td>{new Date(expo.date).toLocaleDateString()}</td>
            <td>{expo.location}</td>
            <td>
              <div className="d-flex justify-content-center gap-2">
                <button
                  className="btn btn-sm btn-outline-warning"
                  title="Edit"
                  onClick={() => navigate(`/admin/edit-expo/${expo._id}`)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  title="Delete"
                  onClick={() => handleDelete(expo._id)}
                >
                  <i className="bi bi-trash3-fill"></i>
                </button>
              </div>
            </td>
          </>
        )}
      />
    </div>
  );
};

export default ManageExpos;
