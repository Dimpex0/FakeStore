import { getCsrfToken } from "./auth";

export async function addToCart(productId, quantity = 1) {
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
  return response;
}
