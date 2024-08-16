import React, { useState, useEffect } from 'react';

const InformationPO = ({ message }) => {
 
  return (
    <div style={styles.popOut}>
      {message}
    </div>
  );
};

const styles = {
  popOut: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '15px 30px',
    backgroundColor: '#28a745', // Green background
    color: '#fff',
    borderRadius: '8px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    opacity: 1,
    transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
    transform: 'translateY(0)',
  },
  popOutHidden: {
    opacity: 0,
    transform: 'translateY(20px)',
  },
};

export default InformationPO;