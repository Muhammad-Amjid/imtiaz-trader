
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "imtiazTraderCart";
const MAX_QUANTITY = 99;

function getProductId(product) {
  return String(product?._id || product?.id || "");
}

function loadCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (!savedCart) return [];

    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) return [];

    return parsedCart
      .filter(
        (item) =>
          item &&
          getProductId(item) &&
          item.available !== false
      )
      .map((item) => ({
        ...item,
        _id: getProductId(item),
        quantity: Math.min(
          MAX_QUANTITY,
          Math.max(1, Number(item.quantity) || 1)
        ),
      }));
  } catch (error) {
    console.error("Cart loading error:", error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCart);

  // Save cart whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Cart saving error:", error);
    }
  }, [cartItems]);

  // Add product
  const addToCart = useCallback((product) => {
    const productId = getProductId(product);

    if (!productId) {
      return { success: false, message: "Invalid product." };
    }

    if (product.available === false) {
      return { success: false, message: "This product is unavailable." };
    }

    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item._id === productId
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item._id === productId
            ? {
                ...item,
                quantity: Math.min(
                  MAX_QUANTITY,
                  item.quantity + 1
                ),
              }
            : item
        );
      }

      return [
        ...previousItems,
        {
          ...product,
          _id: productId,
          quantity: 1,
        },
      ];
    });

    return { success: true, message: "Product added to cart." };
  }, []);

  // Remove product
  const removeFromCart = useCallback((productId) => {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) => item._id !== String(productId)
      )
    );
  }, []);

  // Update product quantity
  const updateQuantity = useCallback((productId, quantity) => {
    const safeQuantity = Math.min(
      MAX_QUANTITY,
      Math.max(1, Math.floor(Number(quantity) || 1))
    );

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item._id === String(productId)
          ? { ...item, quantity: safeQuantity }
          : item
      )
    );
  }, []);

  // Increase quantity
  const increaseQuantity = useCallback((productId) => {
    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item._id === String(productId)
          ? {
              ...item,
              quantity: Math.min(
                MAX_QUANTITY,
                item.quantity + 1
              ),
            }
          : item
      )
    );
  }, []);

  // Decrease quantity
  const decreaseQuantity = useCallback((productId) => {
    setCartItems((previousItems) =>
      previousItems
        .map((item) =>
          item._id === String(productId)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Cart calculations
  const cartCount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + (Number(item.price) || 0) * item.quantity,
        0
      ),
    [cartItems]
  );

  const cartTotal = cartSubtotal;

  const isCartEmpty = cartItems.length === 0;

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      cartSubtotal,
      cartTotal,
      isCartEmpty,
      addToCart,
      removeFromCart,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    }),
    [
      cartItems,
      cartCount,
      cartSubtotal,
      cartTotal,
      isCartEmpty,
      addToCart,
      removeFromCart,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom cart hook
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider. Wrap your application with CartProvider."
    );
  }

  return context;
}

export default CartContext;
