import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import Robo from './floating.jsx';
const HomePage = () => {
  const navigate = useNavigate();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  // Floating medical icons for background
  const FloatingIcons = () => {
    const icons = ['💊', '❤️', '🩺', '🩸', '🧠', '🦴', '🧬', '🔬', '🧪', '⚕️'];
    return (
      <div className="floating-icons-container">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 30 + 20;
          const posX = Math.random() * 100;
          const posY = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = Math.random() * 10 + 10;
          const icon = icons[Math.floor(Math.random() * icons.length)];
          
          return (
            <motion.div
              key={i}
              className="floating-icon"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                y: [0, -50, 0],
                x: [0, Math.random() * 100 - 50, 0],
                rotate: [0, Math.random() * 360 - 180]
              }}
              transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              style={{
                fontSize: `${size}px`,
                left: `${posX}%`,
                top: `${posY}%`,
              }}
            >
              {icon}
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <>
    <Navbar></Navbar>
    <Robo></Robo>
    <div className="home-page">
      {/* Background elements */}
      <FloatingIcons />
      <div className="gradient-bg"></div>
      
      {/* CSS Styles */}
      <style jsx>{`
.home-page {
  font-family: 'Poppins', sans-serif;
  color: #2c3e50;
  overflow-x: hidden;
  position: relative;
}

.gradient-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%);
  z-index: -2;
}

/* Dark mode support */
.dark-mode .gradient-bg {
background: black;

}

.floating-icons-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  opacity: 0.2;
}

.floating-icon {
  position: absolute;
  user-select: none;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.15));
}

/* Dark mode support */
.dark-mode .floating-icon {
  filter: drop-shadow(0 2px 5px rgba(255, 255, 255, 0.1));
}

/* Hero Section */
.hero-section {
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding: 0 8%;
  position: relative;
  overflow: hidden;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  padding: 3rem;
  position: relative;
  z-index: 2;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
}

/* Dark mode support */
.dark-mode .hero-content {
  background: rgba(26, 31, 54, 0.6);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.hero-content h1 {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  font-weight: 800;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
}

.hero-content p {
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  color: #5a6a72;
  line-height: 1.7;
  font-weight: 400;
}

/* Dark mode support */
.dark-mode .hero-content p {
  color: #b0b8c1;
}

.hero-btn {
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.4);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
}

.hero-btn:hover {
  transform: translateY(-7px);
  box-shadow: 0 20px 35px rgba(52, 152, 219, 0.5);
}

.hero-btn:active {
  transform: translateY(-2px);
}

.hero-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: all 0.6s ease;
}

.hero-btn:hover::after {
  left: 100%;
}

.hero-image {
  flex: 1;
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image img {
  max-width: 100%;
  height: auto;
  border-radius: 30px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.2);
  transform: perspective(1200px) rotateY(-15deg);
  transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 8px solid white;
}

/* Dark mode support */
.dark-mode .hero-image img {
  border-color: #2c3652;
}

.hero-image:hover img {
  transform: perspective(1200px) rotateY(-5deg) translateY(-10px);
}

/* Features Section */
.features-section {
  padding: 8rem 8%;
  background-color: white;
  position: relative;
  border-radius: 50px 50px 0 0;
  margin-top: -50px;
  box-shadow: 0 -20px 50px rgba(0,0,0,0.05);
}

/* Dark mode support */
.dark-mode .features-section {
  background-color: #1a1f36;
  box-shadow: 0 -20px 50px rgba(0,0,0,0.2);
}

.section-title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 4rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 700;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 6px;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  border-radius: 3px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
  max-width: 1300px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 15px 40px rgba(0,0,0,0.05);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid #e0e6ed;
  text-align: center;
  position: relative;
  z-index: 1;
  // overflow: hidden;
}

/* Dark mode support */
.dark-mode .feature-card {
  background: #242b42;
  border-color: #323b59;
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.05), rgba(46, 204, 113, 0.05));
  z-index: -1;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.feature-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-icon {
  font-size: 4rem;
  margin-bottom: 2rem;
  display: inline-block;
  padding: 1.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(46, 204, 113, 0.1));
  box-shadow: 0 10px 20px rgba(52, 152, 219, 0.1);
}

.feature-card h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #3498db;
  font-weight: 600;
}

/* Dark mode support */
.dark-mode .feature-card h3 {
  color: #5caae7;
}

.feature-card p {
  color: #7f8c8d;
  line-height: 1.8;
  font-size: 1.1rem;
}

/* Dark mode support */
.dark-mode .feature-card p {
  color: #a0abbf;
}

/* Testimonials Section */
.testimonials-section {
  padding: 8rem 8%;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.05), rgba(46, 204, 113, 0.05));
  position: relative;
}

/* Dark mode support */
.dark-mode .testimonials-section {
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(46, 204, 113, 0.1));
}

.testimonials-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  max-width: 1300px;
  margin: 0 auto;
}

.testimonial-card {
  flex: 1;
  min-width: 320px;
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 15px 40px rgba(0,0,0,0.05);
  position: relative;
  border-top: 6px solid #3498db;
  transition: all 0.4s ease;
}

/* Dark mode support */
.dark-mode .testimonial-card {
  background: #242b42;
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(52, 152, 219, 0.15);
}

.testimonial-content {
  font-size: 1.2rem;
  font-style: italic;
  line-height: 1.8;
  color: #555;
  margin-bottom: 2rem;
  position: relative;
}

/* Dark mode support */
.dark-mode .testimonial-content {
  color: #a0abbf;
}

.testimonial-content::before,
.testimonial-content::after {
  content: '"';
  font-size: 4rem;
  color: #3498db;
  opacity: 0.2;
  position: absolute;
  font-family: Georgia, serif;
}

.testimonial-content::before {
  top: -30px;
  left: -15px;
}

.testimonial-content::after {
  bottom: -50px;
  right: -15px;
}

.testimonial-author {
  font-weight: 700;
  color: #3498db;
  text-align: right;
  font-size: 1.2rem;
}

/* Dark mode support */
.dark-mode .testimonial-author {
  color: #5caae7;
}

/* How It Works Section */
.steps-section {
  padding: 8rem 8%;
  background-color: white;
  position: relative;
}

/* Dark mode support */
.dark-mode .steps-section {
  background-color: #1a1f36;
}

.steps-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  max-width: 1300px;
  margin: 0 auto;
  position: relative;
}

.steps-container::after {
  content: '';
  position: absolute;
  top: 40px;
  left: 10%;
  width: 80%;
  height: 4px;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  opacity: 0.3;
  z-index: 0;
}

.step-card {
  flex: 1;
  min-width: 280px;
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 15px 40px rgba(0,0,0,0.05);
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1;
}

/* Dark mode support */
.dark-mode .step-card {
  background: #242b42;
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

.step-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: linear-gradient(135deg, #3498db, #2ecc71);
}

.step-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
}

.step-number {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0 auto 2rem;
  box-shadow: 0 10px 20px rgba(52, 152, 219, 0.3);
  position: relative;
  z-index: 2;
}

.step-card h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #3498db;
  font-weight: 600;
}

/* Dark mode support */
.dark-mode .step-card h3 {
  color: #5caae7;
}

.step-card p {
  color: #7f8c8d;
  line-height: 1.7;
  font-size: 1.1rem;
}

/* Dark mode support */
.dark-mode .step-card p {
  color: #a0abbf;
}

/* CTA Section */
.cta-section {
  padding: 8rem 8%;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: white;
  text-align: center;
  border-radius: 50px 50px 0 0;
  margin-top: -50px;
  box-shadow: 0 -20px 50px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,.1)' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.3;
}

.cta-content {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.cta-content h2 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.cta-content p {
  font-size: 1.3rem;
  margin-bottom: 3rem;
  opacity: 0.95;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}

.cta-btn {
  background: white;
  color: #3498db;
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
  letter-spacing: 0.5px;
}

.cta-btn:hover {
  transform: translateY(-7px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.cta-btn:active {
  transform: translateY(-2px);
}

/* Animations */
.fadeIn {
  animation: fadeIn 1s ease-out;
}

.slideInDown {
  animation: slideInDown 1s ease-out;
}

.slideInUp {
  animation: slideInUp 1s ease-out;
}

.slideInLeft {
  animation: slideInLeft 1s ease-out;
}

.slideInRight {
  animation: slideInRight 1s ease-out;
}

.flipInX {
  animation: flipInX 1s ease-out;
}

.zoomIn {
  animation: zoomIn 1s ease-out;
}

.bounceIn {
  animation: bounceIn 1s ease-out;
}

.pulse {
  animation: pulse 2s infinite;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInDown {
  from { transform: translateY(-70px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideInUp {
  from { transform: translateY(70px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideInLeft {
  from { transform: translateX(-70px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideInRight {
  from { transform: translateX(70px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes flipInX {
  from { transform: perspective(400px) rotateX(90deg); opacity: 0; }
  40% { transform: perspective(400px) rotateX(-20deg); }
  60% { transform: perspective(400px) rotateX(10deg); }
  80% { transform: perspective(400px) rotateX(-5deg); }
  to { transform: perspective(400px) rotateX(0); opacity: 1; }
}

@keyframes zoomIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes bounceIn {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.07); opacity: 1; }
  70% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0.7); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(255,255,255,0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0); }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .hero-content h1 {
    font-size: 3.5rem;
  }
  
  .feature-card, .testimonial-card, .step-card {
    padding: 2.5rem 1.5rem;
  }
}

@media (max-width: 992px) {
  .hero-section {
    padding-top: 150px;
    padding-bottom: 100px;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .feature-card h3, .step-card h3 {
    font-size: 1.6rem;
  }
  
  .cta-content h2 {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    padding-top: 120px;
    padding-bottom: 60px;
  }
  
  .hero-content {
    padding: 2rem;
  }
  
  .hero-content h1 {
    font-size: 2.8rem;
  }
  
  .hero-content p {
    font-size: 1.1rem;
  }
  
  .hero-image {
    margin-top: 3rem;
  }
  
  .hero-image img {
    transform: none !important;
    max-width: 90%;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .steps-container::after {
    display: none;
  }
  
  .features-section, .testimonials-section, .steps-section, .cta-section {
    padding: 5rem 5%;
  }
  
  .cta-content h2 {
    font-size: 2.2rem;
  }
  
  .cta-content p {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2.3rem;
  }
  
  .hero-btn, .cta-btn {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .feature-icon {
    font-size: 3rem;
    padding: 1.2rem;
  }
  
  .feature-card h3, .step-card h3 {
    font-size: 1.4rem;
  }
  
  .step-number {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
  
  .testimonial-content {
    font-size: 1rem;
  }
  
  .testimonial-author {
    font-size: 1rem;
  }
  
  .cta-content h2 {
    font-size: 1.8rem;
  }
`}</style>

      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Your Health, Our Priority
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Medicure provides personalized diet plans and health recommendations based on your specific health conditions. Sign in to get started with your journey towards better health.
          </motion.p>
          <motion.button
            className="hero-btn"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/meter')}
          >
            realtime food and nutrition meter
          </motion.button>
        </div>
        <motion.div 
          className="hero-image"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Healthcare professional" 
          />
        </motion.div>
      </motion.section>
      
      {/* Features Section */}
      <section className="features-section">
        <motion.h2 
          className="section-title"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Why Choose Medicure?
        </motion.h2>
        <div className="features-grid">
          {[
            {
              icon: '📊',
              title: 'Personalized Plans',
              description: 'Get health recommendations tailored specifically to your medical conditions and dietary needs.'
            },
            {
              icon: '🍎',
              title: 'Nutrition Guidance',
              description: 'Access detailed meal plans and dietary advice designed by healthcare professionals.'
            },
            {
              icon: '🧘‍♀️',
              title: 'Yoga Bliss',
              description: 'Yoga is a holistic practice that harmonizes the body, mind, and breath through physical postures, breathing techniques , and meditation'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <motion.h2 
          className="section-title"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          What Our Users Say
        </motion.h2>
        <div className="testimonials-container">
          {[
            {
              content: "Medicure changed my life! The personalized diet plan helped me manage my diabetes effectively.",
              author: "Sarah J."
            },
            {
              content: "I've never felt better. The nutrition guidance is spot on and easy to follow.",
              author: "Michael T."
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <div className="testimonial-content">{testimonial.content}</div>
              <div className="testimonial-author">- {testimonial.author}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="steps-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          How It Works
        </motion.h2>
        <div className="steps-container">
          {[
            {
              number: '1',
              title: 'Sign Up',
              description: 'Create your account and complete your health profile'
            },
            {
              number: '2',
              title: 'Get Assessed',
              description: 'Answer questions about your health and lifestyle'
            },
            {
              number: '3',
              title: 'Receive Plan',
              description: 'Get your personalized health and nutrition plan'
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              className="step-card"
              initial={{ 
                y: 50,
                opacity: 0,
                x: index === 0 ? -50 : index === 2 ? 50 : 0
              }}
              whileInView={{ y: 0, opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="cta-content">
          <h2>Ready to Transform Your Health?</h2>
          <p>Join thousands of happy users who have improved their health with Medicure</p>
          <motion.button
            className="cta-btn"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup')}
          >
            Sign Up Now
          </motion.button>
        </div>
      </motion.section>
    </div>
    <Footer></Footer>
    </>
  );
};

export default HomePage;