import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import {
  FormLayout,
  InputField,
  SelectField,
  TextAreaField,
} from '../../components/Form';

const AddSession = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    expoId: '',
    topic: '',
    speaker: '',
    description: '',
    location: '',
    category: '',
    capacity: '',
    status: 'upcoming',
    time: { start: '', end: '' },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'start' || name === 'end') {
      setForm((prev) => ({
        ...prev,
        time: { ...prev.time, [name]: value },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/sessions', form);
      toast.success('Session added successfully');
      navigate('/admin/manage-sessions');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add session');
    }
  };

  return (
    <FormLayout title="Add Session" onSubmit={handleSubmit}>
      <InputField label="Expo ID" name="expoId" value={form.expoId} onChange={handleChange} />
      <InputField label="Topic" name="topic" value={form.topic} onChange={handleChange} />
      <InputField label="Speaker" name="speaker" value={form.speaker} onChange={handleChange} />
      <TextAreaField label="Description" name="description" value={form.description} onChange={handleChange} />
      <InputField label="Location" name="location" value={form.location} onChange={handleChange} />
      <InputField label="Category" name="category" value={form.category} onChange={handleChange} />
      <InputField label="Capacity" name="capacity" type="number" value={form.capacity} onChange={handleChange} />
      <InputField label="Start Time" name="start" type="datetime-local" value={form.time.start} onChange={handleChange} />
      <InputField label="End Time" name="end" type="datetime-local" value={form.time.end} onChange={handleChange} />

      <SelectField
        label="Status"
        name="status"
        value={form.status}
        onChange={handleChange}
        options={[
          { label: "Upcoming", value: "upcoming" },
          { label: "Live", value: "live" },
        ]}
      />

      <button type="submit" className="btn btn-purple">
        Add Session
      </button>
    </FormLayout>
  );
};

export default AddSession;
