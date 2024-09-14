import { useNavigate } from "react-router-dom";
import { useAccountStore } from "../../store/account";

import "./AddToCartButton.css";
import { addToCart } from "../../utils/cart";

export default function AddToCartButton({
  className = undefined,
  productId,
  quantity = 1,
  children,
}) {
  const { isLoggedIn } = useAccountStore();
  const navigate = useNavigate();
  const currentUrl = window.location.pathname;

  async function handleAddToCart() {
    if (!isLoggedIn) {
      navigate(
        `/account/login?next=${currentUrl}&cart_item_to_add=${productId}&quantity=${quantity}`
      );
    } else {
      const response = await addToCart(productId, quantity);
      // handle response
    }
  }
  return (
    <button onClick={handleAddToCart} className={className || "add-to-cart"}>
      {children}
    </button>
  );
}
