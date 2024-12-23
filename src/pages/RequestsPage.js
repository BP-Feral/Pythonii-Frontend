import React, { useEffect, useState } from "react";
import Nav from "../components/Navbar";

function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const access_token = localStorage.getItem("access_token"); // Retrieve token from localStorage
        const response = await fetch("http://localhost:8000/requests/", {
          headers: {
            "Authorization": `Bearer ${access_token}`, // Include token in headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRequests(data); // Update state with fetched requests
          setLoading(false);
        } else {
          setError("Failed to load requests.");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("An error occurred while fetching requests.");
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle accept or decline actions
  const handleAction = async (requestId, action) => {
    try {
      const access_token = localStorage.getItem("access_token"); // Retrieve token from localStorage
      const response = await fetch(`http://localhost:8000/api/requests/${requestId}/`, {
        method: "PATCH", // Use PATCH for partial updates
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`, // Include token in headers
        },
        body: JSON.stringify({ status: action }),
      });

      if (response.ok) {
        alert(`Request ${action.toLowerCase()}ed successfully!`);
        // Update UI by refetching or updating state
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.id === requestId ? { ...req, status: action } : req
          )
        );
      } else {
        alert(`Failed to ${action.toLowerCase()} the request.`);
      }
    } catch (err) {
      console.error(`Error during ${action} action:`, err);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Nav />
      <h2>Requests</h2>
      <div>
        {requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Exam</th>
                <th>User</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.exam.name}</td>
                  <td>{request.user.username}</td>
                  <td>{request.status}</td>
                  <td>
                    {request.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleAction(request.id, "Approved")}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleAction(request.id, "Rejected")}
                        >
                          Decline
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default RequestsPage;
