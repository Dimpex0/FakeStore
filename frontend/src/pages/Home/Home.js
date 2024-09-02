import ItemCard from "../../elements/ItemCard/ItemCard";
import { useProductsStore } from "../../store/products";
import "./home.css";

export default function HomePage() {
  const { products } = useProductsStore();
  return (
    <>
      <h1>Home</h1>
      <section className="products-section">
        {products.map((product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}
