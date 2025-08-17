import React, {
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.put(
        "/auth/update-profile",
        formData
      );
      toast.success(data.message || "Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <FormLayout title="My Profile" onSubmit={handleSubmit}>
      <InputField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />

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

      <InputField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />

      <RadioButtonGroup
        label="Select Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" }
        ]}
      />

      <InputField
        label="Profile Image URL"
        name="profileImg"
        value={formData.profileImg}
        onChange={handleChange}
      />

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

      <div className="text-end">
        <button type="submit" className="btn btn-purple px-4">
          Update
        </button>
      </div>
    </FormLayout>
  );
};

export default Profile;
