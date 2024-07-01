// components/Contact.js
import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalState';

const Contact = () => {
  const { state } = useContext(GlobalContext);

  return (
    <div>
      <h1>Contact Page</h1>
      <pre>{JSON.stringify(state.data, null, 2)}</pre>
    </div>
  );
};

export default Contact;
