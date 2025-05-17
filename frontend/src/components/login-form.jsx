import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const redirect = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const req = await axios.post("http://localhost:3010/login", formData);
      if (req.status === 200) {
        setSuccess(req.data.message);
        localStorage.setItem("auth_token_login", req.data.token);
        localStorage.setItem("user_login", JSON.stringify(req.data.user));

        redirect("/dashboard");
      } else {
        setError(req.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className=" grid place-content-center h-screen">
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col space-y-4 w-96 bg-base-100 shadow border-base-content/30 border p-4 card"
      >
        <h2 className=" font-bold text-2xl text-center">Welcome back</h2>
        {error && <div className=" alert alert-error">{error}</div>}
        {success && <div className=" alert alert-success">{success}</div>}

        <label className="  label" htmlFor="username">
          Username
        </label>
        <input
          required
          className=" input w-full"
          type="text"
          placeholder="username"
          name="username"
          value={formData.username}
          onChange={handChange}
        />
        <label className=" label" htmlFor="username">
          password
        </label>
        <input
          required
          className=" input w-full"
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handChange}
        />
        <button className=" btn btn-warning">submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
