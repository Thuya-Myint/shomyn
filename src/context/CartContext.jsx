import { createContext, useContext, useState, useEffect } from "react";
import {
    getItemFromLocalStorage,
    setItemToLocalStorage,
    removeItemFromLocalStorage
} from "../helpers/helper";
import { STORAGE_KEYS } from "../config/config";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load initial cart from localStorage
    useEffect(() => {
        const storedCart = getItemFromLocalStorage(STORAGE_KEYS.CART);
        if (storedCart) setCart(storedCart);
    }, []);

    // Persist cart changes to localStorage
    useEffect(() => {
        setItemToLocalStorage(STORAGE_KEYS.CART, cart);
    }, [cart]);

    // Add item to cart
    const addToCart = (item) => {
        setCart((prev) => {
            const exists = prev.find((i) => i.id === item.id);

            if (exists) {
                return prev.map((i) =>
                    i.id === item.id
                        ? { ...i, qty: i.qty + (item.qty || 1) }
                        : i
                );
            }

            return [...prev, { ...item, qty: item.qty || 1 }];
        });
    };

    // Update item quantity
    const updateQty = (id, qty) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, qty } : item
            )
        );
    };

    // Remove item
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    // Clear cart completely
    const clearCart = () => {
        removeItemFromLocalStorage(STORAGE_KEYS.CART);
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                updateQty,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);