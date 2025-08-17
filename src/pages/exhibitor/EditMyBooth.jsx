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
import FormLayout from '../../components/Form';

const EditMyBooth = () => {
  const [booth, setBooth] = useState(null);
  const [formData, setFormData] = useState({
    boothNumber: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchMyBooth = async () => {
      try {
        const res = await axiosInstance.get("/booths/my");
        if (res.data.success && res.data.booths?.length > 0) {
          const boothToEdit = res.data.booths.find((b) => b._id === id);
          if (boothToEdit) {
            setBooth(boothToEdit);
            setFormData({
              boothNumber: boothToEdit.boothNumber || "",
              location: boothToEdit.location || "",
            });
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load booth data");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooth();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!booth?._id) return;

    try {
      const res = await axiosInstance.put(`/booths/${booth._id}`, {
        ...formData,
        status: booth.status,
      });

      if (res.data.success) {
        toast.success("Booth updated successfully!");
        navigate("/exhibitor/my-booth");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update booth");
    }
  };

  if (loading) {
    return <p className="text-light text-center mt-5">Loading booth...</p>;
  }

  if (!booth) {
    return (
      <p className="text-light text-center mt-5">No booth found to edit.</p>
    );
  }

  return (
    <FormLayout title="Edit My Booth" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label text-light">Booth Number</label>
        <input
          type="text"
          name="boothNumber"
          value={formData.boothNumber}
          onChange={handleChange}
          className="form-control bg-dark text-white border-purple"
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label text-light">Location</label>
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="form-select bg-dark text-white border-purple"
          required
        >
          <option value="Basement">Basement</option>
          <option value="First Floor">First Floor</option>
          <option value="Second Floor">Second Floor</option>
          <option value="Third Floor">Third Floor</option>
        </select>
      </div>

      <button type="submit" className="btn btn-purple">
        Update Booth
      </button>
    </FormLayout>
  );
};

export default EditMyBooth;
