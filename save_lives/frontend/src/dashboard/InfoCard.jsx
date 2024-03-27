
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

import { MdWaterDrop } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";

import "../style/css/style.css";
import "../style/css/bootstrap.css";
import "../style/fonts/font-awesome/css/font-awesome.css";
import "../style/css/nivo-lightbox/nivo-lightbox.css";
import "../style/css/nivo-lightbox/default.css";

export default function InfoCard({ user }) {
  const [successMessage, setSuccessMessage] = useState(null);

  async function sendRequest(donorId, neededBloodType, proposedBloodType) {
    try {
      const accessToken = localStorage.getItem('acessToken');
      const response = await axios.post('http://127.0.0.1:8000/asks/send-request/', {
        donor_id: user.donor.id,
        needed_blood_type: "A+",
        proposed_blood_type: user.donor.blood_type
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="user-info-card" className="px-4">
      <div className="grid md:grid-cols-2 gap-6 xl:gap-12 items-start">
        <Card className='info-card'>
          <Card.Header className="pb-0">
            <Card.Title style={{fontWeight: 'bold', fontSize: '18px'}}>{user.user.name}</Card.Title>
            {/* <Card.Text>Choose from a variety of categories</Card.Text> */}
          </Card.Header>
          <Card.Body className="space-y-4">
          <div className="flex items-center gap-4"
                  style={{flexDirection: 'row', alignItems: 'center'}}>
              <MdWaterDrop style={{fontSize:'2rem', marginRight: '6px', color: 'ff0000'}} />
              <div style={{display: 'inline-block', 
                          marginBottom: '4px', fontSize: '16px',
                          fontWeight: 'bold'}}>
                {user.donor.blood_type}
              </div>
            </div>
            <div className="flex items-center gap-4"
                  style={{flexDirection: 'row', alignItems: 'center'}}>
              <MdMarkEmailUnread style={{fontSize:'2rem', marginRight: '6px', color: 'ff0000'}} />
              <div style={{display: 'inline-block', 
                          marginBottom: '4px', fontSize: '16px',
                          fontWeight: 'bold'}}>
                {user.user.email}
              </div>
            </div>
            <div className="flex items-center gap-4"
                  style={{flexDirection: 'row', alignItems: 'center'}}>
              <FaSquarePhone style={{fontSize:'2rem', marginRight: '6px', color: 'ff0000'}} />
              <div style={{display: 'inline-block', 
                          marginBottom: '4px', fontSize: '16px',
                          fontWeight: 'bold'}}>
                {user.user.phone}
              </div>
            </div>
            <div className="flex items-center gap-4"
                  style={{flexDirection: 'row', alignItems: 'center'}}>
              <CiCalendarDate style={{fontSize:'2rem', marginRight: '6px', color: 'ff0000'}} />
              <div style={{display: 'inline-block', 
                          marginBottom: '4px', fontSize: '16px',
                          fontWeight: 'bold'}}>
                {user.donor.last_donation}
              </div>
            </div>
            <div className="flex items-center gap-4" style={{marginTop: '4px'}}>
            <button className="profile-edit-btn" 
                    onClick={sendRequest}>
                      Send Request</button>
                {successMessage && <div>{successMessage}</div>}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

