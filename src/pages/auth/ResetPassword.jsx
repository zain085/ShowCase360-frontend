import { useState } from 'react';

import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axiosInstance from '../../api/axiosInstance';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await axiosInstance.post(`/auth/resetPassword/${token}`, {
        password: formData.password,
      });

      if (res.data.success) {
        toast.success(res.data.message || 'Password reset successfully');
        setTimeout(() => navigate('/login'), 3000);
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
              <h3 className="text-center mb-0">Reset Password</h3>
            </div>
            <div className="card-body bg-dark-custom text-light">
              <form onSubmit={handleSubmit}>
                {/* New Password */}
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      className="form-control bg-dark text-white border-purple"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <div className="input-group">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      className="form-control bg-dark text-white border-purple"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      tabIndex={-1}
                    >
                      <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-purple">Set New Password</button>
                </div>
              </form>

              {/* Back to Login */}
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

export default ResetPassword;
