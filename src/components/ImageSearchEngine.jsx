import { useState } from 'react';
import './ImageSearchEngine-style.css'


const ImageSearchEngine = () => {
  
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  

  const searchImages = async () => {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${import.meta.env.VITE_API_KEY}&per_page=15`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (page === 1) {
        setSearchResults([]);
      }
      if (keyword.length === 0) {
        setSearchResults([]);
      }

      const results = data.results;
      setSearchResults((prevResults) => [...prevResults, ...results]);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    searchImages();
  };

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
    searchImages();
  };


  return (
    <>
      <div className="container">
        <h1>Image Search Engine</h1>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="text"
            id="search-box"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search any images here..."
          />
          <button type="submit">Search</button>
        </form>

          <div id="search-result">
            {searchResults.map((result, index) => (
            <a key={index} href={result.links.html} target="_blank">
              <img src={result.urls.small} alt={`Result ${index + 1}`} />
              </a>
            ))}
          </div>
        
          {searchResults.length >= 15 && (
        <button id="show-more-btn" onClick={handleShowMore}>
          Show More
        </button>
      )}
      </div>
    </>
  )
}

export default ImageSearchEngine