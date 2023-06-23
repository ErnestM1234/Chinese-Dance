import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Feed from '../components/Feed';


const Landing = () => {
  return (
    <>
      <Feed />
    </>
  );
};
  
export default Landing;
