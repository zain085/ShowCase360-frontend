import React, {
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import CustomCard from '../../components/Card';

const ExpoRegister = () => {
  const [expos, setExpos] = useState([]);
  const [registeredExpos, setRegisteredExpos] = useState([]);
  const [isExhibitor, setIsExhibitor] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData?.role === 'exhibitor') {
      setIsExhibitor(true);
      setRegisteredExpos(userData.registeredExpos || []);
    }
  }, []);

  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const res = await axiosInstance.get('/expos');
        if (res.data.success) {
          setExpos(res.data.expos || []);
        }
      } catch (err) {
        console.error('Error fetching expos:', err);
        setExpos([]);
        toast.error('Failed to load expos');
      }
    };
    fetchExpos();
  }, []);

  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });

  const handleRegister = async (expoId) => {
    try {
      const res = await axiosInstance.post(`/auth/register-expo/${expoId}`);
      if (res.data.success) {
        setRegisteredExpos(prev => [...prev, expoId]);
        const user = JSON.parse(localStorage.getItem('user'));
        localStorage.setItem('user', JSON.stringify({
          ...user,
          registeredExpos: [...(user.registeredExpos || []), expoId]
        }));
        toast.success('Successfully registered for the expo');
      }
    } catch (err) {
      console.error('Registration error:', err);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-light mb-4">Available Expos for Registration</h2>

      {expos.length === 0 ? (
        <p className="text-secondary">No expos found for registration.</p>
      ) : (
        <div className="row g-4">
          {expos.map((expo) => {
            const isRegistered = registeredExpos.includes(expo._id);

            return (
              <div className="col-md-6 col-lg-4" key={expo._id}>
                <CustomCard>
                  <h5 className="text-light">{expo.title}</h5>

                  <p className="text-secondary small mb-1">
                    <i className="bi bi-calendar-event me-1"></i>
                    {formatDate(expo.date)}
                  </p>
                  <p className="text-secondary small mb-3">
                    <i className="bi bi-geo-alt me-1"></i>
                    {expo.location}
                  </p>

                  <p className="text-light flex-grow-1">{expo.description}</p>

                  {isExhibitor && (
                    <button
                      className="btn btn-purple mt-3"
                      disabled={isRegistered}
                      onClick={() => handleRegister(expo._id)}
                    >
                      {isRegistered ? 'Registered' : 'Register'}
                    </button>
                  )}
                </CustomCard>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExpoRegister;
