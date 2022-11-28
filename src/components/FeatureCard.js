// import React, {useState, useEffect} from "react";

const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  

const FeatureCard = (card) => {
    const images = importAll(require.context('../assets/img/imagesLoadedByDynamicUrl', false, /\.png$/));
      
    return (
        <div className="feature-card-item">
            <div className="img-wrap"><img src={images[card.image]} alt="feature-pic" /></div>
            <h2>{card.title}</h2>
            <h4>{card.description}</h4>
        </div>
    );
};
export default FeatureCard;