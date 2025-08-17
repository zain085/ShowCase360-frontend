import { useState } from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axiosInstance from '../../api/axiosInstance';
import {
  InputField,
  RadioButtonGroup,
  SelectField,
} from '../../components/Form';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    gender: '',
    role: '',
    profileImg: '',
  });
  const [previewImg, setPreviewImg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'profileImg') setPreviewImg(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { name, email, password, address, gender, role, profileImg } = formData;

      const res = await axiosInstance.post('/auth/register', {
        username: name,
        email,
        password,
        address,
        gender,
        role,
        profileImg,
      });

      if (res.data.success) {
        toast.success('Registration successful');
        navigate('/login');
      } else {
        toast.error(res.data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container-fluid bg-dark" style={{ minHeight: '100vh' }}>
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-purple">
            <div className="card-header bg-purple text-white">
              <h3 className="text-center mb-0">Register</h3>
            </div>
            <div className="card-body bg-dark-custom text-light">
              <form onSubmit={handleSubmit}>
                <InputField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />

                {/* Password Field */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
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

                <InputField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />

                {/* Gender as Radio Button */}
                <RadioButtonGroup
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  options={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                  ]}
                />

                <InputField
                  label="Profile Image URL"
                  name="profileImg"
                  type="url"
                  value={formData.profileImg}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
                {previewImg && (
                  <div className="mb-3 text-center">
                    <img
                      src={previewImg}
                      alt="Preview"
                      className="img-fluid rounded"
                      style={{ maxHeight: '150px' }}
                    />
                  </div>
                )}

                <SelectField
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  options={[
                    { label: 'Select role', value: '' },
                    { label: 'Attendee', value: 'attendee' },
                    { label: 'Exhibitor', value: 'exhibitor' },
                  ]}
                />

                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-purple">Register</button>
                </div>

                <div className="mt-3 text-center">
                  <p>
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple">Login</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
