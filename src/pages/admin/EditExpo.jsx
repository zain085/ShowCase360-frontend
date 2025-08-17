import React, {
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import {
  FormLayout,
  InputField,
  TextAreaField,
} from '../../components/Form';

const EditExpo = () => {
  const { expoId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    theme: '',
    date: '',
    location: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpoDetails = async () => {
      try {
        const response = await axiosInstance.get(`/expos/${expoId}`);
        const expo = response.data.expo;
        setFormData({
          title: expo.title || '',
          description: expo.description || '',
          theme: expo.theme || '',
          date: expo.date ? expo.date.slice(0, 10) : '',
          location: expo.location || '',
        });
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch expo details');
      } finally {
        setLoading(false);
      }
    };
    fetchExpoDetails();
  }, [expoId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/expos/${expoId}`, formData);
      toast.success('Expo updated successfully');
      navigate('/admin/manage-expos');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to update expo');
    }
  };

  if (loading) {
    return <div className="text-center text-light py-5">Loading Expo...</div>;
  }

  return (
    <FormLayout title="Edit Expo" onSubmit={handleSubmit}>
      <InputField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />

      <TextAreaField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={4}
      />

      <InputField
        label="Theme"
        name="theme"
        value={formData.theme}
        onChange={handleChange}
      />

      <InputField
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
      />

      <InputField
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
      />

      <button type="submit" className="btn btn-purple">
        Update Expo
      </button>
    </FormLayout>
  );
};

export default EditExpo;
