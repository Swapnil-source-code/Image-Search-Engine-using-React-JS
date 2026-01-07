import { useState } from 'react';
import './ImageSearchEngine-style.css'


const ImageSearchEngine = () => {
  
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  

  const searchImages = async () => {
    const url = `/.netlify/functions/images?page=${page}&query=${keyword}`;

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
        <div className="search-box">
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
        </div>
          <div id="search-result">
            {searchResults.map((result, index) => (
            <a key={index} href={result.links.html} target="_blank" rel="noopener noreferrer">
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