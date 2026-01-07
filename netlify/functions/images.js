exports.handler = async (event) => {
  let { query, page } = event.queryStringParameters || {};

  const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

  query = query && query.trim();
  page = Number(page) || 1;

  if (!query) {
    return {
      statusCode: 200,
      body: JSON.stringify({ results: [] })
    };
  }

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${ACCESS_KEY}&per_page=15`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        results: Array.isArray(data.results) ? data.results : []
      })
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({ results: [] })
    };
  }
};
