import React from 'react';

const StarRating = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className="flex">
      {Array.from({ length: totalStars }, (_, index) => (
        <span key={index} className={`${index < rating ? 'text-yellow-500' : 'text-gray-300'} text-lg`}>&#9733;</span>
      ))}
    </div>
  );
};

export default StarRating;
