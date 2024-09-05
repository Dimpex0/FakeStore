import { useNavigate } from "react-router-dom";
import { useAccountStore } from "../../store/account";
import { getCsrfToken } from "../../utils/auth";

import "./AddToCartButton.css";

export default function AddToCartButton({
  className = undefined,
  productId,
  quantity = 1,
  children,
}) {
  const { isLoggedIn } = useAccountStore();

  const navigate = useNavigate();

  async function handleAddToCart() {
    if (!isLoggedIn) {
      navigate(`/account/login?next=/cart&cart_item_to_add=${productId}`);
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/cart/add/${productId}/${quantity}/`,
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
    <button onClick={handleAddToCart} className={className || "add-to-cart"}>
      {children}
    </button>
  );
}
