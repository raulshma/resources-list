import React from 'react';

function Item({ item }) {
  return (
    <div className="card">
      <h1>
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          {item.link}
        </a>
      </h1>
      <blockquote>{item.title}</blockquote>
      {item.timestamp && (
        <small>{new Date(item.timestamp.toDate()).toUTCString()}</small>
      )}
    </div>
  );
}

export default Item;
