import React, {
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import CustomTable from '../../components/Table';

const FetchFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

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

  const headers = ["Username", "Email", "Message", "Submitted At"];

  const renderRow = (fb) => (
    <>
      <td>{fb.userId?.username || "N/A"}</td>
      <td>{fb.userId?.email || "N/A"}</td>
      <td>{fb.message}</td>
      <td>{new Date(fb.createdAt).toLocaleString()}</td>
    </>
  );

  return (
    <div className="bg-dark min-vh-100 text-white py-4">
      <div className="container">
        <h2 className="mb-4 text-light">User Feedbacks</h2>
        <CustomTable headers={headers} rows={feedbacks} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default FetchFeedback;
