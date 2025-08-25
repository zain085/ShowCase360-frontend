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
    // Dispose existing instance if any
    const old = window.bootstrap.Tooltip.getInstance(ref.current);
    if (old) old.dispose();

    const instance = new window.bootstrap.Tooltip(ref.current, {
      title,
      placement,
      trigger: "hover",
      container: "body", // avoids clipping in responsive tables
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

  // Fetch all exhibitors
  const fetchExhibitors = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/auth/exhibitors");

      if (res.data.success) {
        setExhibitors(res.data.data);
        toast.success(res.data.message || "Exhibitors loaded successfully");
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

  // Table headers
  const headers = [
    "Exhibitor ID",
    "Profile",
    "Username",
    "Email",
    "Role",
    "Gender",
    "Address",
    "Expos",
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
      </>
    );
  };

  return (
    <div className="container mt-4">
      <h3 className="text-white mb-3">Manage Exhibitors</h3>

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
    </div>
  );
};

export default FetchExhibitors;
