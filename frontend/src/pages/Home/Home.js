import ItemCard from "../../elements/ItemCard/ItemCard";
import { useProductsStore } from "../../store/products";
import { useEffect, useState } from "react";
import "./home.css";
import ProductsFiltration from "../../elements/ProductsFiltration/ProductsFiltration";

export default function HomePage() {
  const { products } = useProductsStore();
  const [shownProducts, setShownProducts] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    sort: "Newest",
    category: "All",
  });

  useEffect(() => {
    let filteredProducts = products;

    if (filterCriteria.category !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filterCriteria.category
      );
    }

    switch (filterCriteria.sort) {
      case "A-Z":
        filteredProducts = filteredProducts.toSorted((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "Z-A":
        filteredProducts = filteredProducts.toSorted((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;
      case "0-1":
        filteredProducts = filteredProducts.toSorted(
          (a, b) => a.price - b.price
        );
        break;
      case "1-0":
        filteredProducts = filteredProducts.toSorted(
          (a, b) => b.price - a.price
        );
        break;
      case "Newest":
      default:
        break;
    }

    setShownProducts(filteredProducts);
  }, [products, filterCriteria]);

  function handleSortChange(e) {
    setFilterCriteria((prev) => ({
      ...prev,
      sort: e.target.value,
    }));
  }

  function handleFilterChange(e) {
    setFilterCriteria((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  }

  return (
    <>
      <h1>Home</h1>
      <ProductsFiltration
        handleSortChange={handleSortChange}
        handleFilterChange={handleFilterChange}
        filterCriteria={filterCriteria}
      />
      <section className="products-section">
        {shownProducts.map((product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}
