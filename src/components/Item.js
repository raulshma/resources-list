import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  item: {
    backgroundColor: '#ffffff',
    marginBottom: '1rem',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 1px 3px 0 rgba(0, 0, 0, 0.15)',
    '& p': {
      marginBottom: 3,
      fontWeight: 600,
    },
    '& small': {
      color: '#875C74',
    },
  },
});

function Item({ item }) {
  const classes = useStyles();

  return (
    <div className={classes.item}>
      <p>
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          {item.link}
        </a>{' '}
        - {item.title}
      </p>
      {item.timestamp && (
        <small>{new Date(item.timestamp.toDate()).toUTCString()}</small>
      )}
    </div>
  );
}

export default Item;
