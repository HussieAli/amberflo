import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./updatemeter.css"; // Import your CSS for styling
import { updateMeterApi } from "../utils/services";

const UpdateMeter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const meter = location.state && location.state.data;

  // Define state to hold the form data
  const [formData, setFormData] = useState({
    display_name: meter ? meter.display_name : "",
    api_name: meter ? meter.api_name : "",
    active: meter ? meter.active : true,
    used_for_billing: meter ? meter.used_for_billing : false,
    type: meter ? meter.type : "sum",
  });

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // Handle form submission (update meter)
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMeterApi(meter.id, navigate, formData);
  };

  return (
    <div className="update-meter-form-container">
      <h2>Update Meter</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Display Name:
          <input
            type="text"
            name="display_name"
            value={formData.display_name}
            onChange={handleChange}
          />
        </label>
        <label>
          API Name:
          <input
            type="text"
            name="api_name"
            value={formData.api_name}
            onChange={handleChange}
          />
        </label>
        <div className="update-meter-active-billing">
          <label>
            Active:
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
          </label>
          <label>
            Used for Billing:
            <input
              type="checkbox"
              name="used_for_billing"
              checked={formData.used_for_billing}
              onChange={handleChange}
            />
          </label>
        </div>

        <label>
          Type:
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="sum">Sum</option>
            <option value="max">Max</option>
            <option value="unique_count">Unique Count</option>
          </select>
        </label>
        <button type="submit">Update Meter</button>
      </form>
    </div>
  );
};

export default UpdateMeter;
