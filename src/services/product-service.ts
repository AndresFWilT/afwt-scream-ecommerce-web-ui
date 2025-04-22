import { v4 as uuidv4 } from 'uuid';
import { httpRequest } from './adapter/http-adapter';
import { IProduct } from '../types/product';

const baseHeaders = () => ({
    'X-RqUID': uuidv4(),
});

export const ProductService = {
    async getAll(): Promise<IProduct[]> {
        return await httpRequest<IProduct[]>({
            method: 'get',
            endpoint: '/products',
            headers: baseHeaders(),
        });
    },

    async getById(id: number): Promise<IProduct> {
        return await httpRequest<IProduct>({
            method: 'get',
            endpoint: `/products/${id}`,
            headers: baseHeaders(),
        });
    },

    async getPaginated(page = 1, limit = 10): Promise<IProduct[]> {
        return await httpRequest<IProduct[]>({
            method: 'get',
            endpoint: `/products?page=${page}&limit=${limit}`,
            headers: baseHeaders(),
        });
    },

    async create(product: IProduct, token: string): Promise<void> {
        await httpRequest<void>({
            method: 'post',
            endpoint: '/products',
            headers: {
                ...baseHeaders(),
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: product,
        });
    },

    async update(id: number, product: IProduct, token: string): Promise<void> {
        await httpRequest<void>({
            method: 'put',
            endpoint: `/products/${id}`,
            headers: {
                ...baseHeaders(),
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: product,
        });
    },

    async remove(id: number, token: string): Promise<void> {
        await httpRequest<void>({
            method: 'delete',
            endpoint: `/products/${id}`,
            headers: {
                ...baseHeaders(),
                'Authorization': `Bearer ${token}`,
            },
        });
    },
};
