import React from 'react';

const Logout = ({ logout }) => {
  return (
    <>
      <button className="input logout" onClick={logout}>
        Sign out
      </button>
    </>
  );
};

export default Logout;
