import React, { useState, useCallback } from 'react';
import axios from 'axios';
import osmtogeojson from 'osmtogeojson';
import './GeoJsonFeatures.css';

const GeoJSONFeatures = () => {
  const [geoJSONData, setGeoJSONData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [bbox, setBbox] = useState({
    left: '13.583333',
    bottom: '52.566667',
    right: '13.666667',
    top: '52.633333',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBbox((prevBbox) => ({
      ...prevBbox,
      [name]: value,
    }));
  };

  const handleGetGeoJSON = useCallback(async () => {
    const bboxValues = Object.values(bbox).join(',');
    try {
      setLoader(true);
      const response = await axios.get(
        `https://www.openstreetmap.org/api/0.6/map?bbox=${bboxValues}&data=yes`
      );

      const geoJSON = osmtogeojson(response.data);
      setGeoJSONData(geoJSON);
      setLoader(false);
    } catch (error) {
      setError(error);
      setLoader(false);
    }
  }, [bbox]);

  if (error) {
    return (
      <div className="container error">
        <p>Error fetching data:</p>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>GeoJSON App</h2>
      <h4>Enter Geolocation values:</h4>
      <form>
        <label htmlFor="left">Left:</label>
        <input
          type="text"
          id="left"
          name="left"
          value={bbox.left}
          onChange={handleInputChange}
        />

        <label htmlFor="bottom">Bottom:</label>
        <input
          type="text"
          id="bottom"
          name="bottom"
          value={bbox.bottom}
          onChange={handleInputChange}
        />

        <label htmlFor="right">Right:</label>
        <input
          type="text"
          id="right"
          name="right"
          value={bbox.right}
          onChange={handleInputChange}
        />

        <label htmlFor="top">Top:</label>
        <input
          type="text"
          id="top"
          name="top"
          value={bbox.top}
          onChange={handleInputChange}
        />
        <div>
          <button
            onClick={handleGetGeoJSON}
            disabled={loader}
            className={loader ? 'loading' : ''}
          >
            {loader ? 'Fetching...' : 'Get GeoJSON'}
          </button>
        </div>
      </form>

      {geoJSONData ? <pre>{JSON.stringify(geoJSONData, null, 2)}</pre> : null}
    </div>
  );
};

export default GeoJSONFeatures;
