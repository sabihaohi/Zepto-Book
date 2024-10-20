import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails'; 
import Wishlist from './pages/Wishlist';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:title" element={<BookDetails />} />
        <Route path='/wishlist' element={<Wishlist />} />
      </Routes>
    </Router>
  );
}

export default App;
