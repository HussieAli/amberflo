import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./landingpage.css";
import { deleteMeterApi, getData } from "../utils/services";

function LandingPage() {
  // create States
  const [meters, setMeters] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Declare sortedMeters here
  const sortedMeters = [...meters].sort((a, b) => {
    if (sortConfig.direction === "ascending") {
      return a[sortConfig.key] < b[sortConfig.key] ? -1 : 1;
    } else if (sortConfig.direction === "descending") {
      return a[sortConfig.key] > b[sortConfig.key] ? -1 : 1;
    }
    return 0;
  });

  const handleDelete = (id) => {
    deleteMeterApi(id, setMeters, setLoading);
  };

  const handleUpdate = (data) => {
    navigate("update-meter", { state: { data } });
  };

  const handleCreateMeter = () => {
    navigate("/create-meter");
  };

  useEffect(() => {
    getData(setMeters, setLoading, setError);
  }, []);

  return (
    <div className="App">
      <h2>Landing Page</h2>
      <button className="create-meter-button" onClick={handleCreateMeter}>
        Create Meter
      </button>
      {loading ? (
        <div className="loader"></div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : meters.length === 0 ? ( // Check if the meters array is empty
        <p>No data found</p>
      ) : (
        <table className="meter-table">
          <thead>
            <tr>
              <th onClick={() => requestSort("display_name")}>
                Display Name
                {sortConfig.key === "display_name" && (
                  <span className={`sort-icon ${sortConfig.direction}`}></span>
                )}
              </th>
              <th onClick={() => requestSort("api_name")}>
                API Name
                {sortConfig.key === "api_name" && (
                  <span className={`sort-icon ${sortConfig.direction}`}></span>
                )}
              </th>
              <th onClick={() => requestSort("active")}>
                Active
                {sortConfig.key === "active" && (
                  <span className={`sort-icon ${sortConfig.direction}`}></span>
                )}
              </th>
              <th onClick={() => requestSort("used_for_billing")}>
                Used for Billing
                {sortConfig.key === "used_for_billing" && (
                  <span className={`sort-icon ${sortConfig.direction}`}></span>
                )}
              </th>
              <th onClick={() => requestSort("type")}>
                Type
                {sortConfig.key === "type" && (
                  <span className={`sort-icon ${sortConfig.direction}`}></span>
                )}
              </th>
              <th>Actions</th> {/* Add a new column for actions */}
            </tr>
          </thead>
          <tbody>
            {sortedMeters.map((meter) => (
              <tr
                key={meter.id}
                onClick={() => {
                  navigate("/meter-details", { state: { meter } });
                }}
              >
                <td>{meter.display_name}</td>
                <td>{meter.api_name}</td>
                <td>{meter.active ? "Yes" : "No"}</td>
                <td>{meter.used_for_billing ? "Yes" : "No"}</td>
                <td>{meter.type}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(meter.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="update-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdate(meter);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LandingPage;
