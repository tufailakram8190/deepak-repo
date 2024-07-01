// components/About.js
import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalState';

const About = () => {
  const { state } = useContext(GlobalContext);

  return (
    <div>
      <h1>About Page</h1>
      <pre>{JSON.stringify(state.data, null, 2)}</pre>
    </div>
  );
};

export default About;
