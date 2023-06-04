import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_ARTICLE_MUTATION = gql`
  mutation Mutation($title: String!, $text: String!) {
    create(title: $title, text: $text) {
      createdAt
      id
      postedBy {
        email
        id
        name
      }
      text
      title
    }
  }
`;

const ARTICLES_QUERY = gql`
query Query {
    articles {
      articles {
        createdAt
        id
        postedBy {
          email
          id
          name
        }
        text
        title
      }
    }
  }
  
`

// query Query {

const CreateArticle = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: '',
    text: ''
  });

  const [createArticle] = useMutation(CREATE_ARTICLE_MUTATION, {
    variables: {
      title: formState.title,
      text: formState.text
    },
    update: async (cache, { data: { create } }) => {

        // get cache articles
        const data = await cache.readQuery<any>({
          query: ARTICLES_QUERY,
        });
        // add the new article to the cache
        cache.writeQuery({
          query: ARTICLES_QUERY,
          data: {
            articles: {
              articles: [create, ...data?.articles.articles]
            }
          },
        });
      },
    onCompleted: () => navigate('/')
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createArticle();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.title}
            onChange={(e) =>
              setFormState({
                ...formState,
                title: e.target.value
              })
            }
            type="text"
            placeholder="A title for the article"
          />
          <input
            className="mb2"
            value={formState.text}
            onChange={(e) =>
              setFormState({
                ...formState,
                text: e.target.value
              })
            }
            type="text"
            placeholder="The text for the article"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateArticle;