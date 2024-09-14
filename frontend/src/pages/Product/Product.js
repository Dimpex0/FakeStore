import { useParams } from "react-router-dom";
import { useProductsStore } from "../../store/products";

import "./Product.css";
import RatingStars from "../../elements/RatingStars/RatingStars";
import AddToCartButton from "../../elements/AddToCartButton/AddToCartButton";
import { useState } from "react";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { products } = useProductsStore();

  const currentProduct = products.find((product) => product.id === Number(id));

  return (
    <>
      {currentProduct ? (
        <div className="product-container">
          <img src={currentProduct.image} alt={currentProduct.title} />
          <div className="product-info">
            <h3>{currentProduct.title}</h3>
            <h5>{currentProduct.category}</h5>
            <div className="rating-container">
              <RatingStars rating={currentProduct.rating.rate} />
              <p>{currentProduct.rating.rate}</p>
            </div>
            <p className="product-description">{currentProduct.description}</p>
            <div className="product-actions">
              <AddToCartButton
                quantity={quantity}
                productId={currentProduct.id}
              >
                Add to cart
              </AddToCartButton>
              <div className="product-quantity">
                <i
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity((prev) => prev - 1);
                    }
                  }}
                  className="fa-solid fa-minus"
                ></i>
                <p>{quantity}</p>
                <i
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="fa-solid fa-plus"
                ></i>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "404 Not found"
      )}
    </>
  );
}
