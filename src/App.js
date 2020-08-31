import React, { useEffect, useState } from 'react';
import AddItem from './components/AddItem';
import Categories from './components/Categories';
import Items from './components/Items';
import Login from './components/Login';
import Logout from './components/Logout';
import UserInfo from './components/UserInfo';
import { actionTypes } from './context/reducer';
import { useStateValue } from './context/StateProvider';
import db, { auth } from './firebase';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();

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
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setItems(
            snapshot.docs.map((doc) => {
              const data = doc.data();
              const { id } = doc;
              return {
                ...data,
                id,
              };
            })
          )
        );
    }
    setIsLoading(false);
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
          <div className="header">
            <Categories values={categories} change={catChanged} />
            <UserInfo />
            <Logout logout={logout} />
          </div>
          <AddItem id={catId} />
          <Items categoryId={catId} isLoading={isLoading} data={items} />
        </>
      ) : (
        <Login />
      )}
    </React.Fragment>
  );
}

export default App;
