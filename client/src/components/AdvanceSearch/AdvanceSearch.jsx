import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdvanceSearch = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    available: false,
    startDate: '',
    endDate: '',
    minPrice: '',
    maxPrice: '',
    destinationName: '',
    country: '',
    sortBy: 'price',
    sortDir: 'asc',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== false) {
        params.append(key, value);
      }
    });

    navigate(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <div className="row mb-3">
        <div className="col">
          <input type="text" className="form-control" placeholder="Destination" name="destinationName" value={formData.destinationName} onChange={handleChange} />
        </div>
        <div className="col">
          <input type="text" className="form-control" placeholder="Country" name="country" value={formData.country} onChange={handleChange} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleChange} />
        </div>
        <div className="col">
          <input type="date" className="form-control" name="endDate" value={formData.endDate} onChange={handleChange} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <input type="number" className="form-control" placeholder="Min Price" name="minPrice" value={formData.minPrice} onChange={handleChange} />
        </div>
        <div className="col">
          <input type="number" className="form-control" placeholder="Max Price" name="maxPrice" value={formData.maxPrice} onChange={handleChange} />
        </div>
      </div>

      <div className="form-check mb-3">
        <input className="form-check-input" type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
        <label className="form-check-label">Available only</label>
      </div>

      <div className="row mb-3">
        <div className="col">
          <select className="form-select" name="sortBy" value={formData.sortBy} onChange={handleChange}>
            <option value="price">Price</option>
            <option value="startDate">Start Date</option>
            <option value="destinationName">Destination</option>
          </select>
        </div>
        <div className="col">
          <select className="form-select" name="sortDir" value={formData.sortDir} onChange={handleChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100">Search</button>
    </form>
  );
};

export default AdvanceSearch;
