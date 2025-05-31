import { Route, Routes } from 'react-router-dom';
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
import News from "./pages/News/News";

function App() {
  return (
      <>
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/search" element={<Search />} />
              <Route path="/tours/:id" element={<TourDetails />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/top-places" element={<TopPalces />} />
              <Route path="/gallery" element={<PhotoGallery />} />
              <Route path="/News" element={<News />} />
            </Routes>
          <Footer />
      </>
  );
}

export default App;