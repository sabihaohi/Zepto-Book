import { useEffect, useState } from "react";
import EachBook from "./EachBook";
import FilterComponent from "./FilterComp";
import PropTypes from "prop-types";

const AllBooks = ({ searchTerm }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //pagination

  const booksPerPage = 10; 

  useEffect(() => {
    fetch("https://gutendex.com/books/")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.results);
        setFilteredBooks(data.results);
        setLoading(false);

      
        const uniqueGenres = new Set();
        data.results.forEach((book) => {
          book.subjects.forEach((subject) => uniqueGenres.add(subject));
        });
        setGenres(Array.from(uniqueGenres)); 
      });
  }, []);

  const handleFilterChange = (category) => {
    setCategoryFilter(category);
    filterBooks(searchTerm, category);
  };

  const filterBooks = (term, category) => {
    const filtered = books.filter((book) => {
      const titleMatch = book.title.toLowerCase().includes(term.toLowerCase());
      const authorMatch = book.authors.some((author) =>
        author.name.toLowerCase().includes(term.toLowerCase())
      );
      return titleMatch || authorMatch;
    });

    const finalFilteredBooks = category
      ? filtered.filter((book) =>
          book.subjects.some((subject) =>
            subject.toLowerCase().includes(category.toLowerCase())
          )
        )
      : filtered;

    setFilteredBooks(finalFilteredBooks);
  };

  useEffect(() => {
    filterBooks(searchTerm, categoryFilter);
    setCurrentPage(1); // Reset to the first page when filter/search changes
  }, [searchTerm, categoryFilter]);

  // Calculate the index range of the books to display on the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Check if search or filter is applied
  const isFiltered = searchTerm || categoryFilter;

  // Skeleton loading state showing 10 skeleton cards with pulse effect
  if (loading) {
    return (
      <div className="container mx-auto p-4 mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="animate-pulse p-4 bg-white shadow-md rounded-md flex flex-col"
              >
                <div className="h-48 bg-gray-300 rounded-md mb-4"></div> 
                <div className="h-6 bg-gray-300 rounded-md w-3/4 mb-2"></div> 
                <div className="h-4 bg-gray-300 rounded-md w-1/2"></div> 
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-24">
      {/* Filter and Books Section */}
      <div className="flex flex-col md:flex-row gap-5">
        {/* Filter Section */}
        <div className="w-full md:w-1/4 pt-20">
          <FilterComponent genres={genres} onFilterChange={handleFilterChange} />
        </div>

      
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-bold text-center mb-10">All Books</h2>

        
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentBooks.map((book) => (
              <EachBook key={book.id} book={book} />
            ))}
          </div>

          
          {!isFiltered && (
            <div className="flex justify-center mt-8 space-x-2 mb-10">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === pageNumber
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBooks;

// Props validation
AllBooks.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
