import React from 'react';
import Item from './Item';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    width: '60vw',
    marginTop: '4.5rem',
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

function Items({ isLoading, data }) {
  const classes = useStyles();
  return (
    <>
      {!isLoading ? (
        <div className={classes.container}>
          {data.map((e) => (
            <Item item={e} key={e.title} />
          ))}
        </div>
      ) : (
        <div className="loader loader-sm">Loading...</div>
      )}
    </>
  );
}

export default Items;
