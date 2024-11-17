import React from "react";
import { useNavigate } from "react-router-dom";

const Drawer: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const navigate = useNavigate();

  return (
    <nav className="drawer">
      <button onClick={() => navigate("/vendors/signup")}>Vendor Signup</button>
      {isAdmin && (
        <>
          <button onClick={() => navigate("/admin/dashboard")}>
            Admin Dashboard
          </button>
        </>
      )}
    </nav>
  );
};

export default Drawer;
