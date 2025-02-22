import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, size = 24 }) => {
  const stars = [];
  const maxStars = 5;
  const starValue = rating / 2; // Convert 10-scale to 5-scale

  for (let i = 1; i <= maxStars; i++) {
    if (i <= starValue) {
      stars.push(<FaStar key={i} size={size} color="yellow" />);
    } else if (i - 0.5 <= starValue) {
      stars.push(<FaStarHalfAlt key={i} size={size} color="yellow" />);
    } else {
      stars.push(<FaRegStar key={i}  size={size} color="gray" />);
    }
  }

  return <div style={{ display: "flex", gap: "3px", marginTop: "5px" }}>{stars}</div>;
};

export default StarRating;
