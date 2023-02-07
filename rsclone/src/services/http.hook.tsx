export const useHttp = () => {
  const request = async (
    url: string,
    method = 'GET',
    body: null | string = null,
    headers: { 'Content-Type': string } = { 'Content-Type': 'application/json' },
  ) => {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {        
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json() as Object;

      return data;
    } catch (e) {
      throw e;
    }
  };

  return { request };
};
