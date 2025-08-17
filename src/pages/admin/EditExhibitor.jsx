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

const EditExhibitor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: '',
    productsOrServices: '',
    contactInfo: '',
    description: '',
    documents: '',
    logo: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchExhibitor = async () => {
      try {
        const res = await axiosInstance.get(`/exhibitors/${id}`);
        const exhibitor = res.data.key;
        setForm({
          companyName: exhibitor.companyName || '',
          productsOrServices: exhibitor.productsOrServices || '',
          contactInfo: exhibitor.contactInfo || '',
          description: exhibitor.description || '',
          documents: exhibitor.documents || '',
          logo: exhibitor.logo || '',
        });
      } catch (err) {
        console.error(err);
        setMessage('Failed to load exhibitor');
      }
    };

    fetchExhibitor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/exhibitors/${id}`, form);
      toast.success('Exhibitor updated successfully!');
      navigate('/admin/manage-exhibitors');
    } catch (err) {
      console.error(err);
      toast.error('Update failed!');
    }
  };

  return (
    <FormLayout title="Edit Exhibitor" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger">{message}</div>}

      <InputField
        label="Company Name"
        name="companyName"
        value={form.companyName}
        onChange={handleChange}
      />

      <InputField
        label="Products or Services"
        name="productsOrServices"
        value={form.productsOrServices}
        onChange={handleChange}
      />

      <InputField
        label="Contact Info"
        name="contactInfo"
        value={form.contactInfo}
        onChange={handleChange}
      />

      <TextAreaField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        rows={3}
      />

      <InputField
        label="Documents"
        name="documents"
        value={form.documents}
        onChange={handleChange}
        required={false}
      />

      <InputField
        label="Logo URL"
        name="logo"
        value={form.logo}
        onChange={handleChange}
        required={false}
      />

      <button type="submit" className="btn btn-purple px-4">
        Update Exhibitor
      </button>
    </FormLayout>
  );
};

export default EditExhibitor;
