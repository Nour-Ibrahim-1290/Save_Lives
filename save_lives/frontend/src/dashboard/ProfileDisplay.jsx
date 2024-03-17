import React from 'react';

function ProfileDisplay({ userData, onEditClick }) {
return (
    <div>
      <h1>{userData.name}</h1>
      <p>{userData.email}</p>
      <p>{userData.bio}</p>
      <button onClick={onEditClick}>Edit</button>
    </div>
  );
}

export default ProfileDisplay;