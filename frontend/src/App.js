import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootElements from "./pages/Root/Root";
import HomePage from "./pages/Home/Home";
import { useEffect } from "react";
import { useProductsStore } from "./store/products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootElements />,
    children: [{ path: "/", element: <HomePage /> }],
  },
]);

function App() {
  const { setProducts } = useProductsStore();
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
  return (
    <RouterProvider router={router}>
      <h1>Home</h1>
    </RouterProvider>
  );
}

export default App;
