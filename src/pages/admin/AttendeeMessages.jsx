import React, {
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import ConfirmModal from '../../components/ConfirmModal';
import CustomTable from '../../components/Table';

const AttendeeMessages = () => {
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get("/message/attendee-to-admin");
        if (response.data.success) {
          setMessages(response.data.data);
        } else {
          toast.error("Failed to fetch messages");
          console.error("Failed to fetch messages");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching messages");
      }
    };
    fetchMessages();
  }, []);

  // Open confirmation modal
  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  // Handle deletion
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/message/${selectedId}`);
      if (response.data.success) {
        toast.success("Message deleted successfully");
        setMessages(messages.filter((msg) => msg._id !== selectedId));
      } else {
        toast.error("Failed to delete message");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting message");
    } finally {
      setShowModal(false);
      setSelectedId(null);
    }
  };

  const headers = ["Name", "Sender Email", "Message", "Sent At", "Action"];

  const renderRow = (msg) => (
    <>
      <td>{msg.senderName}</td>
      <td>{msg.senderEmail}</td>
      <td>
        <div className="truncate-hover" title={msg.message}>
          {msg.message}
        </div>
      </td>
      <td>{new Date(msg.createdAt).toLocaleString()}</td>
      <td>
        <button
          className="btn btn-sm btn-outline-danger"
          title="Delete"
          onClick={() => confirmDelete(msg._id)}
        >
          <i className="bi bi-trash3-fill"></i>
        </button>
      </td>
    </>
  );

  return (
    <div className="bg-dark min-vh-100 text-white py-4">
      <div className="container">
        <h2 className="mb-4 text-light">Messages from Attendees</h2>
        <CustomTable headers={headers} rows={messages} renderRow={renderRow} />

        <ConfirmModal
          show={showModal}
          onHide={() => setShowModal(false)}
          title="Delete Message"
          message="Are you sure you want to delete this message?"
          onConfirm={handleDelete}
          confirmText="Delete"
          cancelText="Cancel"
          danger
        />
      </div>
    </div>
  );
};

export default AttendeeMessages;
