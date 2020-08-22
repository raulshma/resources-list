import React from 'react';
import db from '../firebase';

function Item({ categoryId, item }) {
  const deleteItem = async (itemId) => {
    if (itemId) {
      await db
        .collection('categories')
        .doc(categoryId)
        .collection('items')
        .doc(itemId)
        .delete();
    }
  };

  return (
    <div className="card">
      <h1>
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          {item.link}
        </a>
      </h1>
      <blockquote>{item.title}</blockquote>
      <div className="item__footer">
        {item.timestamp && (
          <small>{new Date(item.timestamp.toDate()).toUTCString()}</small>
        )}
        <button
          onClick={() => {
            if (window.confirm('Are you sure you wish to delete this item?'))
              deleteItem(item.id);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default Item;
