import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

function ProductList({ search, selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    fetch(`${BASEURL}/api/products/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes((search || "").toLowerCase());
    const matchCategory = selectedCategory ? p.category.id === selectedCategory : true;
    return matchSearch && matchCategory;
  });

  if (loading) return <div className="pt-36 text-center">Loading...</div>;
  if (error) return <div className="pt-36 text-center">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            {search ? `No results for "${search}"` : "No Products Available"}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
