import React, {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import CustomTable from '../../components/Table';

const ManageBooths = () => {
  const [availableBooths, setAvailableBooths] = useState([]);
  const [reservedBooths, setReservedBooths] = useState([]);
  const [filter, setFilter] = useState("available");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooths();
  }, []);

  const fetchBooths = async () => {
    try {
      const [availableRes, reservedRes] = await Promise.all([
        axiosInstance.get("/booths/available"),
        axiosInstance.get("/booths/reserved"),
      ]);
      setAvailableBooths(availableRes.data.booths);
      setReservedBooths(reservedRes.data.booths);
    } catch (err) {
      console.error("Error fetching booths:", err);
      toast.error("Failed to fetch booth data");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booth?")) return;
    try {
      await axiosInstance.delete(`/booths/${id}`);
      toast.success("Booth deleted successfully");
      fetchBooths();
    } catch (err) {
      console.error("Error deleting booth:", err);
      toast.error("Failed to delete booth");
    }
  };

  const boothsToRender = filter === "available" ? availableBooths : reservedBooths;

  const headers = ["Booth #", "Location", "Status", "Exhibitor", "Expo ID", "Actions"];

  const renderRow = (booth) => (
    <>
      <td>{booth.boothNumber}</td>
      <td>{booth.location}</td>
      <td>{booth.status}</td>
      <td>
        {booth.exhibitorId
          ? booth.exhibitorId.companyName || booth.exhibitorId._id || "Assigned"
          : "N/A"}
      </td>
      <td>{booth.expoId}</td>
      <td>
        <div className="d-flex justify-content-center gap-2">
          <button
            className="btn btn-sm btn-outline-warning"
            title="Assign/Unassign"
            onClick={() => navigate(`/admin/booths/edit/${booth._id}`)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            title="Delete"
            onClick={() => handleDelete(booth._id)}
          >
            <i className="bi bi-trash3-fill"></i>
          </button>
        </div>
      </td>
    </>
  );

  return (
    <div className="container py-4 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Booths</h2>
        <button
          className="btn btn-purple"
          onClick={() => navigate("/admin/booths/add")}
        >
          + Add Booth
        </button>
      </div>

      <div className="btn-group mb-4">
        <button
          className={`btn ${filter === "available" ? "btn-purple" : "btn-outline-light"}`}
          onClick={() => setFilter("available")}
        >
          Available Booths
        </button>
        <button
          className={`btn ${filter === "reserved" ? "btn-purple" : "btn-outline-light"}`}
          onClick={() => setFilter("reserved")}
        >
          Reserved Booths
        </button>
      </div>

      <CustomTable headers={headers} rows={boothsToRender} renderRow={renderRow} />
    </div>
  );
};

export default ManageBooths;
