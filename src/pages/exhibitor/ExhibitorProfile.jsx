import React, {
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import {
  FormLayout,
  InputField,
  TextAreaField,
} from '../../components/Form';

const ExhibitorProfile = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    productsOrServices: '',
    contactInfo: '',
    description: '',
    logo: '',
    documents: [],
    applicationStatus: '',
    createdAt: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExhibitorData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const res = await axiosInstance.get(`/exhibitors/user/${userId}`);
        if (res.data.success) {
          const {
            companyName,
            productsOrServices,
            contactInfo,
            description,
            logo,
            documents,
            applicationStatus,
            createdAt,
          } = res.data.key;

          setFormData({
            companyName,
            productsOrServices,
            contactInfo,
            description,
            logo,
            documents: documents || [],
            applicationStatus,
            createdAt,
          });
        }
      } catch (err) {
        console.error(err);
        if (err.response?.status === 404) {
          toast.info('No exhibitor profile found. Please create one first');
        } else {
          toast.error('Failed to fetch exhibitor data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitorData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'documents') {
      setFormData({ ...formData, documents: value.split(',').map((doc) => doc.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put('/exhibitors/profile/update', formData);
      res.data.success
        ? toast.success('Profile updated successfully')
        : toast.error('Profile update failed');
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while updating profile');
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      approved: 'success',
      rejected: 'danger',
      pending: 'warning',
    };
    return (
      <span className={`badge bg-${map[status] || 'secondary'} text-capitalize`}>
        {status || 'N/A'}
      </span>
    );
  };

  if (loading) return <p className="text-light text-center mt-5">Loading...</p>;

  return (
    <FormLayout title="Exhibitor Profile" onSubmit={handleSubmit}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div><strong>Status:</strong> {getStatusBadge(formData.applicationStatus)}</div>
        <div>
          <strong>Registered:</strong>{' '}
          <span className="text-secondary">
            {formData.createdAt
              ? new Date(formData.createdAt).toLocaleDateString()
              : 'N/A'}
          </span>
        </div>
      </div>

      <InputField
        label="Company Name"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
      />

      <InputField
        label="Contact Info"
        name="contactInfo"
        value={formData.contactInfo}
        onChange={handleChange}
      />

      <InputField
        label="Products/Services"
        name="productsOrServices"
        value={formData.productsOrServices}
        onChange={handleChange}
      />

      <TextAreaField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={3}
      />

      <InputField
        label="Logo URL"
        name="logo"
        value={formData.logo}
        onChange={handleChange}
      />

      {formData.logo && (
        <div className="mt-2">
          <img
            src={formData.logo}
            alt="Logo"
            className="img-thumbnail"
            style={{ maxWidth: '120px' }}
          />
        </div>
      )}

      <InputField
        label="Documents (comma-separated URLs)"
        name="documents"
        value={formData.documents.join(', ')}
        onChange={handleChange}
      />

      {formData.documents.length > 0 && (
        <ul className="mt-2">
          {formData.documents.map((doc, i) => (
            <li key={i}>
              <a
                href={doc}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple"
              >
                Document {i + 1}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="text-end">
        <button type="submit" className="btn btn-purple px-4">
          Update Profile
        </button>
      </div>
    </FormLayout>
  );
};

export default ExhibitorProfile;
