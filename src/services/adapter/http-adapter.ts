import axios, { AxiosRequestConfig } from 'axios';

import { ISuccessResponse, IErrorResponse } from '../../types/api-response';

const BASE_URL = import.meta.env.VITE_API_BASE_BACKEND_PATH;

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

interface RequestOptions {
    method: HttpMethod;
    endpoint: string;
    data?: any;
    headers?: Record<string, string>;
    params?: Record<string, string | number>;
}

export const httpRequest = async <T = any>({
                                               method,
                                               endpoint,
                                               data,
                                               headers = {},
                                               params,
                                           }: RequestOptions): Promise<T> => {
    const config: AxiosRequestConfig = {
        method,
        url: `${BASE_URL}${endpoint}`,
        headers,
        data,
        params,
    };

    try {
        const response = await axios<ISuccessResponse<T>>(config);
        return response.data.data as T;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.data?.error) {
            const errRes = error.response.data as IErrorResponse;
            throw new Error(errRes.error);
        }

        throw new Error('Unexpected error occurred');
    }
};
