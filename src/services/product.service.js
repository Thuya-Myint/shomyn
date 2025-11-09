import { API_ROUTES } from "../config/config"
import axiosInstance from "../config/axiosInstance"

export const getAllProduct = async (page = 1, limit = 12, category = "", discount = false) => {
    try {
        const query = new URLSearchParams({
            page,
            limit,
            ...(category && { category }),
            ...(discount && { discount })
        });

        // console.log("query", query.toString())
        const response = await axiosInstance.get(
            `${API_ROUTES.GET_ALL_PRODUCT}?${query.toString()}`
        );
        console.log("product response pagination ", response.data)
        return response.data;
    } catch (error) {
        console.log("getAllProduct() error", error);
        return error.response.data;
    }
};
