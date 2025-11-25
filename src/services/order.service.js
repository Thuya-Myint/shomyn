
import axiosInstance from "../config/axiosInstance";
import { API_ROUTES } from "../config/config";

// ✅ Create a new order
export const createOrder = async (orderData) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.ORDER, orderData);
        return response.data;
    } catch (error) {
        console.error("Create order failed:", error.response?.data || error.message);
        throw error.response?.data || { message: "Failed to create order" };
    }
};

// ✅ Fetch all orders
export const getOrdersByUserId = async (userId) => {
    try {

        const response = await axiosInstance.get(`${API_ROUTES.ORDER}/user/${userId}`);
        console.log("res order ", response)
        return response.data;
    } catch (error) {
        console.error("Fetch orders failed:", error.response?.data || error.message);
        throw error.response?.data || { message: "Failed to fetch orders" };
    }
};

// ✅ Update order status
export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await axiosInstance.patch(`${API_ROUTES.ORDER}/status`, {
            orderId,
            status,
        });
        return response.data;
    } catch (error) {
        console.error("Update order status failed:", error.response?.data || error.message);
        throw error.response?.data || { message: "Failed to update order status" };
    }
};