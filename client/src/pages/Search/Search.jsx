import React, { useState, useEffect } from "react";

function SearchTours() {
  // Các state lọc
  const [available, setAvailable] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [country, setCountry] = useState("");

  // Phân trang và sắp xếp
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("price");
  const [sortDir, setSortDir] = useState("asc");

  // Kết quả tours
  const [tours, setTours] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch data từ API backend
  const fetchTours = async () => {
    const params = new URLSearchParams();

    if (available !== "") params.append("available", available);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (destinationName) params.append("destinationName", destinationName);
    if (country) params.append("country", country);

    params.append("page", page);
    params.append("size", size);
    params.append("sortBy", sortBy);
    params.append("sortDir", sortDir);

    try {
      const response = await fetch(`http://localhost:8080/api/tours/search?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch tours");
      }
      const data = await response.json();

      // Nếu API trả về Page<Tour>, bạn cần lấy data.content và data.totalPages
      // Còn nếu API trả về List<Tour> thì phải sửa lại backend để trả Page<Tour> (để phân trang)
      // Giả sử backend đã sửa trả về Page<Tour> dạng:
      // {
      //   content: [...],
      //   totalPages: n,
      //   number: currentPage,
      //   ...
      // }
      setTours(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
      setTours([]);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [page, size, sortBy, sortDir]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0); // reset page khi search mới
    fetchTours();
  };

  return (
    <div>
      <h2>Tìm kiếm Tour</h2>
      <form onSubmit={handleSearch}>
        <label>
          Có sẵn:
          <select value={available} onChange={(e) => setAvailable(e.target.value)}>
            <option value="">Tất cả</option>
            <option value="true">Có</option>
            <option value="false">Không</option>
          </select>
        </label>
        <label>
          Ngày bắt đầu:
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </label>
        <label>
          Ngày kết thúc:
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </label>
        <label>
          Giá tối thiểu:
          <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
        </label>
        <label>
          Giá tối đa:
          <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
        </label>
        <label>
          Điểm đến:
          <input type="text" value={destinationName} onChange={e => setDestinationName(e.target.value)} />
        </label>
        <label>
          Quốc gia:
          <input type="text" value={country} onChange={e => setCountry(e.target.value)} />
        </label>
        <button type="submit">Tìm kiếm</button>
      </form>

      <div>
        <h3>Kết quả ({tours.length} tours)</h3>
        {tours.length === 0 && <p>Không có kết quả phù hợp.</p>}
        <ul>
          {tours.map((tour) => (
            <li key={tour.id}>
              <h4>{tour.name}</h4>
              <p>Giá: {tour.price} USD</p>
              <p>Địa điểm: {tour.destinationName}, {tour.country}</p>
              <p>Ngày bắt đầu: {tour.startDate}</p>
              <p>Trạng thái: {tour.available ? "Còn chỗ" : "Hết chỗ"}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button disabled={page <= 0} onClick={() => setPage(page - 1)}>Trước</button>
        <span> Trang {page + 1} / {totalPages} </span>
        <button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Sau</button>
      </div>

      <div>
        <label>
          Sắp xếp theo:
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="price">Giá</option>
            <option value="startDate">Ngày bắt đầu</option>
            <option value="name">Tên tour</option>
          </select>
        </label>
        <label>
          Thứ tự:
          <select value={sortDir} onChange={e => setSortDir(e.target.value)}>
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default SearchTours;
