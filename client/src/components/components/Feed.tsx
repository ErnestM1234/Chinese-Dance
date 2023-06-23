import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ArticlePreview from './ArticlePreview';

export const FEED_QUERY = gql`
query Articles($take: Int) {
    articles(take: $take) {
      articles {
        createdAt
        id
        postedBy {
          id
          name
        }
        text
        title
      }
    }
  }
`;

const Feed = () => {
    const { data, loading, error } = useQuery(FEED_QUERY, {
        variables: { take: 5 }
        });
  
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        console.error(error);
        return <div>Error!</div>;
    }
  
    if (!data) return (<></>);
  
    return (
        <div>
          {data && (
            <>
              {data.articles.articles.map((article: any) => (
                <ArticlePreview args={{id: article.id, title: article.title, text: article.text}}></ArticlePreview>
              ))}
            </>
          )}
        </div>
      );
  };

export default Feed;