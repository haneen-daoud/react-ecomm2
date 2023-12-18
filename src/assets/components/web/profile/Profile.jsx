import React, { useContext } from 'react'

import { UserContext } from '../context/User';

export default function Profile() {
  const { userData, loader } = useContext(UserContext)

  if (loader)
    return <p>loading ...</p>

  return (
    <div className="profile">
      <div className="user_info">
        <h2>{userData.userName}</h2>
        <img src={userData.image.secure_url} className='img-fluid w-50' />
      </div>
      <div className="user_contact">
        <h2>contact information

        </h2>
        <a href={`mailto:${userData.email}`}>email: {userData.email}</a>.
      </div>
    </div>

  )
}
