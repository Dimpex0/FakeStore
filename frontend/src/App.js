import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootElements from "./pages/Root/Root";
import HomePage from "./pages/Home/Home";
import { useEffect } from "react";
import { useProductsStore } from "./store/products";
import { useAccountStore } from "./store/account";
import { getCsrfToken } from "./utils/auth";
import LoginPage from "./pages/Login/Login";
import LogoutPage from "./pages/Logout/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootElements />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "account",
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "logout", element: <LogoutPage /> },
        ],
      },
    ],
  },
]);

function App() {
  const { setProducts } = useProductsStore();

  const resetAccountData = useAccountStore((state) => state.reset);
  const updateIsLoggedIn = useAccountStore((state) => state.updateIsLoggedIn);
  const updateIsAdmin = useAccountStore((state) => state.updateIsAdmin);

  // -------------------------------- FETCH PRODUCTS --------------------------------

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://fakestoreapi.com/products");
      if (response.ok) {
        const responseProducts = await response.json();
        setProducts(responseProducts);
      }
    }

    fetchProducts();
  }, [setProducts]);

  // END -------------------------------- FETCH PRODUCTS -------------------------------- END
  // -------------------------------- CHECK SESSION ----------------------------------

  useEffect(() => {
    async function checkSession() {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/account/check-session/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCsrfToken(),
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        updateIsLoggedIn(true);
        if (responseData.isAdmin) {
          updateIsAdmin(true);
        }
      } else {
        resetAccountData();
      }
    }

    checkSession();
  }, [resetAccountData, updateIsAdmin, updateIsLoggedIn]);

  // END -------------------------------- CHECK SESSION -------------------------------- END

  return (
    <RouterProvider router={router}>
      <h1>Home</h1>
    </RouterProvider>
  );
}

export default App;
