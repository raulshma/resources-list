import React, { useState, useEffect } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import UserInfo from './components/UserInfo';
import Categories from './components/Categories';
import Items from './components/Items';
import AddItem from './components/AddItem';
import Login from './components/Login';
import Logout from './components/Logout';

import db, { auth } from './firebase';
import { useStateValue } from './context/StateProvider';
import { actionTypes } from './context/reducer';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();
  const [headerStyle, setHeaderStyle] = useState({
    backgroundColor: 'transparent',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [catId, setCatId] = useState('');

  const logout = () => {
    auth.signOut();
    dispatch({
      type: actionTypes.SET_USER,
      user: '',
    });
  };

  const catChanged = (e) => {
    const {
      target: { value: id },
    } = e;
    if (id) {
      setCatId(id);
      db.collection('categories')
        .doc(id)
        .collection('items')
        .where('userId', '==', user.uid)
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setItems(snapshot.docs.map((doc) => doc.data()))
        );
    }
    setIsLoading(false);
  };

  useScrollPosition(
    ({ prevPos, currPos }) => {
      console.log(currPos.y < -100, currPos.y);
      if (currPos.y < -100) {
        setHeaderStyle({
          backgroundColor: 'rgba(255,255,255,0.87)',
          boxShadow: '0px 4px 3px 0px rgba(0, 0, 0, 0.1)',
        });
        return;
      }
      if (currPos.y > -100) {
        if (headerStyle.backgroundColor !== 'transparent') {
          setHeaderStyle({ backgroundColor: 'transparent' });
        }
      }
    },
    [headerStyle]
  );

  useEffect(() => {
    if (user)
      db.collection('categories').onSnapshot(({ docs }) => {
        setCategories(
          docs.map((doc, i) => ({
            id: doc.id,
            name: doc.data().name,
          }))
        );
      });
  }, [user]);

  return (
    <React.Fragment>
      {user ? (
        <>
          <div className="header" style={{ ...headerStyle }}>
            <Categories values={categories} change={catChanged} />
            <UserInfo />
            <Logout logout={logout} />
          </div>
          <Items isLoading={isLoading} data={items} />
          <AddItem id={catId} />
        </>
      ) : (
        <Login />
      )}
    </React.Fragment>
  );
}

export default App;
