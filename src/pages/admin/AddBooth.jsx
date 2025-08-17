import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import {
  FormLayout,
  InputField,
  SelectField,
} from '../../components/Form';

const AddBooth = () => {
  const navigate = useNavigate();

  const [boothData, setBoothData] = useState({
    boothNumber: "",
    location: "",
    expoId: "",
    exhibitorId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoothData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/booths", boothData);
      toast.success("Booth added successfully");
      navigate("/admin/booth-allocation");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add booth");
    }
  };

  return (
    <FormLayout title="Add New Booth" onSubmit={handleSubmit}>
      <InputField
        label="Booth Number"
        name="boothNumber"
        value={boothData.boothNumber}
        onChange={handleChange}
      />

      <SelectField
        label="Location"
        name="location"
        value={boothData.location}
        onChange={handleChange}
        options={[
          { label: "-- Select Location --", value: "" },
          { label: "First Floor", value: "First Floor" },
          { label: "Second Floor", value: "Second Floor" },
          { label: "Third Floor", value: "Third Floor" },
          { label: "Basement", value: "Basement" },
        ]}
      />

      <InputField
        label="Expo ID"
        name="expoId"
        value={boothData.expoId}
        onChange={handleChange}
      />

      <InputField
        label="Exhibitor ID (Optional)"
        name="exhibitorId"
        value={boothData.exhibitorId}
        onChange={handleChange}
        required={false}
      />

      <button type="submit" className="btn btn-purple">
        Add Booth
      </button>
    </FormLayout>
  );
};

export default AddBooth;
