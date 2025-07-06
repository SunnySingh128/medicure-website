import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
  const navigate = useNavigate();
  const [obj, setObj] = useState({ email: "", password: "" }); // Changed here
  const [sub, setSub] = useState(false);
  const [mess, setMess] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);

  // Background image URL
  const backgroundImageUrl = 'https://i.pinimg.com/736x/21/17/58/211758027b07e758c3483215ab20dc78.jpg';

  function handleChange(e) {
    setObj({ ...obj, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSub(true);
  }

  useEffect(() => {
    if (sub) {
      async function loginUser() {
        try {
          const res = await axios.post('http://localhost:3000/user/login', obj, {
            headers: { 'Content-Type': 'application/json' }
          });
          
          const message = res.data.message || "Login successful";
          setMess(message);
          
          if (message.toLowerCase().includes("success")) {
            setShowAnimation(true);
            setTimeout(() => {
              setShowAnimation(false);
              navigate("/firstpage");
            }, 5000);
          }
        } catch (err) {
          console.error(err);
          setMess("Login failed. Please check your credentials.");
        } finally {
          setSub(false);
        }
      }
      loginUser();
    }
  }, [sub, obj, navigate]);

  return (
    <div 
      className={styles.loginContainer} 
      style={{ 
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1 className={styles.loginTitle}>Welcome Back</h1>
          <p className={styles.loginSubtitle}>Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input 
            type="email"
            name="email"
            value={obj.email}
            placeholder="Email"
            onChange={handleChange}
            required
            className={styles.loginInput}
          />
          
          <input 
            type="password"
            name="password"
            value={obj.password}
            placeholder="Password"
            onChange={handleChange}
            required
            className={styles.loginInput}
          />
          
          <div className={styles.loginOptions}>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-purple-600" />
              Remember me
            </label>
            <a href="#" className="hover:text-white underline">Forgot password?</a>
          </div>
          
          <button 
            type="submit"
            disabled={sub}
            className={styles.loginButton}
          >
            {sub ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Logging in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        
        {mess && (
          <p className={`${styles.loginMessage} ${
            mess.toLowerCase().includes("success") ? styles.successMessage : styles.errorMessage
          }`}>
            {mess}
          </p>
        )}
        
        <p className={styles.loginFooter}>
          Don't have an account?{" "}
          <NavLink to="/signup" className={styles.loginLink}>
            Sign Up
          </NavLink>
        </p>
      </div>
      
      {/* Animation Modal */}
      {showAnimation && (
        <div className={styles.animationContainer}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </div>
  );
}
