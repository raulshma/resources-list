import React, { useState, useEffect } from 'react';
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

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [catId, setCatId] = useState('');

  const logout = () => {
    auth().signOut();
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
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setItems(snapshot.docs.map((doc) => doc.data()))
        );
    }
  };

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
          <Categories values={categories} change={catChanged} />
          <UserInfo />
          <Logout logout={logout} />
          <Items data={items} />
          <AddItem id={catId} />
        </>
      ) : (
        <Login />
      )}
    </React.Fragment>
  );
}

export default App;
