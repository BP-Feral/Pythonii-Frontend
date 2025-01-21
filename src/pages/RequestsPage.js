import React, { useEffect, useState } from "react";
import Nav from "../components/Navbar";

function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch requests
  const fetchRequests = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:8000/requests/", {
        headers: {
          "Authorization": `Bearer ${access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRequests(data);
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

  // Fetch requests on component mount
  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (requestId, action) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch(`http://localhost:8000/api/requests/${requestId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
        body: JSON.stringify({ status: action }),
      });

      if (response.ok) {
        alert(`Request ${action.toLowerCase()}ed successfully!`);
        // Re-fetch the updated list of requests
        fetchRequests(); // Reîncărcăm lista de cereri după acțiune
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
