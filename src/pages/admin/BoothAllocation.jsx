import React, {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import ConfirmModal from '../../components/ConfirmModal';
import CustomTable from '../../components/Table';

const ManageBooths = () => {
  const [availableBooths, setAvailableBooths] = useState([]);
  const [reservedBooths, setReservedBooths] = useState([]);
  const [filter, setFilter] = useState("available");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
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
      setAvailableBooths(availableRes.data.booths || []);
      setReservedBooths(reservedRes.data.booths || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch booth data");
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/booths/${selectedId}`);
      toast.success("Booth deleted successfully");
      fetchBooths();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete booth");
    } finally {
      setShowModal(false);
      setSelectedId(null);
    }
  };

  const boothsToRender =
    filter === "available" ? availableBooths : reservedBooths;

  const headers = [
    "Booth #",
    "Location",
    "Status",
    "Exhibitor",
    "Expo",
    "Actions",
  ];

  const renderRow = (booth) => (
    <>
      <td>{booth.boothNumber}</td>
      <td>{booth.location}</td>
      <td
        className={`fw-bold ${
          booth.status === "available"
            ? "text-success"
            : booth.status === "reserved"
            ? "text-danger"
            : "text-light"
        }`}
      >
        {booth.status}
      </td>
      <td>{booth.exhibitorId?.companyName || "N/A"}</td>
      <td>{booth.expoId?.title || "N/A"}</td>
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
            onClick={() => confirmDelete(booth._id)}
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
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-light">Manage Booths</h2>
          <button
            className="btn btn-purple"
            onClick={() => navigate("/admin/booths/add")}
          >
            + Add Booth
          </button>
        </div>

        {/* Filter Toggle */}
        <div className="btn-group mb-4">
          <button
            className={`btn ${
              filter === "available" ? "btn-purple" : "btn-outline-light"
            }`}
            onClick={() => setFilter("available")}
          >
            Available Booths
          </button>
          <button
            className={`btn ${
              filter === "reserved" ? "btn-purple" : "btn-outline-light"
            }`}
            onClick={() => setFilter("reserved")}
          >
            Reserved Booths
          </button>
        </div>

        {/* Table */}
        <CustomTable
          headers={headers}
          rows={boothsToRender}
          renderRow={renderRow}
        />
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Delete Booth"
        message="Are you sure you want to delete this booth?"
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
};

export default ManageBooths;
