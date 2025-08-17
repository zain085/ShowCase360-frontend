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
} from '../../components/Form';

const EditBooth = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [boothData, setBoothData] = useState({
    boothNumber: '',
    location: '',
    status: 'available',
    expoId: '',
    exhibitorId: '',
  });

  useEffect(() => {
    const fetchBooth = async () => {
      try {
        const { data } = await axiosInstance.get(`/booths/${id}`);
        setBoothData(data.booth);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch booth details');
      }
    };
    fetchBooth();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoothData((prev) => ({
      ...prev,
      [name]: name === 'exhibitorId' && value === '' ? null : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/booths/${id}`, boothData);
      toast.success('Booth updated successfully');
      navigate('/admin/booth-allocation');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update booth');
    }
  };

  return (
    <FormLayout title="Edit Booth" onSubmit={handleSubmit}>
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
          { value: 'First Floor', label: 'First Floor' },
          { value: 'Second Floor', label: 'Second Floor' },
          { value: 'Third Floor', label: 'Third Floor' },
          { value: 'Basement', label: 'Basement' },
        ]}
      />

      <InputField
        label="Expo ID"
        name="expoId"
        value={boothData.expoId}
        onChange={handleChange}
      />

      <InputField
        label="Exhibitor ID"
        name="exhibitorId"
        value={boothData.exhibitorId || ''}
        onChange={handleChange}
        required={false}
        placeholder="Leave empty to unassign"
      />

      <button type="submit" className="btn btn-purple">Update Booth</button>
    </FormLayout>
  );
};

export default EditBooth;
