import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

const SEARCH_QUERY = gql`
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
          {/* {data &&
            data.feed.links.map((link: { id: React.Key | null | undefined; }) => (
              <Link key={link.id} link={link} />
          ))} */}
      </>
    );
  };

export default Search;