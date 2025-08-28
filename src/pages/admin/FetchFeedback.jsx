import React, {
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import ConfirmModal from '../../components/ConfirmModal';
import CustomTable from '../../components/Table';

const FetchFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Fetch all feedbacks
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axiosInstance.get("/feedback");
        if (response.data.success) {
          setFeedbacks(response.data.feedbacks);
        } else {
          toast.error("Failed to fetch feedbacks");
          console.error("Failed to fetch feedbacks");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching feedbacks");
      }
    };

    fetchFeedbacks();
  }, []);

  // Open confirmation modal
  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  // Handle delete action
  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/feedback/${selectedId}`);
      if (res.data.success) {
        toast.success("Feedback deleted successfully");
        setFeedbacks(feedbacks.filter((fb) => fb._id !== selectedId));
      } else {
        toast.error("Failed to delete feedback");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting feedback");
    } finally {
      setShowModal(false);
      setSelectedId(null);
    }
  };

  const headers = ["Username", "Email", "Message", "Submitted At", "Actions"];

  const renderRow = (fb) => (
    <>
      <td>{fb.userId?.username || "N/A"}</td>
      <td>{fb.userId?.email || "N/A"}</td>
      <td>{fb.message}</td>
      <td>{new Date(fb.createdAt).toLocaleString()}</td>
      <td>
        <button
          className="btn btn-sm btn-outline-danger"
          title="Delete"
          onClick={() => confirmDelete(fb._id)}
        >
          <i className="bi bi-trash3-fill"></i>
        </button>
      </td>
    </>
  );

  return (
    <div className="bg-dark min-vh-100 text-white py-4">
      <div className="container">
        <h2 className="mb-4 text-light">User Feedbacks</h2>
        <CustomTable headers={headers} rows={feedbacks} renderRow={renderRow} />
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Delete Feedback"
        message="Are you sure you want to delete this feedback?"
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
        danger={true}
      />
    </div>
  );
};

export default FetchFeedback;
