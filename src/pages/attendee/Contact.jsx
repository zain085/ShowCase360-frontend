import React, {
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import {
  FormLayout,
  TextAreaField,
} from '../../components/Form';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(null); // Store admin info

  // Pre-fill user name and email
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.username && user?.email) {
      setForm(prev => ({
        ...prev,
        name: user.username,
        email: user.email,
      }));
    }
  }, []);

  // Fetch admin dynamically
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axiosInstance.get("/auth/admin");
        if (res.data.success) setAdmin(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Unable to fetch admin info");
      }
    };
    fetchAdmin();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!admin?._id) {
      toast.error("Admin not available");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/message/send", {
        receiverId: admin._id,
        message: form.message,
        senderName: form.name,
        senderEmail: form.email,
      });

      toast.success("Message sent successfully!");
      setForm(prev => ({ ...prev, message: "" }));
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while sending the message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title={<span className="text-purple fw-bold mb-4">Contact Us</span>}
      onSubmit={handleSubmit}
    >
      <div className="mb-3">
        <label className="form-label text-light">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={form.name}
          readOnly
          disabled
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-light">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={form.email}
          readOnly
          disabled
        />
      </div>

      <TextAreaField
        label="Message"
        name="message"
        value={form.message}
        onChange={handleChange}
        rows={4}
      />

      <button type="submit" className="btn btn-purple" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </FormLayout>
  );
};

export default Contact;
