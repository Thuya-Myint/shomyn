import axiosInstance from "../config/axiosInstance";
import { API_ROUTES } from "../config/config";

// GET ALL PAYMENTS
export const getAllPayments = async () => {
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_ALL_PAYMENT);
        console.log("response all payments ", response.data);
        return response.data;
    } catch (error) {
        console.log("getAllPayments() error", error);
        return error.response?.data;
    }
};