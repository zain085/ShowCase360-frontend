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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post('/auth/login', { email, password });

      if (res.data.success) {
        const { token, user } = res.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        toast.success('Login successful');

        switch (user.role) {
          case 'admin':
            navigate('/admin/');
            break;
          case 'exhibitor':
            navigate('/exhibitor/');
            break;
          case 'attendee':
            navigate('/attendee/');
            break;
          default:
            navigate('/');
        }
      } else {
        toast.error(res.data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container-fluid bg-dark" style={{ minHeight: "100vh" }}>
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-purple">
            <div className="card-header bg-purple text-white">
              <h3 className="text-center mb-0">Login</h3>
            </div>
            <div className="card-body bg-dark-custom text-light">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="form-control bg-secondary text-light"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control bg-secondary text-light"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-purple">
                    Login
                  </button>
                </div>
              </form>

              <div className="mt-3 text-center">
                <Link to="/forgot-password" className="d-block text-purple">
                  Forgot Password?
                </Link>
                <p className="mt-2">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-purple">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
