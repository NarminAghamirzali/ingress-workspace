import React from 'react';
import Layout from './Layout';
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <Layout>
      <div className="profile-top">
        <Link to='/personal-files'> + </Link>
        <Link to='/profile'>My Profile</Link>
      </div>
      <div className="profile-main">
        <div className="general">General</div>
        <div className="company-details">Company Details</div>
      </div>
    </Layout>
  )
}

export default Profile