import React, { useState } from "react";
import "./createMeter.css";
import { useNavigate } from "react-router-dom";
import { createMeterApi } from "../utils/services";

const CreateMeter = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    display_name: "",
    api_name: "",
    active: true,
    used_for_billing: false,
    type: "sum",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form before submitting
    if (formData.display_name && formData.api_name) {
      // Make a POST request to create the new meter using the API endpoint
      createMeterApi(formData, setFormData, navigate);
    } else {
      alert("Enter Display Name or Api Name to proceed");
    }
  };

  return (
    <div className="create-meter-form-container">
      <h2>Create Meter</h2>
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
        <div className="create-meter-active-billing">
          <label className="checkbox-label">
            Active:
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
          </label>
          <label className="checkbox-label">
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
        <button type="submit">Create Meter</button>
      </form>
    </div>
  );
};

export default CreateMeter;
