import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import ConfirmModal from '../../components/ConfirmModal';
import CustomTable from '../../components/Table';

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
    <span
      ref={ref}
      data-bs-toggle="tooltip"
      data-bs-placement={placement}
      title={title}
    >
      {children}
    </span>
  );
};

const FetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // For confirm modal
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch all users (non-admins)
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/auth/users");

      if (res.data.success) {
        setUsers(res.data.data);
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

  // Handle delete
  const confirmDelete = (id) => {
    setSelectedUser(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/auth/users/${selectedUser}`);
      if (res.data.success) {
        toast.success(res.data.message || "User deleted");
        setUsers(users.filter((u) => u._id !== selectedUser));
      } else {
        toast.error(res.data.message || "Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting user");
    } finally {
      setShowModal(false);
      setSelectedUser(null);
    }
  };

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
    "Actions",
  ];

  // Render table row for each user
  const renderRow = (user) => {
    const shortId =
      user._id && user._id.length > 10
        ? `${user._id.substring(0, 6)}...${user._id.substring(
            user._id.length - 4
          )}`
        : user._id;

    return (
      <>
        <td>
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
        <td>
          <button
            className="btn btn-sm btn-outline-danger"
            title="Delete"
            onClick={() => confirmDelete(user._id)}
          >
            <i className="bi bi-trash3-fill"></i>
          </button>
        </td>
      </>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="text-white mb-4">Attendee Profiles</h2>

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

      {/* Confirm Modal */}
      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
};

export default FetchUsers;
