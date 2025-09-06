import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';
import ConfirmModal from '../../components/ConfirmModal'; // adjust path
import CustomTable from '../../components/Table';

// Small helper to reliably init/dispose Bootstrap tooltip per element
const TooltipText = ({ title, placement = "top", children }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !window?.bootstrap?.Tooltip) return;
    const old = window.bootstrap.Tooltip.getInstance(ref.current);
    if (old) old.dispose();

    const instance = new window.bootstrap.Tooltip(ref.current, {
      title,
      placement,
      trigger: "hover",
      container: "body",
    });

    return () => instance?.dispose();
  }, [title, placement, children]);

  return (
    <span ref={ref} data-bs-toggle="tooltip" data-bs-placement={placement} title={title}>
      {children}
    </span>
  );
};

const FetchExhibitors = () => {
  const [exhibitors, setExhibitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Fetch all exhibitors
  const fetchExhibitors = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/auth/exhibitors");

      if (res.data.success) {
        setExhibitors(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to fetch exhibitors");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching exhibitors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExhibitors();
  }, []);

  // Open confirm modal
  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  // Handle delete exhibitor
  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/auth/users/${selectedId}`);
      if (res.data.success) {
        toast.success(res.data.message || "Exhibitor deleted");
        setExhibitors((prev) => prev.filter((e) => e._id !== selectedId));
      } else {
        toast.error(res.data.message || "Failed to delete exhibitor");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting exhibitor");
    } finally {
      setShowConfirm(false);
      setSelectedId(null);
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
    "Expos",
    "Actions",
  ];

  // Render row for each exhibitor
  const renderRow = (user) => {
    const shortId =
      user._id && user._id.length > 10
        ? `${user._id.substring(0, 6)}...${user._id.substring(user._id.length - 4)}`
        : user._id;

    return (
      <>
        {/* Exhibitor ID with tooltip + clipboard */}
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
                toast.info("Exhibitor ID copied!");
              } catch {
                toast.error("Failed to copy ID");
              }
            }}
          />
        </td>

        {/* Profile Image */}
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

        {/* Other details */}
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>{user.gender || "N/A"}</td>
        <td>{user.address || "N/A"}</td>
        <td>{user.registeredExpos?.length || 0}</td>

        {/* Delete button */}
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
      <h2 className="text-white mb-4">Exhibitors Profiles</h2>

      {loading ? (
        <p className="text-center text-white">Loading exhibitors...</p>
      ) : (
        <CustomTable
          headers={headers}
          rows={exhibitors}
          renderRow={renderRow}
          rowsPerPage={5}
        />
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        title="Delete Exhibitor"
        message="Are you sure you want to delete this exhibitor?"
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
};

export default FetchExhibitors;
