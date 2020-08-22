import React from 'react';
import { createUseStyles } from 'react-jss';
import { firestore } from 'firebase';
import { useStateValue } from '../context/StateProvider';
import db from '../firebase';

const useStyles = createUseStyles({
  myForm: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '0.6fr',
    justifyContent: 'center',
    paddingTop: '1rem',
  },
  myFormControls: {
    display: 'grid',
    gridTemplateColumns: '1fr',
  },
  button: {
    marginRight: 0,
  },
  '@media screen and (max-width: 32em)': {
    myForm: {
      width: '85vw',
      gridTemplateColumns: '1fr',
    },
    myFormControls: {
      flexDirection: 'column',
    },
  },
});

function AddItem({ id }) {
  const classes = useStyles();
  const [{ user }] = useStateValue();
  const [form, setForm] = React.useState({ title: '', link: '' });
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (!form.title || !form.link) {
      return;
    }
    if (id) {
      await db.collection('categories').doc(id).collection('items').add({
        title: form.title,
        link: form.link,
        timestamp: firestore.FieldValue.serverTimestamp(),
        userId: user.uid,
      });
      setForm({ title: '', link: '' });
    }
  };
  return (
    <form className={classes.myForm} onSubmit={submitForm}>
      <div className={classes.myFormControls}>
        <textarea
          col="4"
          rows="4"
          type="text"
          name="title"
          placeholder="Name and/or description"
          onChange={handleChange}
          value={form.title}
          required
        />
        <input
          type="url"
          name="link"
          className={classes.button}
          placeholder="Link"
          onChange={handleChange}
          value={form.link}
          required
        />
        <input className="input button" type="submit" value="ADD" />
      </div>
    </form>
  );
}

export default AddItem;
