import React, {
  useEffect,
  useState,
} from 'react';

import axiosInstance from '../../api/axiosInstance';
import CustomCard from '../../components/Card';

const AttendeeExhibitors = () => {
  const [exhibitors, setExhibitors] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const res = await axiosInstance.get('/exhibitors');
        if (res.data.success) {
          const all = res.data.exhibitors;
          const filtered = all.filter((exhibitor) =>
            exhibitor.companyName.toLowerCase().includes(search.toLowerCase())
          );
          setExhibitors(filtered);
        }
      } catch (error) {
        console.error('Error fetching exhibitors:', error);
      }
    };

    fetchExhibitors();
  }, [search]);

  return (
    <div className="container py-5 text-white">
      <h2 className="text-purple fw-bold mb-4">Explore Exhibitors</h2>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-12">
          <input
            type="text"
            className="form-control bg-dark-custom text-white border-purple placeholder-white"
            placeholder="Search by company name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Exhibitor Cards */}
      <div className="row g-4">
        {exhibitors.length === 0 ? (
          <p className="text-secondary">No exhibitors found.</p>
        ) : (
          exhibitors.map((exhibitor) => (
            <div className="col-md-6 col-lg-4" key={exhibitor._id}>
              <CustomCard>
                <img
                  src={exhibitor.logo}
                  className="card-img-top p-3 rounded"
                  alt={`${exhibitor.companyName} logo`}
                  style={{ objectFit: 'contain', maxHeight: '160px' }}
                />

                <h5 className="card-title text-light mt-3">{exhibitor.companyName}</h5>

                <p className="text-secondary small mb-1">
                  <i className="bi bi-tags me-1"></i>
                  Products/Services: {exhibitor.productsOrServices}
                </p>

                <p className="text-secondary small mb-1">
                  <i className="bi bi-envelope me-1"></i>
                  Contact: {exhibitor.contactInfo}
                </p>

                <p className="text-light small mb-2">
                  {exhibitor.description || 'No description provided.'}
                </p>

                <span className={`badge bg-${getStatusColor(exhibitor.applicationStatus)} mt-auto`}>
                  {exhibitor.applicationStatus.toUpperCase()}
                </span>
              </CustomCard>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Status color helper
const getStatusColor = (status) => {
  switch (status) {
    case 'approved':
      return 'success';
    case 'rejected':
      return 'danger';
    default:
      return 'secondary';
  }
};

export default AttendeeExhibitors;
