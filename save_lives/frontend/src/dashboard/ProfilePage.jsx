import React, { useEffect, useState } from 'react';
import ProfileForm from './ProfileForm';
import ProfileDisplay from './ProfileDisplay';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user data from an API or a local state
    const fetchedData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      bio: 'I am a software engineer specializing in React.',
    };
    setUserData(fetchedData);
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (updatedData) => {
    // Save the updated data to an API or a local state
    setUserData(updatedData);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <ProfileForm
          userData={userData}
          onSaveClick={handleSaveClick}
        />
      ) : (
        <ProfileDisplay
          userData={userData}
          onEditClick={handleEditClick}
        />
      )}
    </div>
  );
}

export default ProfilePage;