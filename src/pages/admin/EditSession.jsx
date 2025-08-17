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
  SelectField,
  TextAreaField,
} from '../../components/Form';

const EditSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    topic: '',
    speaker: '',
    description: '',
    location: '',
    category: '',
    capacity: '',
    status: 'upcoming',
    time: { start: '', end: '' },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axiosInstance.get(`/sessions/${id}`);
        const session = res.data.session;

        const formatDate = (isoString) => {
          if (!isoString) return '';
          const d = new Date(isoString);
          const pad = (n) => String(n).padStart(2, '0');
          return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
        };

        setForm({
          topic: session.topic || '',
          speaker: session.speaker || '',
          description: session.description || '',
          location: session.location || '',
          category: session.category || '',
          capacity: session.capacity || '',
          status: session.status || 'upcoming',
          time: {
            start: formatDate(session.time?.start),
            end: formatDate(session.time?.end),
          },
        });
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch session');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'start' || name === 'end') {
      setForm((prev) => ({
        ...prev,
        time: { ...prev.time, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/sessions/${id}`, form);
      toast.success('Session updated successfully');
      navigate('/admin/manage-sessions');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update session');
    }
  };

  if (loading) {
    return <div className="text-center text-light py-5">Loading Session...</div>;
  }

  return (
    <FormLayout title="Edit Session" onSubmit={handleSubmit}>
      <InputField
        label="Topic"
        name="topic"
        value={form.topic}
        onChange={handleChange}
      />

      <InputField
        label="Speaker"
        name="speaker"
        value={form.speaker}
        onChange={handleChange}
      />

      <InputField
        label="Location"
        name="location"
        value={form.location}
        onChange={handleChange}
      />

      <InputField
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
      />

      <InputField
        label="Capacity"
        name="capacity"
        type="number"
        value={form.capacity}
        onChange={handleChange}
      />

      <SelectField
        label="Status"
        name="status"
        value={form.status}
        onChange={handleChange}
        options={[
          { label: 'Upcoming', value: 'upcoming' },
          { label: 'Live', value: 'live' },
        ]}
      />

      <InputField
        label="Start Time"
        name="start"
        type="datetime-local"
        value={form.time.start}
        onChange={handleChange}
      />

      <InputField
        label="End Time"
        name="end"
        type="datetime-local"
        value={form.time.end}
        onChange={handleChange}
      />

      <TextAreaField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        rows={4}
      />

      <button type="submit" className="btn btn-purple">
        Update Session
      </button>
    </FormLayout>
  );
};

export default EditSession;
