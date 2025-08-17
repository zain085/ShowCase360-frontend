import React, {
  useEffect,
  useState,
} from 'react';

import axiosInstance from '../../api/axiosInstance';
import CustomCard from '../../components/Card';

const Expos = () => {
  const [expos, setExpos] = useState([]);

  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const res = await axiosInstance.get('/expos');
        if (res.data.success) {
          setExpos(res.data.expos);
        }
      } catch (error) {
        console.error('Error fetching expos:', error);
      }
    };

    fetchExpos();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="container py-5">
      <h2 className="text-purple fw-bold mb-4">Explore Upcoming Expos</h2>

      <div className="row g-4">
        {expos.map((expo) => (
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
            </CustomCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expos;
