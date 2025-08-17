import { useState } from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import { InputField } from '../../components/Form';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post('/auth/forgotPassword', { email });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/reset-password/${res.data.resetToken}`);
      } else {
        toast.error('Something went wrong');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="container-fluid bg-dark" style={{ minHeight: '100vh' }}>
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-purple">
            <div className="card-header bg-purple text-white">
              <h3 className="text-center mb-0">Forgot Password</h3>
            </div>
            <div className="card-body bg-dark-custom text-light">
              <form onSubmit={handleSubmit}>
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-purple">Reset Password</button>
                </div>
              </form>

              <div className="mt-3 text-center">
                <Link to="/login" className="text-purple">Back to Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
