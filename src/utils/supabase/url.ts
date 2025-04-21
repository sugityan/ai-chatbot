/**
 * Returns the appropriate URL for authentication redirects based on the environment
 */
export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000';

  // Make sure to include `https://` when not localhost.
  url = url.includes('localhost') ? `https://${url}` : url;

  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`;

  return url;
};
