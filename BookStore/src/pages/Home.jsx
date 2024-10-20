import { useState } from "react";
import Navbar from "../Componant/homeComp/Navbar";
import AllBooks from "../Componant/homeComp/AllBooks";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Manage search term in parent

  // Function to update search term
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <AllBooks searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
