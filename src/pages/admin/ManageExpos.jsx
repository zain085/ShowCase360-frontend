import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import ConfirmModal from '../../components/ConfirmModal'; // import your modal
import CustomTable from '../../components/Table';

// Tooltip helper
const TooltipText = ({ title, placement = "top", children }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !window?.bootstrap?.Tooltip) return;

    const old = window.bootstrap.Tooltip.getInstance(ref.current);
    if (old) old.dispose();

    const instance = new window.bootstrap.Tooltip(ref.current, {
      title,
      placement,
      trigger: "hover",
      container: "body",
    });

    return () => instance?.dispose();
  }, [title, placement, children]);

  return (
    <span
      ref={ref}
      data-bs-toggle="tooltip"
      data-bs-placement={placement}
      title={title}
    >
      {children}
    </span>
  );
};

const ManageExpos = () => {
  const [expos, setExpos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpoId, setSelectedExpoId] = useState(null);
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

  const handleDeleteClick = (expoId) => {
    setSelectedExpoId(expoId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/expos/${selectedExpoId}`);
      setExpos((prev) => prev.filter((expo) => expo._id !== selectedExpoId));
      toast.success("Expo deleted successfully");
    } catch (err) {
      console.error("Error deleting expo:", err);
      toast.error("Failed to delete expo");
    } finally {
      setShowModal(false);
      setSelectedExpoId(null);
    }
  };

  const headers = [
    "ID",
    "Title",
    "Description",
    "Theme",
    "Date",
    "Location",
    "Actions",
  ];

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
        renderRow={(expo) => {
          const shortId =
            expo._id && expo._id.length > 6
              ? `...${expo._id.slice(-4)}`
              : expo._id;

          return (
            <>
              <td>
                <TooltipText title={expo._id} placement="top">
                  {shortId}
                </TooltipText>
                <i
                  className="bi bi-clipboard ms-2 text-purple"
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(expo._id);
                      toast.info("Expo ID copied!");
                    } catch {
                      toast.error("Failed to copy ID");
                    }
                  }}
                />
              </td>
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
                    onClick={() => handleDeleteClick(expo._id)}
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                </div>
              </td>
            </>
          );
        }}
      />

      {/* Confirmation Modal */}
      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Delete Expo"
        message="Are you sure you want to delete this expo? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ManageExpos;
