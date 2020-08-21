import React from 'react';
import { useStateValue } from '../context/StateProvider';

function UserInfo() {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();

  return (
    <img
      className="user-profile"
      src={user ? user?.photoURL : ''}
      alt="Loading..."
    />
  );
}

export default UserInfo;
