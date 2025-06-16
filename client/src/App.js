import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Tours from "./pages/Tours/Tours";
import Search from './pages/Search/Search';
import TourDetails from "./pages/Tours/TourDetails";
import Booking from "./pages/Booking/Booking";
import TopPalces from "./pages/Destinations/Destinations";  
import PhotoGallery from "./pages/PhotoGallery/PhotoGallery";
import "react-datepicker/dist/react-datepicker.css";
// import Success from "./pages/Booking/Success";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (

    <>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/search" element={<Search />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/top-places" element={<TopPalces />} />
        <Route path="/gallery" element={<PhotoGallery />} />
        {/* <Route path="/success" element={<Success />} /> */}
      </Routes>
      <Footer />
    </>

  );
}

export default App;
