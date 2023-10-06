export const getData = (setMeters, setLoading, setError) => {
  fetch("https://take-home-exercise-api.herokuapp.com/meters", {
    headers: {
      "API-KEY":
        "b8730519da8f97c19bc27b55a364d4398f163a141f41d123ceb10a1daec2143d",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch data from the API");
      }
    })
    .then((data) => {
      setMeters(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setError(error.message); // Set the error message
      setLoading(false);
    });
};

export const deleteMeterApi = (id, setMeters, setLoading) => {
  setLoading(true);
  // Make a DELETE request to the API to delete the meter by ID
  fetch(`https://take-home-exercise-api.herokuapp.com/meters/${id}`, {
    method: "DELETE",
    headers: {
      "API-KEY":
        "b8730519da8f97c19bc27b55a364d4398f163a141f41d123ceb10a1daec2143d",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        // Delete was successful, update the state to remove the meter
        setMeters((prevMeters) =>
          prevMeters.filter((meter) => meter.id !== id)
        );
        setLoading(false);
      } else {
        // Handle error, e.g., show a message to the user
        console.error("Error deleting meter:", response.statusText);
        setLoading(false);
      }
    })
    .catch((error) => {
      console.error("Error deleting meter:", error);
      setLoading(false);
    });
};

export const createMeterApi = (formData, setFormData, navigate) => {
  fetch("https://take-home-exercise-api.herokuapp.com/meters", {
    method: "POST",
    headers: {
      "API-KEY":
        "b8730519da8f97c19bc27b55a364d4398f163a141f41d123ceb10a1daec2143d",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Clear the form inputs
      setFormData({
        display_name: "",
        api_name: "",
        active: true,
        used_for_billing: false,
        type: "sum",
      });
      navigate("/");
    })
    .catch((error) => console.error("Error creating meter:", error));
};

export const updateMeterApi = (id, navigate, formData) => {
  fetch(`https://take-home-exercise-api.herokuapp.com/meters/${id}`, {
    method: "PUT",
    headers: {
      "API-KEY":
        "b8730519da8f97c19bc27b55a364d4398f163a141f41d123ceb10a1daec2143d",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      // After updating, you can navigate back to the meter details page or any other page
      navigate("/");
    })
    .catch((error) => console.error("Error updating meter:", error));
};
