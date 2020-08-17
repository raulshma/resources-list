import React from 'react';
import Item from './Item';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    width: '60vw',
    marginTop: '60px',
    marginBottom: '1rem',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  '@media screen and (max-width: 32em)': {
    container: {
      width: '85vw',
    },
  },
});

function Items({ data }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {data.map((e) => (
        <Item item={e} key={e.title} />
      ))}
    </div>
  );
}

export default Items;
