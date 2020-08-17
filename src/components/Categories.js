import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  select: {
    position: 'fixed',
    top: '0.7rem',
    left: '60px',
  },
});

function Categories({ values, change }) {
  const classes = useStyles();
  return (
    <select name="categories" className={classes.select} onChange={change}>
      <option value="">Select Category</option>
      {values.map((e) => (
        <option value={e.id} key={e.id}>
          {e.name}
        </option>
      ))}
    </select>
  );
}

export default Categories;
