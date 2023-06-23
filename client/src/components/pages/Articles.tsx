import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

export const ARTICLES_QUERY = gql`
  {
    articles {
      id
      articles {
        id
        createdAt
        title
        text
        postedBy {
          id
          name
        }
      }
    }
  }
`;

const Articles = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(ARTICLES_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  
    return (
      <>
        <div>
          {data && (
            <div className="article-block-wrapper">
              {data.articles.articles.map((article: any) => (
                <div key={article.id} className="article-block" onClick={() => navigate(`/article?id=${article.id}`)}>
                    <div className="article-block-title"> {article.title} </div>
                    <div className="article-block-preview"> {article.text} </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  };

export default Articles;