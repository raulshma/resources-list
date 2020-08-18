import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  logout: {
    position: 'fixed',
    top: '0.7rem',
    right: '0px',
  },
});

const Logout = ({ logout }) => {
  const classes = useStyles();
  return (
    <>
      <button className={classes.logout} onClick={logout}>
        Sign out
      </button>
    </>
  );
};

export default Logout;
