import { useEffect, useState } from "react";
import { getCsrfToken } from "../../utils/auth";

export default function CartPage() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function fetchCart() {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/cart/`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCsrfToken(),
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        setItems(responseData.cart);
      } else {
        // handle error
      }
    }
    fetchCart();
  }, []);
  return <h1>Cart</h1>;
}
