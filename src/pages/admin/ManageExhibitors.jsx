import React, {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import ConfirmModal from '../../components/ConfirmModal'; // import modal
import CustomTable from '../../components/Table';

const ManageExhibitors = () => {
  const [exhibitors, setExhibitors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const res = await axiosInstance.get("/exhibitors");
        setExhibitors(res.data.exhibitors);
      } catch (err) {
        console.error("Error fetching exhibitors:", err);
        toast.error("Failed to fetch exhibitors");
        setExhibitors([]);
      }
    };

    fetchExhibitors();
  }, []);

  const openModal = ({ title, message, onConfirm, danger = false }) => {
    setModalConfig({ title, message, onConfirm, danger });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    openModal({
      title: "Delete Exhibitor",
      message: "Are you sure you want to delete this exhibitor? This action cannot be undone.",
      danger: true,
      onConfirm: async () => {
        try {
          await axiosInstance.delete(`/exhibitors/${id}`);
          setExhibitors((prev) => prev.filter((ex) => ex._id !== id));
          toast.success("Exhibitor deleted successfully");
        } catch (err) {
          console.error("Error deleting exhibitor:", err);
          toast.error("Failed to delete exhibitor");
        } finally {
          setShowModal(false);
        }
      },
    });
  };

  const handleApprove = (id) => {
    openModal({
      title: "Approve Exhibitor",
      message: "Are you sure you want to approve this exhibitor?",
      onConfirm: async () => {
        try {
          await axiosInstance.put(`/exhibitors/${id}/approve`);
          setExhibitors((prev) =>
            prev.map((ex) =>
              ex._id === id ? { ...ex, applicationStatus: "approved" } : ex
            )
          );
          toast.success("Exhibitor approved");
        } catch (err) {
          console.error("Error approving exhibitor:", err);
          toast.error("Failed to approve exhibitor");
        } finally {
          setShowModal(false);
        }
      },
    });
  };

  const handleReject = (id) => {
    openModal({
      title: "Reject Exhibitor",
      message: "Are you sure you want to reject this exhibitor?",
      danger: true,
      onConfirm: async () => {
        try {
          await axiosInstance.put(`/exhibitors/${id}/reject`);
          setExhibitors((prev) =>
            prev.map((ex) =>
              ex._id === id ? { ...ex, applicationStatus: "rejected" } : ex
            )
          );
          toast.success("Exhibitor rejected");
        } catch (err) {
          console.error("Error rejecting exhibitor:", err);
          toast.error("Failed to reject exhibitor");
        } finally {
          setShowModal(false);
        }
      },
    });
  };

  const headers = [
    "Logo",
    "Company",
    "Contact",
    "Products/Services",
    "Description",
    "Status",
    "Documents",
    "Approve/Reject",
    "Actions",
  ];

  return (
    <div className="container py-4 text-white">
      <h2 className="mb-4">Manage Exhibitors</h2>

      <CustomTable
        headers={headers}
        rows={exhibitors}
        renderRow={(ex) => (
          <>
            <td className="text-center">
              <img
                src={ex.logo}
                alt="Logo"
                className="rounded"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
            </td>
            <td>{ex.companyName}</td>
            <td>{ex.contactInfo}</td>
            <td>
              <div className="truncate-hover" title={ex.productsOrServices}>
                {ex.productsOrServices}
              </div>
            </td>
            <td>
              <div className="truncate-hover" title={ex.description}>
                {ex.description}
              </div>
            </td>
            <td
              className={`fw-bold ${
                ex.applicationStatus === "approved"
                  ? "text-success"
                  : ex.applicationStatus === "rejected"
                  ? "text-danger"
                  : ""
              }`}
            >
              {ex.applicationStatus}
            </td>
            <td>
              {ex.documents?.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-block text-decoration-underline text-primary"
                >
                  Doc {idx + 1}
                </a>
              ))}
            </td>
            <td>
              <div className="d-flex justify-content-center gap-2">
                <button
                  className="btn btn-sm btn-outline-success"
                  title="Approve"
                  onClick={() => handleApprove(ex._id)}
                >
                  <i className="bi bi-check2-circle"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  title="Reject"
                  onClick={() => handleReject(ex._id)}
                >
                  <i className="bi bi-x-circle-fill"></i>
                </button>
              </div>
            </td>
            <td>
              <div className="d-flex justify-content-center gap-2">
                <button
                  className="btn btn-sm btn-outline-warning"
                  title="Edit"
                  onClick={() => navigate(`/admin/edit-exhibitor/${ex._id}`)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  title="Delete"
                  onClick={() => handleDelete(ex._id)}
                >
                  <i className="bi bi-trash3-fill"></i>
                </button>
              </div>
            </td>
          </>
        )}
      />

      {/* Confirmation Modal */}
      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={modalConfig.onConfirm}
        confirmText="Confirm"
        cancelText="Cancel"
        danger={modalConfig.danger}
      />
    </div>
  );
};

export default ManageExhibitors;
