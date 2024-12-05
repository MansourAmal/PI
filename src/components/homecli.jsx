import React from "react";
import Welcame from "./welcame";  
import SearchCard from "./SearchCard";  

const Homecli = () => {
  return (
    <div className="homecli-container">
      
      <Welcame />
    
     
      <div className="search-card-container">
        <SearchCard />
      </div>
    </div>
  );
}

export default Homecli;
