import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance'; // adjust path if needed
import CustomTable from '../../components/Table'; // adjust path if needed

// Small helper to reliably init/dispose Bootstrap tooltip per element
const TooltipText = ({ title, placement = "top", children }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !window?.bootstrap?.Tooltip) return;

    // Dispose old instance if any
    const old = window.bootstrap.Tooltip.getInstance(ref.current);
    if (old) old.dispose();

    const instance = new window.bootstrap.Tooltip(ref.current, {
      title,
      placement,
      trigger: "hover",
      container: "body", // avoids clipping in .table-responsive
    });

    return () => instance?.dispose();
  }, [title, placement, children]);

  return (
    <span ref={ref} data-bs-toggle="tooltip" data-bs-placement={placement} title={title}>
      {children}
    </span>
  );
};

const FetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users (non-admins)
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/auth/users");

      if (res.data.success) {
        setUsers(res.data.data);
        toast.success(res.data.message || "Users loaded successfully");
      } else {
        toast.error(res.data.message || "Failed to fetch users");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Table headers
  const headers = [
    "User ID",
    "Profile",
    "Username",
    "Email",
    "Role",
    "Gender",
    "Address",
    "Sessions",
  ];

  // Render table row for each user
  const renderRow = (user) => {
    const shortId =
      user._id && user._id.length > 10
        ? `${user._id.substring(0, 6)}...${user._id.substring(user._id.length - 4)}`
        : user._id;

    return (
      <>
        <td>
          {/* TooltipText handles Bootstrap tooltip reliably */}
          <TooltipText title={user._id} placement="top">
            {shortId}
          </TooltipText>
          <i
            className="bi bi-clipboard ms-2 text-purple"
            style={{ cursor: "pointer" }}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(user._id);
                toast.info("User ID copied!");
              } catch {
                toast.error("Failed to copy ID");
              }
            }}
          />
        </td>

        <td>
          {user.profileImg ? (
            <img
              src={user.profileImg}
              alt={user.username}
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          ) : (
            "N/A"
          )}
        </td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>{user.gender || "N/A"}</td>
        <td>{user.address || "N/A"}</td>
        <td>{user.registeredSessions?.length || 0}</td>
      </>
    );
  };

  return (
    <div className="container mt-4">
      <h3 className="text-white mb-3">Manage Users</h3>

      {loading ? (
        <p className="text-center text-white">Loading users...</p>
      ) : (
        <CustomTable
          headers={headers}
          rows={users}
          renderRow={renderRow}
          rowsPerPage={5}
        />
      )}
    </div>
  );
};

export default FetchUsers;
