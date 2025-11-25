import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dropdown from "react-bootstrap/Dropdown";
import DefaultImage from "../assets/images/profile.png"; 

const API_URL = process.env.REACT_APP_SITE_URL;
const Header = () => {

     const [profile, setProfile] = useState(null);
    const user = localStorage.getItem("user");
    const navigate = useNavigate();

    useEffect(() => {
           
        if (user) {
        setProfile(JSON.parse(user));
        } else {
        navigate("/login");
        }
    }, [navigate, user]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    }
  return (
    <>
    {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <span className="navbar-brand">My Dashboard</span>
          <div className="d-flex align-items-center">
               
               

            <span className="text-white">
                {profile?.name} ({profile?.role})
            </span>
             
              <div className="ms-3 d-flex">
                {profile && (
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="default" id="profile-basic">
                     
                      <img
                         src={ (profile?.profile_picture ? `${API_URL}${profile.profile_picture}` : DefaultImage) }
                        alt="user"
                        className="avatar-img rounded-5"
                        style={{ width: "25px", height: "25px", objectFit: "cover" }}
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            </div>
         
        </div>
      </nav>
    </>
    
  )
}

export default Header