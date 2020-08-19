import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { auth, provider } from '../firebase';

import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';

const useStyles = createUseStyles({
  login: {
    width: '60%',
    height: '100%',
    display: 'grid',
    padding: '1rem',
    placeContent: 'center',
    '& div': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& h1': {
        textAlign: 'center',
        paddingBottom: '2rem',
        color: '#60435F',
      },
      '& button': {
        width: '300px',
        backgroundColor: '#D67AB1',
        color: '#f2f2f2',
        fontWeight: 600,
        border: 'none',
        borderRadius: '5px',
      },
    },
  },
});

function Login() {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    const sub = auth.onAuthStateChanged((user) => {
      setLoading(false);
      dispatch({
        type: actionTypes.SET_USER,
        user: user,
      });
      sub();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className={classes.login}>
        <div className="loader">Loading...</div>
      </div>
    );
  }
  return (
    <div className={classes.login}>
      <div>
        <h1>No registration required, sign in with your google account</h1>
        <button type="button" name="signIn" onClick={signIn}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Login;
