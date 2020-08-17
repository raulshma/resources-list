import React from 'react';
import { createUseStyles } from 'react-jss';
import { useStateValue } from '../context/StateProvider';

const useStyles = createUseStyles({
  user: {
    position: 'fixed',
    top: '5px',
    left: '5px',
    border: '1px solid #0062b9',
    width: 50,
    height: 50,
    borderRadius: '50%',
  },
});

function UserInfo() {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();

  return (
    <img
      className={classes.user}
      src={user ? user?.photoURL : ''}
      alt="Loading..."
    />
  );
}

export default UserInfo;
