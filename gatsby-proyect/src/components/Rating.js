import React, { useState } from 'react';

const Rating = ({ articleId }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
    alert(`Gracias por valorar la noticia con ${value} estrellas.`);
  };

  return (
    <div>
      <h4>Valora esta noticia:</h4>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRating(star)}
          style={{ margin: '5px' }}
        >
          ⭐
        </button>
      ))}
      {rating > 0 && <p>Valoración actual: {rating} estrellas</p>}
    </div>
  );
};

export default Rating;
