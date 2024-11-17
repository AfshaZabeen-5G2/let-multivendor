import React from "react";

const SignupForm: React.FC = () => {
  return (
    <form>
      <input type="text" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />

      {/* Only for Admins */}
      <label>
        Vendor Status:
        <select name="status">
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="suspended">Suspended</option>
        </select>
      </label>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
