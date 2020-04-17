const API_URL = 'https://hasura.k8s.d0do.fr/v1/graphql';

export const fetcher = (token: string, query: string, variables?: any) => fetch(API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    query,
    variables,
  }),
});

export const fetchAsync = async (token: string, fetcher: any, query: string, variables?: any) => {
  console.log('variable,', variables)
  const response = await fetcher(token, query, variables);
  if (!response.ok) {
    throw response;
  }
  try {
    return response.json();
  } catch (err) {
    console.error('Error parsing JSON', err);
  }
};
