export const jsonRequest = ({ headers, body }) => { 
  const config = { 
    headers: { 'Content-Type': 'application/json', ...headers, } 
  };
  body = body && JSON.stringify(body);
  return { config, body };
};