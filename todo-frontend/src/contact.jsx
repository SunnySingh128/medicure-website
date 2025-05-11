import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';
import Navbar from './navbar';
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset submission status after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const formVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.3
      }
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div className={styles.contactPage}>
      <motion.div
        className={styles.contactContainer}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Contact Information Section */}
        <motion.div 
          className={styles.contactInfo}
          variants={itemVariants}
        >
          <motion.h2 className={styles.sectionTitle} variants={itemVariants}>
            Get in Touch
          </motion.h2>
          
          <motion.p variants={itemVariants}>
            Have questions about our services or need to schedule an appointment? 
            Our team is here to help you with all your healthcare needs.
          </motion.p>
          
          <motion.div className={styles.contactDetails} variants={containerVariants}>
            <motion.div className={styles.contactItem} variants={itemVariants}>
              <div className={styles.contactIcon}>
                <FaMapMarkerAlt />
              </div>
              <div className={styles.contactText}>
                <h3>Our Location</h3>
                <p>145 Medical Drive, Health City,Pathankot (145001)</p>
              </div>
            </motion.div>
            
            <motion.div className={styles.contactItem} variants={itemVariants}>
              <div className={styles.contactIcon}>
                <FaPhone />
              </div>
              <div className={styles.contactText}>
                <h3>Phone Number</h3>
                <p>(+91) 7087206896</p>
                <p>Emergency: (+91) 7018912814</p>
              </div>
            </motion.div>
            
            <motion.div className={styles.contactItem} variants={itemVariants}>
              <div className={styles.contactIcon}>
                <FaEnvelope />
              </div>
              <div className={styles.contactText}>
                <h3>Email Address</h3>
                <p>medicure14@gmail.com</p>
                <p>support@medicure@gmail.com</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div className={styles.openingHours} variants={itemVariants}>
            <h3>Opening Hours</h3>
            <div className={styles.hoursList}>
              <div className={styles.hourItem}>
                <span className={styles.hourDay}>Monday - Friday</span>
                <span className={styles.hourTime}>8:00 AM - 8:00 PM</span>
              </div>
              <div className={styles.hourItem}>
                <span className={styles.hourDay}>Saturday-Sunday</span>
                <span className={styles.hourTime}>9:00 AM - 5:00 PM</span>
              </div>
              <div className={styles.hourItem}>
                <span className={styles.hourDay}>Emergency</span>
                <span className={styles.hourTime}>Emergency 24/7</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div className={styles.mapContainer} variants={itemVariants}>
            <iframe
              src="https://maps.google.com/maps?q=145%20Medical%20Drive%2C%20Health%20City%2CPathankot%20(145001)&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>
        </motion.div>
        
        {/* Contact Form Section */}
        <motion.div 
          className={styles.contactForm}
          variants={formVariants}
        >
          <h2 className={styles.sectionTitle}>Send Us a Message</h2>
          <p>Fill out the form below and we'll get back to you as soon as possible.</p>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.formInput}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.formInput}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.formLabel}>Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className={styles.formInput}
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>Your Message</label>
              <textarea
                id="message"
                name="message"
                className={`${styles.formInput} ${styles.textarea}`}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? (
                <>
                  Sending...
                  <span className={styles.loadingSpinner}></span>
                </>
              ) : (
                <>
                  Send Message
                  <FaPaperPlane className={styles.btnIcon} />
                </>
              )}
            </button>
            
            {isSubmitted && (
              <motion.div 
                className={styles.successMessage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Thank you! Your message has been sent successfully.
              </motion.div>
            )}
          </form>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
};

export default ContactPage;