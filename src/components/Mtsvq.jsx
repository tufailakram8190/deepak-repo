// components/Home.js
import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalState';
import ScrapChart from './ScrapChart';


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

      {/* <pre>{JSON.stringify(state.data, null, 2)}</pre> */}
      <ScrapChart data={state.data} />

    </div>
  );
};

export default Home;
