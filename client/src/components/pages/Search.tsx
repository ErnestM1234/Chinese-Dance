import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import Link from './../components/Link';
import Header from '../components/Header';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        
      }
    }
  }
`;

const Search = () => {
    const [searchFilter, setSearchFilter] = useState('');
    const [executeSearch, { data }] = useLazyQuery(
      FEED_SEARCH_QUERY
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
            data.feed.links.map((link: { id: React.Key | null | undefined; }) => (
              <Link key={link.id} link={link} />
          ))}
      </>
    );
  };

export default Search;