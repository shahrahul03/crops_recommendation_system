import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState('Kathmandu');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=cbaf7470aa5e936d80f553bad7839eea`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('City not found');
        }

        const resJson = await response.json();
        setCity(resJson.main);
        setError(null); // Clear any previous errors
      } catch (error) {
        setCity(null); // Clear city data
        setError(error.message);
      }
    };

    fetchApi();
  }, [search]);

  return (
    <div className=" bottom-0 right-0 mb-4 mr-4 p-2 w-40  bg-green-500  rounded-lg  ">
      <div className="mb-2">
        <input
          type="search"
          value={search}
          className="w-full p-1 border text-black bg-gray-200 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          placeholder="Search"
        />
      </div>

      {error ? (
        <p className="text-red-500 text-xs text-center">{error}</p>
      ) : !city ? (
        <p className="text-gray-500 text-xs text-center">No data found</p>
      ) : (
        <div className="text-center text-xs">
          <h2 className="text-sm font-semibold mb-1">Weather</h2>
          <h2 className="text-xs font-medium mb-2 flex items-center justify-center">
            <i className="fa-solid fa-street-view mr-1"></i>
            {search}
          </h2>
          <h1 className="text-sm font-bold mb-1">{city.temp}°C</h1>
          <h3 className="text-xs mb-1">
            min: {city.temp_min}°C | max: {city.temp_max}°C
          </h3>
          <h3 className="text-xs mb-2">Humidity: {city.humidity}%</h3>
        </div>
      )}
    </div>
  );
};

export default Weather;
