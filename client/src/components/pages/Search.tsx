import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import ArticlePreview from '../components/ArticlePreview';

const SEARCH_QUERY = gql`
query Articles($filter: String) {
  articles(filter: $filter) {
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
}`

const Search = () => {
    const [searchFilter, setSearchFilter] = useState('');
    const [executeSearch, { data }] = useLazyQuery(
      SEARCH_QUERY
    );
    return ( 
      <>
          <div>
            Search
            <input
              type="text"
              onChange={(e) => setSearchFilter(e.target.value)}
            />
            <button
              onClick={() =>
                executeSearch({
                  variables: { filter: searchFilter }
                })
              }
            >
              OK
            </button>
          </div>
          {data &&
            data.articles.articles.map((article: any) => (
              <ArticlePreview args={{id: article.id, title: article.title, text: article.text}}></ArticlePreview>
          ))}
      </>
    );
  };

export default Search;