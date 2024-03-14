import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


import InfoCard from './InfoCard';
import Grid from './InfoCardGrid';


export default function DashboardBase() {
    const navigate = useNavigate();
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);


    const [selectedPage, setSelectedPage] = useState('Page1');
    const Page1 = () => <InfoCard />;
    const Page2 = () => <Grid />;
    const Page3 = () => <div>Page 3 content</div>;

    const handleSettings = () => {
        // Navigate to the settings page
        navigate('/settings');
    };

    const handleSupport = () => {
        // Navigate to the support page
        navigate('/support');
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
          <h1>Dashboard</h1>
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
        {selectedPage === 'Page3' && <Page3 />}
    </main>
    </div>
  </div>
  )
}
