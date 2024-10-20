import { useState } from "react";
import PropTypes from "prop-types";

const FilterComponent = ({ onFilterChange, genres }) => {
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleFilterChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        onFilterChange(category);
    };

    return (
        <div className="p-6 bg-slate-100 shadow-xl rounded-md max-w-2xl mx-auto border space-y-10"> {/* Updated max width and spacing */}
            
            {/* Filter Books Section */}
            <div className="filter-section">
                <h3 className="text-xl font-bold mb-4">Filter Books</h3>
                <select
                    value={selectedCategory}
                    onChange={handleFilterChange}
                    className="w-full p-2 border-2 border-gray-300 rounded-md"
                >
                    <option value="">Select a Topic</option>
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>

            {/* About Zepto Books Section */}
            <div className="about-section">
                <h3 className="text-xl font-bold mb-4">About Zepto Books</h3>
                <p className="text-sm text-gray-600">
                    Zepto Books is an online library that offers an extensive collection of books from various genres. 
                    Whether youre interested in fiction, non-fiction, science, or art, Zepto Books has something for everyone.
                    Our platform is designed to make reading and discovering new books easy and enjoyable.
                </p>
            </div>

            {/* Policies Section */}
            <div className="policies-section">
                <h3 className="text-xl font-bold mb-4">Our Policies</h3>
                <p className="text-sm text-gray-600">
                    At Zepto Books, we take your privacy and reading preferences seriously. Our policies ensure that your personal 
                    information is protected, and we are committed to providing a safe and enjoyable experience for all users. 
                    For more details, please visit our Privacy Policy and Terms of Service pages.
                </p>
            </div>

            {/* Additional Instructions at the Bottom */}
            <div className="mt-4 text-sm text-gray-600">
                <p>
                    Tip: You can clear the filter by selecting the Select a Topic option to browse 
                    through all books. Happy reading!
                </p>
            </div>
        </div>
    );
};

export default FilterComponent;

// Props validation
FilterComponent.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired, 
};
