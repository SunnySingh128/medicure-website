import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Shield, Edit, Save, X, Weight, Ruler } from 'lucide-react';
import styles from './userpro.module.css';

const ProfilePage = () => {
  // Initialize state with default values
  const [userData, setUserData] = useState({
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Ave, Health City, HC 12345",
    role: "Patient",
    joinDate: "January 15, 2023",
    avatar: "/api/placeholder/200/200",
    age: 35,
    weight: "70 kg",
    height: "175 cm",
    medicalHistory: [
      { id: 1, date: "2023-05-10", description: "Annual Checkup", doctor: "Dr. Smith" },
      { id: 2, date: "2023-02-22", description: "Flu Vaccination", doctor: "Dr. Johnson" },
      { id: 3, date: "2022-11-15", description: "Physical Therapy", doctor: "Dr. Williams" }
    ],
    upcomingAppointments: [
      { id: 1, date: "2025-06-05", time: "10:30 AM", doctor: "Dr. Smith", reason: "Follow-up" },
      { id: 2, date: "2025-08-12", time: "2:15 PM", doctor: "Dr. Johnson", reason: "Annual Checkup" }
    ]
  });

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({...userData});

  // Load user data from localStorage on component mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
        setUserData(prevData => ({
          ...prevData,
          name: profileData.name || prevData.name,
          age: profileData.age || prevData.age,
          weight: profileData.weight || prevData.weight,
          height: profileData.height || prevData.height
        }));
      }
    } catch (error) {
      console.error('Error loading profile from localStorage:', error);
    }
  }, []);

  // Update editedData when userData changes
  useEffect(() => {
    setEditedData({...userData});
  }, [userData]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save edited data
      setUserData({...editedData});
      
      // Save to localStorage
      try {
        const profileData = {
          name: editedData.name,
          age: editedData.age,
          weight: editedData.weight,
          height: editedData.height
        };
        localStorage.setItem('userProfile', JSON.stringify(profileData));
      } catch (error) {
        console.error('Error saving profile to localStorage:', error);
      }
      
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setEditedData({...userData});
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.profilePageContainer}>
      <div className={styles.profileHeader}>
        <h1>My Profile</h1>
        {isEditing ? (
          <div className={styles.editControls}>
            <button 
              className={`${styles.actionButton} ${styles.saveButton}`}
              onClick={handleEditToggle}
            >
              <Save size={18} />
              <span>Save</span>
            </button>
            <button 
              className={`${styles.actionButton} ${styles.cancelButton}`}
              onClick={handleCancelEdit}
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
          </div>
        ) : (
          <button 
            className={`${styles.actionButton} ${styles.editButton}`}
            onClick={handleEditToggle}
          >
            <Edit size={18} />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      <div className={styles.profileContent}>
        <div className={styles.profileSidebar}>
          <div className={styles.avatarContainer}>
            <img 
              src=" data:image/jpeg;base64,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" 
              alt={`${userData.name}'s avatar`}
              className={styles.userAvatar}
            />
            {isEditing && (
              <div className={styles.avatarUpload}>
                <label htmlFor="avatar-upload" className={styles.uploadLabel}>
                  Change Photo
                </label>
                <input 
                  type="file" 
                  id="avatar-upload" 
                  className={styles.uploadInput} 
                  accept="image/*"
                />
              </div>
            )}
          </div>

          <div className={styles.userRoleContainer}>
            <Shield size={18} />
            <span className={styles.userRole}>{userData.role}</span>
          </div>

          <div className={styles.joinDateContainer}>
            <Calendar size={18} />
            <span>Member since {userData.joinDate}</span>
          </div>
        </div>

        <div className={styles.profileDetails}>
          <div className={styles.profileSection}>
            <h2 className={styles.sectionTitle}>Personal Information</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <User size={16} />
                  <span>Full Name</span>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={handleInputChange}
                    className={styles.editInput}
                  />
                ) : (
                  <div className={styles.infoValue}>{userData.name}</div>
                )}
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <Calendar size={16} />
                  <span>Age</span>
                </div>
                {isEditing ? (
                  <input
                    type="number"
                    name="age"
                    value={editedData.age}
                    onChange={handleInputChange}
                    className={styles.editInput}
                  />
                ) : (
                  <div className={styles.infoValue}>{userData.age}</div>
                )}
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <Weight size={16} />
                  <span>Weight</span>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="weight"
                    value={editedData.weight}
                    onChange={handleInputChange}
                    className={styles.editInput}
                  />
                ) : (
                  <div className={styles.infoValue}>{userData.weight}</div>
                )}
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <Ruler size={16} />
                  <span>Height</span>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="height"
                    value={editedData.height}
                    onChange={handleInputChange}
                    className={styles.editInput}
                  />
                ) : (
                  <div className={styles.infoValue}>{userData.height}</div>
                )}
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>
                  <Briefcase size={16} />
                  <span>Role</span>
                </div>
                <div className={styles.infoValue}>{userData.role}</div>
              </div>
            </div>
          </div>

          <div className={styles.profileSection}>
            <h2 className={styles.sectionTitle}>Medical History</h2>
            <div className={styles.tableContainer}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.medicalHistory.map(item => (
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td>{item.description}</td>
                      <td>{item.doctor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.profileSection}>
            <h2 className={styles.sectionTitle}>Upcoming Appointments</h2>
            <div className={styles.tableContainer}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Doctor</th>
                    <th>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.upcomingAppointments.map(appointment => (
                    <tr key={appointment.id}>
                      <td>{appointment.date}</td>
                      <td>{appointment.time}</td>
                      <td>{appointment.doctor}</td>
                      <td>{appointment.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;