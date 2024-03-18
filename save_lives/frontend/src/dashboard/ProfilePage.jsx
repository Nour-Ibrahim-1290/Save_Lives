import React, { useEffect, useState } from 'react';

import "../style/css/style.css";
import "../style/css/bootstrap.css";
import "../style/fonts/font-awesome/css/font-awesome.css";
import "../style/css/nivo-lightbox/nivo-lightbox.css";
import "../style/css/nivo-lightbox/default.css";


const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: 'Nour Mahmoud Ibrahim',
    email: 'nouribrahim1290@gmail.com',
    age: '34',
    phone: '+201092638799',
    password: 'nourpass',
    passwordcheck: 'nourpass',
    weight: '90',
    blood_type: 'O-',
    donate_blood: 'regular',
    last_donation: '2023-12-20',
    anemic: 'no',
    operation: 'no',
    infectious: 'no',
    infectious_details: '',
    hib: 'none',
    heart: 'no',
    pregnant: 'no',
    diabetic: 'no',
    pp: 'yes',
  });

  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    setEditedData({ ...profileData });
  }, [profileData]);

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
    setEditing(false);
  };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <table>
        <tbody>
          {Object.entries(profileData).map(([key, value]) => (
            <tr key={key}>
              <td>
                <strong>{key}</strong>
              </td>
              <td>
                {editing ? (
                  <input
                    type="text"
                    name={key}
                    value={editedData[key]}
                    onChange={handleChange}
                  />
                ) : (
                  value
                )}
              </td>
              <td>
                {editing ? (
                  <>
                    <button onClick={handleEdit}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => setEditing(true)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfilePage;