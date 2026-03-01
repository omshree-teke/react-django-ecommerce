// import { createContext, useContext, useState, useEffect } from "react";
// import {authFetch,getAccessToken} from "../utils/auth";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
//   const [cartItems, setCartItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   // fetch cart from backend
//   // const fetchCart = async () => {
//   //   try {
//   //     const res = await authFetch(`${BASEURL}/api/cart/`);
//   //     const data = await res.json();
//   //     setCartItems(data.items || []);
//   //     setTotal(data.total || 0);
//   //   } catch (error) {
//   //     console.error("Error fetching cart:", error);
//   //   }
//   // };
//   // useEffect(()=>{
//   //   fetchCart()
//   // },[]);
//   const fetchCart = async () => {
//     const token = getAccessToken();
//     if (!token) return; // ← Add this line!
//     try {
//       const res = await authFetch(`${BASEURL}/api/cart/`);
//       const data = await res.json();
//       setCartItems(data.items || []);
//       setTotal(data.total || 0);
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
// };


//   //Add Product to Cart
//  const addToCart = async (productid) => {
//   try {
//     await authFetch(`${BASEURL}/api/cart/add/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ product_id: productid }),
//     });
//     fetchCart();
//   } catch (error) {
//     console.error("Error adding to cart", error);
//   }
// };





//   // Remove Product from Cart
// const removeFromCart = async (itemId) => {
//   try {
//     await authFetch(`${BASEURL}/api/cart/remove/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ item_id: itemId }),
//     });
//     fetchCart();
//   } catch (error) {
//     console.error("Error removing from cart:", error);
//   }
// };


//   //update quantity
//   const updateQuantity=async (itemId,quantity)=>{
//     if (quantity<1){
//       await removeFromCart(itemId);
//       return
//     }
//     try{
//       await authFetch(`${BASEURL}/api/cart/update/`,{
//         method:"POST",
//         headers:{
//           "Content-Type":"application/json",
//         },
//         body:JSON.stringify({item_id:itemId,quantity}),
//       });
//       fetchCart();
//     }catch(error){
//       console.error("Error updating quantity:",error);
//     }
//   }


//   const clearCart=()=>{
//     setCartItems([]);
//     setTotal(0);
//   }



//   return (
//     <CartContext.Provider
//       value={{ cartItems, total, addToCart, removeFromCart, updateQuantity, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);







import { createContext, useContext, useState, useEffect } from "react";
import { authFetch, getAccessToken } from "../utils/auth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCart = async () => {
    const token = getAccessToken();
    if (!token) return;
    try {
      const res = await authFetch(`${BASEURL}/api/cart/`);
      const data = await res.json();
      setCartItems(data.items || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // ✅ THIS WAS MISSING - loads cart on app start
  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productid) => {
    try {
      await authFetch(`${BASEURL}/api/cart/add/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productid }),
      });
      await fetchCart(); // ✅ await so cart updates after adding
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await authFetch(`${BASEURL}/api/cart/remove/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_id: itemId }),
      });
      await fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }
    try {
      await authFetch(`${BASEURL}/api/cart/update/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_id: itemId, quantity }),
      });
      await fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setTotal(0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, total, addToCart, removeFromCart, updateQuantity, clearCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);