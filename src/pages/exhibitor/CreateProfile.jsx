import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import {
  FormLayout,
  InputField,
  TextAreaField,
} from '../../components/Form';

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    userId: '',
    companyName: '',
    productsOrServices: '',
    contactInfo: '',
    logo: '',
    description: '',
    documents: [],
  });

  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const toastShown = useRef(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    setFormData(prev => ({ ...prev, userId: user._id }));

    (async () => {
      try {
        const res = await axiosInstance.get(`/exhibitors/user/${user._id}`);
        if (res.data.success) {
          setProfileExists(true);
          if (!toastShown.current) {
            toast.info('Profile already exists.');
            toastShown.current = true;
          }
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setProfileExists(false);
        } else {
          console.error(err);
          toast.error('Error checking profile');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'documents') {
      setFormData(prev => ({
        ...prev,
        documents: value.split(',').map(doc => doc.trim()),
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...formData,
      logo:
        formData.logo ||
        'https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg',
    };

    try {
      const res = await axiosInstance.post('/exhibitors', payload);
      toast.success(res.data.message || 'Profile created successfully');
      setProfileExists(true);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  if (loading) {
    return <p className="text-light text-center mt-5">Loading...</p>;
  }

  if (profileExists) {
    return (
      <div className="container py-5 text-light">
        <h3>Profile already exists.</h3>
        <p>You can edit your profile from the dashboard.</p>
      </div>
    );
  }

  return (
    <FormLayout title="Create Exhibitor Profile" onSubmit={handleSubmit}>
      <InputField
        label="Company Name"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        required
      />

      <InputField
        label="Contact Info"
        name="contactInfo"
        value={formData.contactInfo}
        onChange={handleChange}
        required
      />

      <InputField
        label="Products/Services"
        name="productsOrServices"
        value={formData.productsOrServices}
        onChange={handleChange}
        required
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
        <button type="submit" className="btn btn-purple">
          Create Profile
        </button>
      </div>
    </FormLayout>
  );
};

export default CreateProfile;
