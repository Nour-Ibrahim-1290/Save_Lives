import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


import InfoCard from './InfoCard';
import Grid from './InfoCardGrid';
import DonorProfile from './DonorProfilePage';
import RecieverProfile from './RecieverProfilePage';


export default function DashboardBase() {
    const navigate = useNavigate();
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const username = localStorage.getItem('name');
    const userType = localStorage.getItem('userType');


    const [selectedPage, setSelectedPage] = useState('Page1');
    const Page1 = () => (
      <div>
        {userType === 'donor' ? <DonorProfile /> : <RecieverProfile />}
      </div>
    );
    const Page2 = () => <Grid />;

    const handleSignOut = () => {
      // Perform your actions here
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('name');
      localStorage.removeItem('userType');
      localStorage.removeItem('userData');
    
      // Then navigate to the sign out page
      navigate('/');
    };

    const handleLogout = () => {
        // Clear the user's session and navigate to the login page
        // This is just an example, your actual logout logic may be different
        localStorage.removeItem('user');
        navigate('/login');
    };

  return (
    <div id="dashboard" className="container">
      <div>
      <header className="header">
          <h2>Welcome, {username}</h2>
          <button onClick={handleSignOut} className='signout-link'>Sign Out</button>
        </header>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
      <aside className="sidebar">
      <nav>
        <ul>
            <li onClick={() => setSelectedPage('Page1')}>
                  <h4>Personal Information</h4>
              </li>
            <li onClick={() => setSelectedPage('Page2')}>
                  <h4>Request Donation</h4>
              </li>
        </ul>
      </nav>
    </aside>

    
    <main>
        {selectedPage === 'Page1' && <Page1 />}
        {selectedPage === 'Page2' && <Page2 />}
    </main>
    </div>
  </div>
  )
}
