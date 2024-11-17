import React, { useEffect, useState } from "react";
import axios from "axios";

interface Vendor {
  id: number;
  name: string;
  email: string;
  status: "pending" | "approved" | "suspended";
}

const AdminDashboard: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("/api/admin/vendors");
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  const updateVendorStatus = async (id: number, status: Vendor["status"]) => {
    try {
      await axios.post(`/api/admin/vendors/${id}/status`, { status });
      setVendors((prev) =>
        prev.map((vendor) => (vendor.id === id ? { ...vendor, status } : vendor))
      );
    } catch (error) {
      console.error("Error updating vendor status:", error);
    }
  };

  const deleteVendor = async (id: number) => {
    try {
      await axios.delete(`/api/admin/vendors/${id}`);
      setVendors((prev) => prev.filter((vendor) => vendor.id !== id));
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td className="border border-gray-300 px-4 py-2">{vendor.id}</td>
              <td className="border border-gray-300 px-4 py-2">{vendor.name}</td>
              <td className="border border-gray-300 px-4 py-2">{vendor.email}</td>
              <td className="border border-gray-300 px-4 py-2">{vendor.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => updateVendorStatus(vendor.id, "approved")}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateVendorStatus(vendor.id, "suspended")}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Suspend
                </button>
                <button
                  onClick={() => deleteVendor(vendor.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
