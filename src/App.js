import React, { useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const accessKey = "AmDmbh53KjNSXq2arbdupaJrQ69wNeTg5R8Q8MI_Y6Y"; 
  const apiUrl = 'https://api.unsplash.com/search/photos'; 

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl, {
        params: {
          query,
          page,
          per_page: 10,
          client_id: accessKey,
        },
      });
      setPhotos([...photos, ...response.data.results]);
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPhotos([]);
    setPage(1);
    fetchPhotos();
  };

  return (
    <div className="App">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for photos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      <InfiniteScroll
        dataLength={photos.length}
        next={fetchPhotos}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more photos to load</p>}
      >
        <div className="photo-list">
          {photos.map((photo) => (
            <img key={photo.id} src={photo.urls.small} alt={photo.alt_description} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default App;
