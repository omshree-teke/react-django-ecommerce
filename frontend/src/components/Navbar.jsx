import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { clearTokens, getAccessToken } from "../utils/auth.js";
import { useState, useEffect } from "react";

function Navbar({ onSearch, onCategorySelect }) {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const isLoggedIn = !!getAccessToken();

  useEffect(() => {
    fetch(`${BASEURL}/api/categories/`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    clearTokens();
    navigate("/login");
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleCategory = (catId) => {
    setActiveCategory(catId);
    if (onCategorySelect) onCategorySelect(catId);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          🛍️ NovaMart
        </Link>

        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search products..."
          className="border border-gray-500 rounded-full px-4 py-1.5 w-1/3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Sign Up
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
              Logout
            </button>
          )}

          <Link
            to="/cart"
            onClick={() => setActiveCategory(null)}
            className="relative px-4 py-2 text-sm font-medium text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Category Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm fixed w-full top-[71px] z-40">
        <div className="flex gap-6 px-6 py-2 overflow-x-auto">
          <button
            onClick={() => handleCategory(null)}
            className={`pb-1 text-sm font-medium whitespace-nowrap transition-colors
              ${activeCategory === null
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'text-gray-600 hover:text-blue-600'}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className={`pb-1 text-sm font-medium whitespace-nowrap transition-colors
                ${activeCategory === cat.id
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-blue-600'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;