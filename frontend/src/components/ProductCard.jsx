import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { getAccessToken } from "../utils/auth.js";

function ProductCard({ product }) {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!getAccessToken()) {
      navigate("/login");
      return;
    }
    addToCart(product.id);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform p-3 cursor-pointer">
        <img
          src={`${BASEURL}${product.image}`}
          alt={product.name}
          className="w-full h-56 object-cover rounded-lg mb-2"
        />

        <h2 className="text-gray-800 font-bold text-xl mb-1">
          {product.name}
        </h2>

        <div className="flex items-center justify-between mt-1">
          <p className="text-green-600 font-semibold text-lg">₹ {product.price}</p>
          <button
            onClick={handleAddToCart}
            className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </Link>
  );
}

export default ProductCard;