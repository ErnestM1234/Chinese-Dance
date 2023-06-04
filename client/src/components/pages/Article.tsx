import React from 'react';
import { AUTH_TOKEN } from '../../constants';
import { gql, useQuery } from '@apollo/client';



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

const Article = (props: { id?: number }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const { id } = props;


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
    <div className="flex mt2 items-start">
      <div className="ml1">
        <div>
          {article.title} {article.text} {article.postedBy.name}
        </div>
      </div>
    </div>
  );
};
  
export default Article;
