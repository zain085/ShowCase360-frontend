import React, {
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import CustomTable from '../../components/Table';

const AttendeeMessages = () => {
  const [messages, setMessages] = useState([]);

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

  const headers = ["Name", "Sender Email", "Message", "Sent At"];

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
    </>
  );

  return (
    <div className="bg-dark min-vh-100 text-white py-4">
      <div className="container">
        <h2 className="mb-4 text-light">Messages from Attendees</h2>
        <CustomTable headers={headers} rows={messages} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default AttendeeMessages;
