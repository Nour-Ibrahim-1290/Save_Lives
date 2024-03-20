import React, { useEffect, useState } from 'react';

import "../style/css/style.css";
import "../style/css/bootstrap.css";
import "../style/fonts/font-awesome/css/font-awesome.css";
import "../style/css/nivo-lightbox/nivo-lightbox.css";
import "../style/css/nivo-lightbox/default.css";

const DonorProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  const attributeNames = ['Email Address', 'Age', 'Mobile Phone', 'Weight', 'Blood Type', 'Lastest Donation Date', 'Anemic', 'Operation during Last Month', 'Infectious Dieases', 'Infectious Dieases Details', 'HIB Condition', 'Heart Condition', 'Pregnant', 'Diabetic', 'Blood Pressure'];
  const editableAttributes = ['Age', 'Mobile Phone', 'Weight', 'Lastest Donation Date', 'Anemic', 'Operation during Last Month', 'Infectious Dieases', 'Infectious Dieases Details', 'HIB Condition', 'Heart Condition', 'Pregnant', 'Diabetic', 'Blood Pressure'];

  const attributeToKeyMap = {
    'Email Address': 'email',
    'Age': 'age',
    'Mobile Phone': 'phone',
    'Weight': 'weight',
    'Blood Type': 'blood_type',
    'Lastest Donation Date': 'last_donation',
    'Anemic': 'anemic',
    'Operation during Last Month': 'operation',
    'Infectious Dieases': 'infectious',
    'Infectious Dieases Details': 'infectious_details',
    'HIB Condition': 'hib',
    'Heart Condition': 'heart',
    'Pregnant': 'pregnant',
    'Diabetic': 'diabetic',
    'Blood Pressure': 'pp'
  };

  const renderInput = (key, value) => {
    switch (key) {
      case 'age':
      case 'weight':
        return <input type="number" name={key} value={value} onChange={handleChange} />;
      case 'last_donation':
        return <input type="date" name={key} value={value} onChange={handleChange} />;
      case 'anemic':
      case 'pregnant':
      case 'diabetic':
      case 'pp':
        return (
          <select name={key} value={value} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="yes">Yes, I'm</option>
            <option value="no">No, I'm not</option>
          </select>
        );
      default:
        return <input type="text" name={key} value={value} onChange={handleChange} />;
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    console.log("Profile Page");
    console.log(storedData);
    if (storedData) {
      
      setProfileData(storedData);
      setEditedData({ ...storedData });
    } else {
      console.error('No profile data found in local storage');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = () => {
    setProfileData(editedData);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedData({ ...profileData });
    localStorage.setItem('userData', JSON.stringify(editedData));
    setEditing(false);
  };

  return (
    <div className="profile-page">
      <h1 className='profile-title'>Donor Profile Page</h1>
      <table>
        <tbody>
        {attributeNames.map((attribute) => {
  const key = attributeToKeyMap[attribute];
  return (
    <tr key={attribute}>
      <td>
        <strong>{attribute}</strong>
      </td>
      <td>
        {editing === attribute && editableAttributes.includes(attribute) ? (
          renderInput(key, editedData[key])
        ) : (
          profileData[key]
        )}
      </td>
      <td>
        {editing === attribute ? (
          editableAttributes.includes(attribute) ? (
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <button className="profile-edit-btn" style={{marginRight: '20px'}} onClick={handleEdit}>Save</button>
              <button className="profile-edit-btn" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          ) : (
            <div style={{display: 'flex', justifyContent: 'center', color: '#ff2222'}}>Editing not allowed for this field</div>
          )
        ) : (
          editableAttributes.includes(attribute) && <button className="profile-edit-btn" onClick={() => setEditing(attribute)}>Edit</button>
        )}
      </td>
    </tr>
  );
})}
        </tbody>
      </table>
    </div>
  );
};

export default DonorProfile;