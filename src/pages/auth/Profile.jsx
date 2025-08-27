import React, {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import ConfirmModal from '../../components/ConfirmModal';
import {
  FormLayout,
  InputField,
  RadioButtonGroup,
} from '../../components/Form';

const Profile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    gender: "",
    profileImg: "",
    role: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get("/auth/profile");
        const user = data.user;
        setFormData({
          username: user.username || "",
          email: user.email || "",
          address: user.address || "",
          gender: user.gender || "",
          profileImg: user.profileImg || "",
          role: user.role || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.put("/auth/update-profile", formData);
      toast.success(data.message || "Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const { data } = await axiosInstance.delete("/auth/delete-account");
      toast.success(data.message || "Account deleted successfully");

      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete account");
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <FormLayout title="My Profile" onSubmit={handleSubmit}>
      <InputField label="Username" name="username" value={formData.username} onChange={handleChange} />
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          className="form-control bg-dark text-white border-secondary"
          name="email"
          value={formData.email}
          type="email"
          disabled
        />
      </div>
      <InputField label="Address" name="address" value={formData.address} onChange={handleChange} />
      <RadioButtonGroup
        label="Select Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
      />
      <InputField label="Profile Image URL" name="profileImg" value={formData.profileImg} onChange={handleChange} />
      {formData.profileImg && (
        <img
          src={formData.profileImg}
          alt="profile preview"
          className="my-2 rounded"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      )}
      <div className="mb-3">
        <label className="form-label">Role</label>
        <input
          className="form-control bg-dark text-white border-secondary"
          name="role"
          value={formData.role}
          type="text"
          disabled
        />
      </div>

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-purple px-4">Update</button>
        {formData.role === "attendee" && (
          <button type="button" className="btn btn-danger px-4" onClick={() => setShowDeleteModal(true)}>
            Delete Account
          </button>
        )}
      </div>

      {/* Reusable confirmation modal */}
      <ConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Delete Account"
        message="Are you sure you want to permanently delete your account? This action cannot be undone."
        confirmText="Delete Account"
        cancelText="Cancel"
        danger={true}
        onConfirm={handleDeleteAccount}
      />
    </FormLayout>
  );
};

export default Profile;
