import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';



export const AUTHOR_QUERY = gql`
query User($userId: Int!) {
    user(id: $userId) {
      email
      id
      name
      bio
    }
  }
`;

const Author = () => {
  const location = useLocation()
  const queryParameters = new URLSearchParams(location.search);

  const id = parseInt(queryParameters.get("id") || '0');

  const { loading, error, data } = useQuery(AUTHOR_QUERY, {variables: {userId: id}});
  if (loading) {
    return <div>Loading Author...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const { user } = data;

  if (!user) return (<>No author here!</>)

  return (
    <>
      <h1>{user.name}</h1>
      <div>{user.bio}</div>
    </>
  );
};
  
export default Author;
