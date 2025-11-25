import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { IoIosCloseCircle } from "react-icons/io";
import { socket } from "../socket";
import { STORAGE_KEYS } from "../config/config";
import { getItemFromLocalStorage } from "../helpers/helper";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, updateQty, removeFromCart, clearCart } = useCart();
    const [loading, setLoading] = useState(false);

    // Payment modal
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [savedCards, setSavedCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const userData = getItemFromLocalStorage(STORAGE_KEYS.USER_DATA);
    // Total
    const totalAmount = cart.reduce(
        (acc, item) => acc + (item.subtotal ?? item.price * item.qty),
        0
    );

    // Format card to XXXX XXXX XXXX 1234
    const formatCardNumber = (num) => {
        if (!num) return "";
        return num.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
    };

    // Load saved cards on mount
    useEffect(() => {
        if (userData?.paymentMethods?.length) {
            setSavedCards(userData.paymentMethods);
        }
    }, []);

    // Socket events
    useEffect(() => {
        socket.on("order_success", (res) => {
            alert(res.message);
            clearCart();
            setLoading(false);
        });

        socket.on("order_error", (err) => {
            alert(err.message);
            setLoading(false);
        });

        return () => {
            socket.off("order_success");
            socket.off("order_error");
        };
    }, []);

    const handleIncrease = (item) => {
        updateQty(item.cartItemId, item.qty + 1);
    };

    const handleDecrease = (item) => {
        if (item.qty === 1) return;
        updateQty(item.cartItemId, item.qty - 1);
    };

    const handleCheckout = () => {
        if (cart.length === 0) return alert("Cart is empty!");
        setShowPaymentModal(true);
    };

    const handleConfirmPayment = () => {
        if (!selectedCard) return alert("Please select a payment method.");

        setLoading(true);

        const userData = getItemFromLocalStorage(STORAGE_KEYS.USER_DATA);

        console.log("cart ", cart)
        const order = {
            items: cart.map((item) => ({
                productId: item.id,
                name: item.name,
                price: item.price,
                size: item.size || null,
                variant: item.variant || null,
                qty: item.qty,
                subtotal: item.subtotal ?? item.price * item.qty,
                shopId: item.shopId,
            })),


            total: totalAmount,
            userId: userData._id,
            name: userData.name,
            email: userData.email,
            note: "",

            // Store FULL payment object
            paymentMethods: {
                name: selectedCard.method,
                number: selectedCard.accountNumber,
            },
        };

        console.log("new-order", order)
        socket.emit("new_order", order);
        setShowPaymentModal(false);
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

                        {/* CART ITEMS */}
                        {cart.map((item) => (
                            <div
                                key={item.cartItemId}
                                className="bg-white p-4 rounded-xl shadow flex items-center gap-4"
                            >
                                {/* IMAGE */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-lg border"
                                />

                                {/* DETAILS */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">{item.name}</h3>

                                    {item.size && (
                                        <p className="text-sm text-gray-500">Size: {item.size}</p>
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

                                {/* QTY */}
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

                                {/* SUBTOTAL */}
                                <div className="w-24 text-right font-semibold">
                                    ¥{(item.subtotal ?? item.price * item.qty).toLocaleString()}
                                </div>

                                {/* REMOVE */}
                                <button
                                    onClick={() => removeFromCart(item.cartItemId)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <IoIosCloseCircle size={28} />
                                </button>
                            </div>
                        ))}

                        {/* TOTAL + CHECKOUT */}
                        <div className="bg-white p-4 rounded-xl shadow mt-6 flex items-center justify-between">
                            <div className="text-xl font-bold">
                                Total: ¥{totalAmount.toLocaleString()}
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                            >
                                Checkout → ¥{totalAmount.toLocaleString()}
                            </button>
                        </div>

                        {/* CLEAR CART */}
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

            {/* PAYMENT MODAL */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4 z-50">
                    <div className="bg-white w-full sm:w-[450px] rounded-xl shadow-xl p-6">

                        <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>

                        {savedCards.length === 0 ? (
                            <div className="text-gray-500 py-6 text-center">
                                No saved payment method. Please Add in
                                <Link to="/setting" className="underline">
                                    - Setting.
                                </Link>.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {savedCards.map((card, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedCard(card)}
                                        className={`p-4 border rounded-xl cursor-pointer transition
                                            ${selectedCard === card ? "border-black bg-gray-100" : "border-gray-300"}
                                        `}
                                    >
                                        <div className="font-semibold">{card.method}</div>
                                        <div className="text-gray-600 text-sm">
                                            {formatCardNumber(card.accountNumber)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* BUTTONS */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="px-4 py-2 rounded bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmPayment}
                                className="px-4 py-2 rounded bg-black text-white"
                            >
                                Confirm Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart; 