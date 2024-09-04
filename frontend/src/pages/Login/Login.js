import { useEffect, useState } from "react";
import { useAccountStore } from "../../store/account";
import { getCsrfToken } from "../../utils/auth";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginPage() {
  const { isLoggedIn } = useAccountStore();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const updateIsLoggedIn = useAccountStore((state) => state.updateIsLoggedIn);
  const updateIsAdmin = useAccountStore((state) => state.updateIsAdmin);

  const [searchParams, setSearchParams] = useSearchParams();
  const nextPageAddress = searchParams.get("next");
  const cartItemToAddID = searchParams.get("cart_item_to_add");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      handleRedirect();
    }
  }, [isLoggedIn]);

  function handleRedirect() {
    if (cartItemToAddID) {
      // ADD ITEM TO CART
    }
    navigate(searchParams.get("next") || "/");
  }

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_DOMAIN}/account/login/`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
      }
    );
    const responseData = await response.json();
    // returns {message, isAdmin} and a status code
    if (!response.ok) {
      setError(responseData.message);
    } else {
      updateIsLoggedIn(true);
      if (responseData.isAdmin) {
        updateIsAdmin(true);
      } else {
        updateIsAdmin(false);
      }
      navigate(searchParams.get("next") || "/");
    }
  }
  return (
    <>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          name="email"
          type="email"
          value={formData.email}
          required
          onChange={handleInputChange}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={formData.password}
          required
          onChange={handleInputChange}
        />
        <button>Login</button>
      </form>
    </>
  );
}
