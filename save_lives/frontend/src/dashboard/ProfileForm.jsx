import React, { useState } from 'react';

function ProfileForm({ userData, onSaveClick }) {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);


  const handleSaveClick = () => {
    const updatedData = {
      name,
      email,
    };
    onSaveClick(updatedData);
  };

  return (
    <div>
      <h1>Editio(e.target Profile</h1>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input />
      <label
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
    </div>
  );
}

 
export default ProfileForm;