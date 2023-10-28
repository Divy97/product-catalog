import React, { useState } from "react";
import "./SignUp.css";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    const newErrors = {};

    // Basic form validation
    if (!name) {
      newErrors.name = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, you can send the data to the server or perform other actions here.
      console.log("Form data submitted:", formData);
    } else {
      setErrors(newErrors);
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/signup", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const { name, email, password, confirmPassword } = formData;

  return (
    <div className="container">
      <div className="signup-container">
        <div className="form-header">Sign Up</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>

          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
