
import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalState';

import Swcchart from './Swc_chart';

const Home = () => {
  const { state } = useContext(GlobalContext);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error.message}</div>;
  }

  return (
    <div>


      <Swcchart  data={state.data}  />
    </div>
  );
};

export default Home;
