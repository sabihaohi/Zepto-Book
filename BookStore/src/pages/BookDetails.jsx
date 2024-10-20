import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Componant/homeComp/Navbar";
import { FaHeart, FaBook, FaArrowLeft, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // Modal animation for wishlist success

const BookDetails = () => {
  const { title } = useParams();
  const navigate = useNavigate(); // Hook to handle navigation
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Modal state for success
  const [showAlreadyInWishlistModal, setShowAlreadyInWishlistModal] = useState(false); // Modal state for already in wishlist

  useEffect(() => {
    fetch(`https://gutendex.com/books?search=${title.replace(/-/g, " ")}`)
      .then((response) => response.json())
      .then((data) => {
        const matchedBook = data.results.find(
          (book) => book.title.toLowerCase() === title.replace(/-/g, " ")
        );
        setBook(matchedBook);
        setLoading(false);
      });
  }, [title]);

  const addToWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyInWishlist = wishlist.find((item) => item.id === book.id);

    if (!isAlreadyInWishlist) {
      wishlist.push(book);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setShowModal(true); // Show success modal
      setTimeout(() => {
        setShowModal(false); // Hide modal after 2 seconds
      }, 2000);
    } else {
      setShowAlreadyInWishlistModal(true); // Show "already in wishlist" modal
      setTimeout(() => {
        setShowAlreadyInWishlistModal(false); // Hide modal after 2 seconds
      }, 2000);
    }
  };

  const handleBackClick = () => {
    navigate("/"); // Navigate back to homepage
  };

  if (loading) {
    return (
      <div className="container mx-auto mt-40 p-4 max-w-4xl animate-pulse">
        <div className="flex flex-col md:flex-row items-start">
          <div className="md:w-1/3 flex justify-center items-center p-2">
            <div className="h-64 w-full bg-gray-200"></div>
          </div>
          <div className="md:w-2/3 p-4">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded mt-6 w-40"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="m-5 sm:m-0 md:m-0 lg:m-0 xl:m-0">
      <div className="container mx-auto mt-40 p-4 max-w-4xl bg-slate-100 rounded-lg shadow-gray-100 shadow-xl border ">
        <div className="flex justify-between items-center">
          <button
            onClick={handleBackClick}
            className="text-gray-600 hover:text-gray-900 flex items-center mb-4"
          >
            <FaArrowLeft className="mr-2" /> Back to Home
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-start">
          {/* Book Cover */}
          <div className="md:w-1/3 flex justify-center items-center p-2 shadow-xl">
            <img
              className="h-auto w-full object-contain"
              src={book.formats["image/jpeg"] || "https://via.placeholder.com/200x300"}
              alt={book.title}
            />
          </div>

          {/* Book Information */}
          <div className="md:w-2/3 p-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              {book.title}
            </h1>
            <p className="text-sm text-gray-600 mb-1">
              <FaBook className="inline-block mr-1 text-indigo-500" />
              Author: <span className="font-semibold">{book.authors[0]?.name || "Unknown Author"}</span>
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Genre: <span className="font-semibold">{book.subjects[0] || "Unknown Genre"}</span>
            </p>

            {/* Additional Information */}
            <div className="mt-4">
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Download Count:</span> {book.download_count || "N/A"}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Language:</span> {book.languages[0] || "Unknown"}
              </p>
            </div>

            {/* "Add to Wishlist" Button */}
            <div className="mt-6">
              <button
                onClick={addToWishlist}
                className="bg-pink-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 flex items-center"
              >
                <FaHeart className="mr-2 text-red-400" /> Add to wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center bg-neutral-600 bg-opacity-50 z-50"
          >
            <motion.div className="bg-white p-6 rounded-lg shadow-lg text-center ">
              <FaCheckCircle className="text-green-500 text-5xl mb-4 mx-auto" />
              <p className="text-lg font-semibold">{book.title} added to wishlist!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Already in Wishlist Modal */}
      <AnimatePresence>
        {showAlreadyInWishlistModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center bg-neutral-600 bg-opacity-50 z-50"
          >
            <motion.div className="bg-red-500 p-6 rounded-lg shadow-lg text-center">
              <FaExclamationCircle className="text-white text-5xl mb-4 mx-auto" />
              <p className="text-lg font-semibold text-white">
                {title} is already in your wishlist!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BookDetails;
