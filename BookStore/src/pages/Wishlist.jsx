import { useState, useEffect } from "react";
import EachBook from "../Componant/homeComp/EachBook"; 
import Navbar from "../Componant/homeComp/Navbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaArrowLeft } from "react-icons/fa"; // Import FaArrowLeft

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  // Delete book from wishlist
  const handleDelete = (id) => {
    const updatedWishlist = wishlist.filter((book) => book.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Handle back button click
  const handleBack = () => {
    navigate("/"); // Navigate to the homepage
  };

  return (
    <div>
      <Navbar />

      <div className="container mx-auto py-8 mt-20">
        <h1 className="text-3xl font-semibold text-center mb-6">My Wishlist</h1>

        {/* Back button */}
        <div className="flex justify-between items-center ">
          <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-900 flex items-center mb-4 "
          >
            <FaArrowLeft className="ml-5 mr-2" /> Back to Home
          </button>
        </div>

        {/* If wishlist is empty */}
        {wishlist.length === 0 ? (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-10">
            {wishlist.map((book) => (
              <EachBook
                key={book.id}
                book={book}
                isWishlist={true} 
                handleDelete={handleDelete} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
