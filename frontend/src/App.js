import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootElements from "./pages/Root/Root";
import HomePage from "./pages/Home/Home";
import { useEffect } from "react";
import { useProductsStore } from "./store/products";
import { useAccountStore } from "./store/account";
import useFetch from "./hooks/useFetch";
import LoginPage from "./pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootElements />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "account",
        children: [{ path: "login", element: <LoginPage /> }],
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

  const [productsError, productsMessage, productsData, fetchProducts] =
    useFetch("GET", "https://fakestoreapi.com/products");

  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
    }
  }, [productsData, setProducts]);

  // END -------------------------------- FETCH PRODUCTS -------------------------------- END
  // -------------------------------- CHECK SESSION ----------------------------------
  const [accountError, accountMessage, accountData, fetchAccount] = useFetch(
    "POST",
    `${process.env.REACT_APP_BACKEND_DOMAIN}/account/check-session/`
  );

  useEffect(() => {
    if (accountError) {
      resetAccountData();
    } else {
      if (accountData) {
        updateIsLoggedIn(true);
        console.log(accountData);
        if (accountData.isAdmin) {
          updateIsAdmin(true);
        }
      }
    }
  }, [
    accountError,
    accountMessage,
    accountData,
    resetAccountData,
    updateIsLoggedIn,
    updateIsAdmin,
  ]);

  // END -------------------------------- CHECK SESSION -------------------------------- END

  useEffect(() => {
    fetchProducts();
    fetchAccount();
  }, []);

  return (
    <RouterProvider router={router}>
      <h1>Home</h1>
    </RouterProvider>
  );
}

export default App;
