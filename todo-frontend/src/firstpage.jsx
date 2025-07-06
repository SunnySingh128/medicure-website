import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

const DiseaseSelection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    specialist: '' // Store selected specialist
  });

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  const specialists = [
    { name: 'diabetes', icon: '🩸', label: 'Diabetes' },
    { name: 'hypertension', icon: '❤️', label: 'Hypertension' },
    { name: 'fever', icon: '🌡️', label: 'fever' },
    { name: 'thyroid', icon: '🔹', label: 'Thyroid Issues' },
    { name: 'obesity', icon: '⚖️', label: 'Obesity' },
    { name: 'heart-disease', icon: '💓', label: 'Heart Disease' },
    { name: 'kidney-disease', icon: '🫘', label: 'Kidney Disease' },
    { name: 'Asthma	', icon: '🫁', label: 'Asthma	' }
  ];

  const filteredSpecialists = specialists.filter(specialist =>
    specialist.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    // Make sure we've saved all the data
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  const handleSpecialistSelect = (condition) => {
    // Store profile data in localStorage and update state
    const updatedProfile = {
      ...profileData,
      specialist: condition
    };
    
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setProfileData(updatedProfile);
        // Navigate to appropriate page or show confirmation
        navigate(`/dietplan/${condition}`);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    const updatedProfile = {
      ...profileData,
      [name]: value
    };
    
    // Store in localStorage immediately on change
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    
    // Update state
    setProfileData(updatedProfile);
  };

  // CSS styles
  const styles = `
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 20px;
    }

    .page {
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      padding: 30px;
      width: 100%;
      max-width: 800px;
      animation: fadeIn 0.5s ease-out;
      position: relative;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .welcome-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .welcome-header h2 {
      color: #2c3e50;
      margin-bottom: 10px;
      font-size: 28px;
    }

    .profile-section {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 15px;
      margin-bottom: 30px;
      border: 1px solid #e0e0e0;
    }

    .profile-form {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      font-size: 14px;
      color: #7f8c8d;
      margin-bottom: 5px;
    }

    .form-group input {
      padding: 10px 15px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 15px;
      transition: all 0.3s ease;
    }

    .form-group input:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }

    .search-bar {
      position: relative;
      margin-bottom: 30px;
    }

    .search-bar input {
      width: 100%;
      padding: 15px 20px;
      border: 2px solid #e0e0e0;
      border-radius: 50px;
      font-size: 16px;
      transition: all 0.3s ease;
      padding-left: 50px;
    }

    .search-icon {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 18px;
      color: #7f8c8d;
    }

    .specialist-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .specialist-card {
      background: white;
      border-radius: 15px;
      padding: 20px 15px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      border: 1px solid #e0e0e0;
    }

    .specialist-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      border-color: #3498db;
    }

    .specialist-icon {
      font-size: 40px;
      margin-bottom: 15px;
      transition: transform 0.3s ease;
    }

    .specialist-card:hover .specialist-icon {
      transform: scale(1.1);
    }

    .specialist-card h3 {
      color: #2c3e50;
      font-size: 16px;
      margin: 0;
    }

    .specialist-selected {
      border-color: #3498db;
      background-color: rgba(52, 152, 219, 0.1);
    }

    #saveBtn {
      display: block;
      width: 100%;
      padding: 12px;
      background: #27ae60;
      color: white;
      border: none;
      border-radius: 50px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 20px;
    }
    
    #saveBtn:hover {
      background: #2ecc71;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(46, 204, 113, 0.2);
    }

    /* Responsive adjustments */
    @media (max-width: 600px) {
      .specialist-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .page {
        padding: 20px 15px;
      }

      .profile-form {
        grid-template-columns: 1fr;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="page">
          <div className="welcome-header">
            <h2>User Profile</h2>
          </div>

          {/* Simple Profile Form - Always visible */}
          <div className="profile-section">
            <div className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={profileData.name}
                  onChange={handleProfileChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input 
                  type="number" 
                  id="age" 
                  name="age" 
                  value={profileData.age}
                  onChange={handleProfileChange}
                  placeholder="Enter your age"
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input 
                  type="number" 
                  id="weight" 
                  name="weight" 
                  value={profileData.weight}
                  onChange={handleProfileChange}
                  placeholder="Enter your weight"
                />
              </div>
              <div className="form-group">
                <label htmlFor="height">Height (cm)</label>
                <input 
                  type="number" 
                  id="height" 
                  name="height" 
                  value={profileData.height}
                  onChange={handleProfileChange}
                  placeholder="Enter your height"
                />
              </div>
            </div>
          </div>

          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search specialists..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-icon">🔍</div>
          </div>
          
          <div className="specialist-grid">
            {filteredSpecialists.map((specialist) => (
              <div 
                key={specialist.name}
                className={`specialist-card ${profileData.specialist === specialist.name ? 'specialist-selected' : ''}`}
                onClick={() => handleSpecialistSelect(specialist.name)}
              >
                <div className="specialist-icon">{specialist.icon}</div>
                <h3>{specialist.label}</h3>
              </div>
            ))}
          </div>
          
          <button id="saveBtn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </>
  );
};

export default DiseaseSelection;