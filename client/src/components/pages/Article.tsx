import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';



export const ARTICLE_QUERY = gql`
  query Article($id: Int!) {
    article(id: $id) {
      createdAt
      id
      text
      title
      postedBy {
        email
        id
        name
      }
    }
  }
`;

const Article = () => {
  const location = useLocation()
  const queryParameters = new URLSearchParams(location.search);

  const id = parseInt(queryParameters.get("id") || '0');

  const authToken = localStorage.getItem(process.env.REACT_APP_GQL_AUTH_TOKEN || '');

  const { loading, error, data } = useQuery(ARTICLE_QUERY, {variables: {id}});
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const { article } = data;

  return (
    <>
      <div className="article-title">
        {article.title}
      </div>
      <br/>
      <div className="article-author">
        {article.postedBy.name}
      </div>
      <br/>
      <div className="article-contet">
         {article.text}
      </div>
    </>
  );
};
  
export default Article;
