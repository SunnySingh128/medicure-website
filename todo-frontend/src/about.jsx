import { Link } from 'react-router';
import styles from './about.module.css';
import Navbar from './navbar';
const AboutPage = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className={styles.aboutPage}>
      <div className={styles.aboutHero}>
        <h1>About Medicure</h1>
        <p>Your trusted health companion for personalized diet plans</p>
      </div>

      <div className={styles.aboutContent}>
        <section className={styles.aboutSection}>
          <div className={styles.aboutText}>
            <h2>Our Mission</h2>
            <p>
              At Medicure, we believe that everyone deserves access to personalized health 
              recommendations tailored to their specific conditions. Our mission is to empower 
              individuals to take control of their health through scientifically-backed 
              nutrition plans.
            </p>
            <p>
              We combine medical expertise with cutting-edge technology to provide you with 
              diet recommendations that actually work for your unique situation.
            </p>
          </div>
          <div className={styles.aboutImage}>
            <img 
              src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Medical professionals" 
            />
          </div>
        </section>

        <section className={styles.teamSection}>
          <h2>Meet Our Team</h2>
          <div className={styles.teamMembers}>
            <div className={styles.teamCard}>
              <div className={styles.teamAvatar}>👨‍⚕️</div>
              <h3>Dr. Robert Chen</h3>
              <p className={styles.teamTitle}>Chief Medical Officer</p>
              <p className={styles.teamBio}>
                Board-certified nutritionist with 15 years of clinical experience in 
                dietary management for chronic conditions.
              </p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.teamAvatar}>👩‍💻</div>
              <h3>Sarah Johnson</h3>
              <p className={styles.teamTitle}>Head of Product</p>
              <p className={styles.teamBio}>
                Health tech enthusiast dedicated to creating user-friendly solutions 
                for complex health challenges.
              </p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.teamAvatar}>👨‍🍳</div>
              <h3>Miguel Rodriguez</h3>
              <p className={styles.teamTitle}>Nutrition Chef</p>
              <p className={styles.teamBio}>
                Professional chef specializing in creating delicious meals that meet 
                specific dietary requirements.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.valuesSection}>
          <h2>Our Core Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>❤️</div>
              <h3>Patient-Centered</h3>
              <p>
                Every recommendation we make puts your unique health needs first.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🔬</div>
              <h3>Evidence-Based</h3>
              <p>
                Our plans are grounded in the latest medical research and clinical guidelines.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🤝</div>
              <h3>Transparent</h3>
              <p>
                We believe in clear communication about how and why we make our recommendations.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🌱</div>
              <h3>Sustainable</h3>
              <p>
                We promote eating habits that are good for both you and the planet.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2>Ready to Start Your Health Journey?</h2>
          <p>
            Join thousands of users who have transformed their health with Medicure's 
            personalized recommendations.
          </p>
          <Link to="/login" className={styles.ctaButton}>Get Started</Link>
        </section>
      </div>
    </div>
    </>
  );
};

export default AboutPage;