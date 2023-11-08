import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGlobe, faBell, faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/images/full-logo.svg";
import { getUser } from '../services/services';

const Header = () => {
  const [user, setUser] = useState({});
  const [profileExpand, setProfileExpand] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.hasOwnProperty("token")) {
      getUser(setUser);
    }else {
      navigate("/login");
    }
  },[])

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("ticket");
    navigate("/login");
  }
  return (
    <>
      
      <header>
        <div className="header-left">
          <div className="expanded-menu-logo">
            <FontAwesomeIcon icon={faBars} size="xl" style={{color: "#ffffff",}} />
          </div>
          <Link to="/personal-files"><img src={logo} alt="logo" className="header-logo"/></Link>
        </div>
        
        <div className="header-right">
          <div className="search">
            <input type="text" placeholder='search'/>
          </div>
          <div className="notification">
           <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="profile-info">
            <h2>{`${user.displayName}`}</h2>
            <div className="profile-pic" onClick={() => setProfileExpand(prev => !prev)}>
              {user ? `${user?.firstName?.charAt(0).toUpperCase()}${user?.lastName?.charAt(0).toUpperCase()}` : "UU"}
            </div>
            <div className="language">
              <FontAwesomeIcon icon={faGlobe} size="lg" style={{color: "#ffffff",}} />
            </div>
          </div>
        </div>
      </header>
      <div className="profile-expanded" style={profileExpand ? {display: "flex"} : {display: "none"}}>
        <div className="profile-expanded-header">
          <div className="profile-pic">
            {user ? `${user?.firstName?.charAt(0).toUpperCase()}${user?.lastName?.charAt(0).toUpperCase()}` : "UU"}
          </div>
          <h2>{`${user.displayName}`}</h2>
        </div>
        <div className="profile-expanded-desc">
          <h3>{`${user.displayName}`}</h3>
          <p>{user.email}</p>
          <p>Job Title: </p>
          <div>
            <FontAwesomeIcon icon={faUser} style={{color: "#949494",}} />
            <Link to="/profile" style={{cursor: "pointer", marginLeft: "8px"}}>My Profile</Link>
          </div>
          <div>
            <FontAwesomeIcon icon={faArrowRightFromBracket} style={{color: "#949494",}} />
            <button onClick={() => signOut()} style={{cursor: "pointer", marginLeft: "8px"}}>Sign out</button>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Header