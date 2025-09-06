import React, {
  useEffect,
  useState,
} from 'react';

import axiosInstance from '../../api/axiosInstance';
import CustomCard from '../../components/Card';

const FloorPlan = () => {
  const [boothsByLocation, setBoothsByLocation] = useState({});
  const [selectedLocation, setSelectedLocation] = useState("All Floors");

  useEffect(() => {
    const fetchBooths = async () => {
      try {
        const res1 = await axiosInstance.get("/booths/available");
        const res2 = await axiosInstance.get("/booths/reserved");
        const booths = [...res1.data.booths, ...res2.data.booths];

        const grouped = {};
        booths.forEach((booth) => {
          const loc = booth.location || "Unknown";
          if (!grouped[loc]) grouped[loc] = [];
          grouped[loc].push(booth);
        });

        setBoothsByLocation(grouped);
      } catch (err) {
        console.error("Error fetching booths", err);
      }
    };

    fetchBooths();
  }, []);

  const customFloorOrder = [
    "First Floor",
    "Second Floor",
    "Third Floor",
    "Basement",
  ];
  const sortedFloors = customFloorOrder.filter((f) =>
    Object.keys(boothsByLocation).includes(f)
  );
  const remainingFloors = Object.keys(boothsByLocation).filter(
    (f) => !customFloorOrder.includes(f)
  );
  const locations = ["All Floors", ...sortedFloors, ...remainingFloors];

  return (
    <div className="container py-5 bg-dark text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-purple fw-bold mb-0">Booth Floor Plan</h2>
        <div>
          <select
            className="form-select bg-dark-custom border-purple text-white"
            style={{ width: "200px" }}
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {locations
        .filter((loc) => loc !== "All Floors")
        .filter(
          (loc) => selectedLocation === "All Floors" || loc === selectedLocation
        )
        .map((location) => (
          <div className="mb-5" key={location}>
            <div className="card bg-dark-custom border-purple shadow">
              <div className="card-header bg-dark-custom border-bottom border-purple d-flex align-items-center justify-content-between">
                <h5 className="mb-0 text-white">{location}</h5>
                <span className="text-purple">
                  <i className="bi bi-map-fill me-2"></i>Floor Map
                </span>
              </div>

              <div
                className="card-body"
                style={{ backgroundColor: "#242323ff" }}
              >
                <div className="row">
                  {boothsByLocation[location].map((booth) => (
                    <div className="col-md-4 mb-4" key={booth._id}>
                      <CustomCard customClass="bg-secondary text-white">
                        <h6 className="text-purple fw-bold mb-2">
                          Booth #{booth.boothNumber}
                        </h6>
                        <p className="mb-1">
                          <strong>Status:</strong>{" "}
                          {booth.status === "available" ? (
                            <span className="text-success">Available</span>
                          ) : (
                            <span className="text-danger">Reserved</span>
                          )}
                        </p>
                        <p className="mb-1">
                          <strong>Expo:</strong> {booth.expoId?.title || "N/A"}
                        </p>
                        <p className="mb-1">
                          <strong>Exhibitor:</strong>{" "}
                          {booth.exhibitorId?.companyName || "N/A"}
                        </p>
                        <p className="mb-1">
                          <strong>Location:</strong> {booth.location}
                        </p>
                        <p className="mb-1">
                          <strong>Created:</strong>{" "}
                          {new Date(booth.createdAt).toLocaleString()}
                        </p>
                      </CustomCard>
                    </div>
                  ))}
                </div>

                <div className="text-end mt-2">
                  <span className="badge bg-purple">
                    Total: {boothsByLocation[location].length} booth(s)
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FloorPlan;
