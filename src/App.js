import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

const App = () => {
  const [img, setImg] = useState('');
  const [res, setRes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const accessKey = 'IHDyvwgZFV3Ip2k3rbU6fuvXPNM83AcPMazOesF94fA'; 
  const perPage = 20;

  const fetchRequest = async (pageNum) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=${pageNum}&query=${img.toLowerCase()}&client_id=${accessKey}&per_page=${perPage}`
      );
      const data = await response.json();
      const result = data.results;
      if (result.length === 0) {
        setHasMore(false);
      } else {
        setRes([...res, ...result]);
        setPage(pageNum + 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest(page);
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    setRes([]);
    setHasMore(true);
    fetchRequest(1);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center input">
          <input
            className="form-control form-control-sm py-1 fs-4 text-capitalize border border-dark"
            type="text"
            placeholder="Search Anything..."
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSearch}
            className="btn bg-dark text-white fs-3 mx-3"
          >
            Search
          </button>
        </div>
        <div className="col-12 d-flex justify-content-evenly flex-wrap">
          <InfiniteScroll
            dataLength={res.length}
            next={() => fetchRequest(page)}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more photos to load</p>}
          >
            {res.map((val) => (
              <img
                key={val.id}
                className="col-3 img-fluid img-thumbnail"
                src={val.urls.small}
                alt={val.alt_description || 'Image'}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default App;
