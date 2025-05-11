import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import styles from './Signup.module.css'; // Import the CSS Module

export default function Signup() {
  const [obj, setObj] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });
  const [sub, setSub] = useState(false);
  const [mess, setMess] = useState("");

  function handleChange(e) {
    setObj({ ...obj, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSub(true);
  }

  useEffect(() => {
    if (sub) {
      async function signupUser() {
        try {
          const response = await axios.post('http://localhost:3000/user/signup', obj, {
            headers: { 'Content-Type': 'application/json' }
          });
          setMess(response.data.message || "Signup successful");
        } catch (err) {
          console.log(err);
          setMess("Signup failed. Please try again.");
        } finally {
          setSub(false);
        }
      }
      signupUser();
    }
  }, [sub, obj]);

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        <div className={styles.signupHeader}>
          <h1 className={styles.signupTitle}>Create Account</h1>
          <p className={styles.signupSubtitle}>Join us and start your journey</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.signupForm}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className={styles.signupInput}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className={styles.signupInput}
          />

          <select
            name="gender"
            onChange={handleChange}
            required
            className={styles.signupSelect}
          >
            <option value="">Select Gender</option>
            <option value="male" className="text-black">Male</option>
            <option value="female" className="text-black">Female</option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className={styles.signupInput}
          />

          <button
            type="submit"
            disabled={sub}
            className={styles.signupButton}
          >
            {sub ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing up...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {mess && (
          <p className={`${styles.signupMessage} ${
            mess.toLowerCase().includes("success") ? styles.successMessage : styles.errorMessage
          }`}>
            {mess}
          </p>
        )}

        <p className={styles.signupFooter}>
          Already have an account?{" "}
          <NavLink to="/" className={styles.signupLink}>
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
}