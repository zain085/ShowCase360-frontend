import React, {
  useEffect,
  useState,
} from 'react';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import CustomCard from '../../components/Card';

const MyBooth = () => {
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBooths = async () => {
      try {
        const res = await axiosInstance.get('/booths/my');
        if (res.data.success) {
          const boothData = res.data.booths || [];
          setBooths(boothData);

          if (boothData.length === 0) {
            toast.info('You have not been assigned any booths yet.');
          }
        } else {
          toast.error('Failed to load your booths.');
        }
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 404) {
          toast.info('You have not been assigned any booths yet.');
        } else {
          toast.error('Unable to fetch booth details. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooths();
  }, []);

  if (loading) {
    return <p className="text-light text-center mt-5">Loading booth details...</p>;
  }

  if (!booths.length) {
    return (
      <p className="text-light text-center mt-5">
        You have not been assigned any booths yet.
      </p>
    );
  }

  return (
    <div className="container py-4">
      <h3 className="text-light mb-4">My Booths</h3>

      <div className="row">
        {booths.map((booth) => (
          <div key={booth._id} className="col-md-6 mb-4">
            <CustomCard customClass="text-white">
              <h5 className="text-purple">Booth #{booth.boothNumber}</h5>
              <hr className="border-purple" />
              <p><strong>Expo:</strong> {booth.expoId?.title || 'N/A'}</p>
              <p><strong>Location:</strong> {booth.location}</p>
              <p>
                <strong>Status:</strong>
                <span
                  className={`badge ms-2 ${
                    booth.status === 'reserved' ? 'bg-success' : 'bg-secondary'
                  }`}
                >
                  {booth.status.charAt(0).toUpperCase() + booth.status.slice(1)}
                </span>
              </p>
              <div className="mt-3">
                <Link
                  to={`/exhibitor/edit-mybooth/${booth._id}`}
                  className="btn btn-purple"
                >
                  Edit Booth Info
                </Link>
              </div>
            </CustomCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooth;
