import React from 'react';
import Link from './Link';
import { useQuery, gql } from '@apollo/client';

export const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
      }
    }
  }
`;

const LinkList = () => {
    const { data } = useQuery(FEED_QUERY);
  
    return (
        <div>
          {data && (
            <>
              {data.feed.links.map((link: { id: React.Key | null | undefined; }, index: any) => (
                <Link key={link.id} link={link} />
                // <Link key={link.id} link={link} index={index} />
              ))}
            </>
          )}
        </div>
      );
  };

export default LinkList;