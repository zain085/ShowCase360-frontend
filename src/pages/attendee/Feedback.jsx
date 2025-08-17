import React, { useState } from 'react';

import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import {
  FormLayout,
  TextAreaField,
} from '../../components/Form';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post('/feedback', { message: feedback });

      if (res.data.success) {
        toast.success(res.data.message || 'Feedback submitted!');
        setFeedback('');
      }
    } catch (err) {
      console.error(err);
      const errorMsg =
        err.response?.data?.message || 'Something went wrong. Try again.';
      toast.error(errorMsg);
    }
  };

  return (
    <FormLayout title="Give Us Your Feedback" onSubmit={handleSubmit}>
      <TextAreaField
        label="Your Feedback"
        name="feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows={5}
      />

      <button type="submit" className="btn btn-purple mt-3">
        Submit
      </button>
    </FormLayout>
  );
};

export default Feedback;
