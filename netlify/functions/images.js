exports.handler = async (event) => {
  const { query = "", page = 1 } = event.queryStringParameters || {};

  const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

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
        results: data.results || []
      })
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({ results: [] })
    };
  }
};
