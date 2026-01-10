import axios, { AxiosError } from "axios";
import { BASE_API_URL } from "../../global";

const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
});

export interface ApiResponse<T> {
    status: boolean;
    data: T;
    message?: string;
}

export const get = async <T>(url: string, token?: string): Promise<ApiResponse<T>> => {
    try {
        const headers: Record<string, string> = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await axiosInstance.get(url, { headers });

        return {
            status: true,
            data: response.data?.data ?? [],
        };
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const errorMessage = err.response?.data?.message || "Unknown error";

        return {
            status: false,
            data: [] as T,
            message: errorMessage,
        };
    }
};





// POST
export const post = async <T = unknown>(
    url: string,
    data: unknown,
    token?: string
): Promise<ApiResponse<T>> => {
    try {
        const isJSON = !(data instanceof FormData);

        const headers: Record<string, string> = {
            Authorization: `Bearer ${token}`,
            ...(isJSON && { "Content-Type": "application/json" }),
        };


        const body = isJSON ? JSON.stringify(data) : data;

        const result = await axiosInstance.post<T>(url, body, { headers });

        return {
            status: true,
            data: result.data,
        };
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data.message ?? "Unknown error";
        return {
            status: false,
            data: [] as T,
            message: message,
        };
    }
};

// PUT
export const put = async <T = unknown>(
    url: string,
    data: unknown,
    token?: string
): Promise<ApiResponse<T>> => {
    try {
        const isJSON = !(data instanceof FormData);

        const headers: Record<string, string> = {
            Authorization: `Bearer ${token}`,
            ...(isJSON && { "Content-Type": "application/json" }),
        };


        const body = isJSON ? JSON.stringify(data) : data;

        const result = await axiosInstance.put<T>(url, body, { headers });

        return {
            status: true,
            data: result.data,
        };
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data.message ?? "Unknown error";
        return {
            status: false,
            data: [] as T,
            message: message,
        };
    }
};

// DELETE
export const drop = async <T = unknown>(
    url: string,
    token?: string
): Promise<ApiResponse<T>> => {
    try {
        const headers: Record<string, string> = {};
        if (token) headers.Authorization = `Bearer ${token}`;

        const result = await axiosInstance.delete<T>(url, { headers });

        return {
            status: true,
            data: result.data,
        };
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data.message ?? "Unknown error";
        return {
            status: false,
            data: [] as T,
            message: message,
        };
    }
};
