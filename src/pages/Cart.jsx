import React from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { IoIosCloseCircle } from "react-icons/io";

const Cart = () => {
    const { cart, updateQty, removeFromCart, clearCart } = useCart();

    // ✅ SAFE total calculation
    const totalAmount = cart.reduce(
        (acc, item) => acc + (item.subtotal ?? item.price * item.qty),
        0
    );

    const handleIncrease = (item) => {
        updateQty(item.cartItemId, item.qty + 1);
    };

    const handleDecrease = (item) => {
        if (item.qty === 1) return;
        updateQty(item.cartItemId, item.qty - 1);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto py-10 px-3">
                <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 text-lg">
                        Your cart is empty.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.cartItemId}
                                className="bg-white p-4 rounded-xl shadow flex items-center gap-4"
                            >
                                {/* Image */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-lg border"
                                />

                                {/* Details */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">{item.name}</h3>

                                    {item.size && (
                                        <p className="text-sm text-gray-500">
                                            Size: {item.size}
                                        </p>
                                    )}

                                    {item.variant && (
                                        <p className="text-sm text-gray-500">
                                            Variant: {item.variant}
                                        </p>
                                    )}

                                    <p className="mt-1 text-sm text-gray-800">
                                        Price: ¥{item.price.toLocaleString()}
                                    </p>
                                </div>

                                {/* Qty */}
                                <div className="flex items-center gap-3">
                                    <button
                                        className="px-3 py-1 rounded bg-gray-200"
                                        onClick={() => handleDecrease(item)}
                                    >
                                        -
                                    </button>
                                    <span className="font-semibold">{item.qty}</span>
                                    <button
                                        className="px-3 py-1 rounded bg-gray-200"
                                        onClick={() => handleIncrease(item)}
                                    >
                                        +
                                    </button>
                                </div>

                                {/* ✅ SAFE Subtotal */}
                                <div className="w-24 text-right font-semibold">
                                    ¥{((item.subtotal ?? item.price * item.qty)).toLocaleString()}
                                </div>

                                {/* Remove */}
                                <button
                                    onClick={() => removeFromCart(item.cartItemId)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <IoIosCloseCircle size={28} />
                                </button>
                            </div>
                        ))}

                        {/* Checkout Section */}
                        <div className="bg-white p-4 rounded-xl shadow mt-6 flex items-center justify-between">
                            <div className="text-xl font-bold">
                                Total: ¥{totalAmount.toLocaleString()}
                            </div>

                            <button
                                onClick={() => alert("Proceed to checkout")}
                                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                            >
                                Checkout → ¥{totalAmount.toLocaleString()}
                            </button>
                        </div>

                        {/* Clear Cart */}
                        <div className="text-right mt-3">
                            <button
                                onClick={clearCart}
                                className="text-red-600 underline hover:text-red-800"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;