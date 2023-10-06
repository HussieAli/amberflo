import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MeterDetails.css";

const MeterDetails = () => {
  const location = useLocation();
  const meter = location.state && location.state.meter;
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="meter-details-card">
      {meter ? (
        <>
          <h2>Meter Details</h2>
          <div className="meter-details">
            <p>
              <strong>Display Name:</strong> {meter.display_name}
            </p>
            <p>
              <strong>API Name:</strong> {meter.api_name}
            </p>
            <p>
              <strong>Active:</strong> {meter.active ? "Yes" : "No"}
            </p>
            <p>
              <strong>Used for Billing:</strong>{" "}
              {meter.used_for_billing ? "Yes" : "No"}
            </p>
            <p>
              <strong>Type:</strong> {meter.type}
            </p>
          </div>
          <button onClick={handleGoBack}>Go Back</button>
        </>
      ) : (
        <p>No meter data available</p>
      )}
    </div>
  );
};

export default MeterDetails;
