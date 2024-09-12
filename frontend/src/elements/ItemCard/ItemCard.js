import { Link } from "react-router-dom";
import "./ItemCard.css";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import RatingStars from "../RatingStars/RatingStars";

export default function ItemCard({ product }) {
  const { id, description, image, price, rating, title } = product;

  return (
    <div className="card-container">
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <p className="card-description">{description}</p>
        <div className="card-price-rating-container">
          <p className="card-price">{price.toFixed(2)}$</p>
          <div className="card-rating-container">
            <RatingStars rating={rating.rate} />
            <p className="card-rating-number">{rating.rate}</p>
          </div>
        </div>
      </Link>
      <div className="card-action-container">
        <AddToCartButton productId={id} quantity={1}>
          Add to cart
        </AddToCartButton>
        <button className="buy-now">Buy now</button>
      </div>
    </div>
  );
}
