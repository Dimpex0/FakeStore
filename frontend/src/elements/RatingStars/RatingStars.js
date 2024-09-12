import "./RatingStars.css";

export default function RatingStars({ rating }) {
  const filledStarsPercent = (rating / 5) * 100;
  return (
    <div className="stars-container">
      <div className="filled-stars" style={{ width: filledStarsPercent + "%" }}>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </div>
      <i className="fa-regular fa-star"></i>
      <i className="fa-regular fa-star"></i>
      <i className="fa-regular fa-star"></i>
      <i className="fa-regular fa-star"></i>
      <i className="fa-regular fa-star"></i>
    </div>
  );
}
