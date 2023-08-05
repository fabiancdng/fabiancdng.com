import { env } from 'process';
import querystring from 'query-string';

/**
 * Light wrapper around the WordPress REST API to fetch resources.
 *
 * @param endpoint The endpoint to fetch from 'wp-json/wp/v2/{endpoint}'.
 * @param query The query parameters to append to the querystring.
 *
 * @returns The JSON response from the WordPress REST API.
 */
export const getWpRessource = async (endpoint: string, query: any) => {
  const WP_REST_API_URL = env.WP_REST_API_URL + '/wp/v2';

  // Create the querystring from the query object.
  const requestQueryString = querystring.stringify(query, { arrayFormat: 'bracket' });

  // Put together the full URL for the call.
  const requestUrl = `${WP_REST_API_URL}/${endpoint}/?${requestQueryString}`;

  // Make the HTTP request to the WordPress REST API using the fetch API.
  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Return the JSON response.
  return await response.json();
};
