import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-follow">Contact Us</h3>
          <p><FaPhone /> (+91) 90344 15521</p>
          <p><FaEnvelope /> medicure14@gmail.com</p>
          <p><FaMapMarkerAlt /> 145 Medical Drive, Health City, Pathankot (145001)</p>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-follow">Follow Us</h3>
          <div className="instagram-profiles">
            <a 
              href="https://www.instagram.com/sujal_xviii/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="instagram-link"
            >
              <FaInstagram className="instagram-icon" />
              <span>sujal_xviii</span>
            </a>
            <a 
              href="https://www.instagram.com/tejas.814/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="instagram-link"
            >
              <FaInstagram className="instagram-icon" />
              <span>tejas.814</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className='footer-color'>© 2025 Medicure. All rights reserved.</p>
        <p className='foter-color'>Your trusted health companion</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;