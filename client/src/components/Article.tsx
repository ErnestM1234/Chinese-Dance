import React from 'react';
import { AUTH_TOKEN } from '../constants';
import { useMutation, gql, useQuery } from '@apollo/client';



export const ARTICLE_QUERY = gql`
  {
    article(id: $id) {
      id
      title
      text
      createdAt
      author {
        id
        name
        email
      }
    }
  }
`;

const Article = (props: { id?: number }) => {
    // const authToken = localStorage.getItem(AUTH_TOKEN);

    const { id } = props;

    const { data } = useQuery(ARTICLE_QUERY, {
        variables: { id: 1 }
    });
    const { article } = data;

    return (
      <div className="flex mt2 items-start">
        <div className="ml1">
          <div>
            {article.title} {article.text} {article.author.name}
          </div>
        </div>
      </div>
    );
  };
  
export default Article;
