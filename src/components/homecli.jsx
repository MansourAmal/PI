import React from "react";
import Welcame from "./Welcame";  // Carrousel
import SearchCard from "./SearchCard";  // Carte de recherche

const Homecli = () => {
  return (
    <div className="homecli-container">
      {/* Le carrousel (Welcame) en arrière-plan */}
      <Welcame />
    
      {/* La carte de recherche */}
      <div className="search-card-container">
        <SearchCard />
      </div>
    </div>
  );
}

export default Homecli;
