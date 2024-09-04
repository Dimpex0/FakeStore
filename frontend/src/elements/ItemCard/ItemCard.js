import "./ItemCard.css";

export default function ItemCard({ product }) {
  const { description, image, price, rating, title } = product;
  const filledStarsPercent = (rating.rate / 5) * 100;
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
        <button className="add-to-cart">Add to cart</button>
        <button className="buy-now">Buy now</button>
      </div>
    </div>
  );
}
