import { useNavigate } from "react-router-dom";
import { useAccountStore } from "../../store/account";
import { getCsrfToken } from "../../utils/auth";
import "./ItemCard.css";

export default function ItemCard({ product }) {
  const { id, description, image, price, rating, title } = product;
  const filledStarsPercent = (rating.rate / 5) * 100;

  const { isLoggedIn } = useAccountStore();
  const navigate = useNavigate();

  async function handleAddToCart() {
    if (!isLoggedIn) {
      navigate(`/account/login?next=/cart&cart_item_to_add=${id}`);
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/cart/add/${id}/1/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCsrfToken(),
          },
        }
      );
      // TODO handle response
    }
  }

  return (
    <div className="card-container">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p className="card-description">{description}</p>
      <div className="card-price-rating-container">
        <p className="card-price">{price.toFixed(2)}$</p>
        <div className="card-rating-container">
          <div>
            <div
              className="card-filled-stars"
              style={{ width: filledStarsPercent + "%" }}
            >
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
          <p className="card-rating-number">{rating.rate}</p>
        </div>
      </div>
      <div className="card-action-container">
        <button onClick={handleAddToCart} className="add-to-cart">
          Add to cart
        </button>
        <button className="buy-now">Buy now</button>
      </div>
    </div>
  );
}
