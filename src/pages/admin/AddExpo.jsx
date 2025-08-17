import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import {
  FormLayout,
  InputField,
  TextAreaField,
} from '../../components/Form';

const AddExpo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    theme: "",
    date: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/expos", formData);
      toast.success("Expo added successfully");
      navigate("/admin/manage-expos");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add expo");
    }
  };

  return (
    <FormLayout title="Add New Expo" onSubmit={handleSubmit}>
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
        Add Expo
      </button>
    </FormLayout>
  );
};

export default AddExpo;
