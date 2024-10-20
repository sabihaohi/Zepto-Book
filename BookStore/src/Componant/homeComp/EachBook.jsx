import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaTrash, FaExclamationCircle } from "react-icons/fa"; // Add warning icon
import { motion, AnimatePresence } from "framer-motion"; 
import { FaCheckCircle } from "react-icons/fa"; 

const EachBook = ({ book, isWishlist, handleDelete }) => {
  const { title, authors, formats, subjects, id } = book;
  const genre = subjects.length > 0 ? subjects[0] : "Unknown Genre";
  const navigate = useNavigate();

  // State to control success and warning modals
  const [showModal, setShowModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false); // Warning modal state

  const handleBookClick = () => {
    const urlTitle = title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/book/${urlTitle}`);
  };

  const addToWishlist = (e) => {
    e.stopPropagation();
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyInWishlist = wishlist.find((item) => item.id === id);

    if (!isAlreadyInWishlist) {
      wishlist.push(book);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setShowModal(true); 
      setTimeout(() => {
        setShowModal(false); 
      }, 2000);
    } else {
      setShowWarningModal(true); 
      setTimeout(() => {
        setShowWarningModal(false); 
      }, 2000);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        onClick={handleBookClick}
        className="w-full sm:w-60 md:w-48 lg:w-56 min-h-[20rem] rounded-lg overflow-hidden bg-white relative flex flex-col cursor-pointer hover:scale-105 hover:shadow-pink-300 hover:shadow-md transition-all duration-200 border shadow-gray-100 shadow-xl"
      >
        {/* Book Cover Image */}
        <div className="h-48 w-full flex justify-center items-center p-2">
          <img
            className="h-full w-auto object-contain"
            src={formats["image/jpeg"] || "https://via.placeholder.com/200x200"}
            alt={title}
          />
        </div>

        {/* Card Content */}
        <div className="p-2 flex-grow flex flex-col justify-between">
          <div className="text-center">
            <h2 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">
              {title}
            </h2>
            <p className="text-xs text-gray-600 mb-1">
              Author: {authors.length > 0 ? authors[0].name : "Unknown Author"}
            </p>
            <p className="text-xs text-gray-500 mb-1">Genre: {genre}</p>
            <p className="text-xs text-gray-500 mb-1">ID: {id}</p>
          </div>

          <div className="text-center mt-auto mx-auto">
            {!isWishlist ? (
              // Add to Wishlist Button (Visible only on non-wishlist pages)
              <button
                onClick={addToWishlist}
                className="bg-pink-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 flex items-center mb-2 mt-2"
              >
                <FaHeart className="mr-1 mt-0.5 text-red-400" /> Add to wishlist
              </button>
            ) : (
              // Delete Button (Visible only on wishlist page)
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigating when deleting
                  handleDelete(id);
                }}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 flex items-center mb-2 mt-2"
              >
                <FaTrash className="mr-1 mt-0.5" /> Remove from wishlist
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Modal for success message */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-neutral-600 bg-opacity-70 z-50"
          >
            <motion.div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaCheckCircle className="text-green-500 text-5xl mb-4 mx-auto" />
              <p className="text-lg font-semibold">{title} added to wishlist!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for warning message */}
      <AnimatePresence>
        {showWarningModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-neutral-600 bg-opacity-70 z-50"
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

EachBook.propTypes = {
  book: PropTypes.shape({
    formats: PropTypes.objectOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    subjects: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  isWishlist: PropTypes.bool, 
  handleDelete: PropTypes.func, 
};

export default EachBook;
