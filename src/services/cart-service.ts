import { v4 as uuidv4 } from 'uuid';
import { httpRequest } from './adapter/http-adapter';
import type { ICart } from '../types/cart';

const baseHeaders = (token: string) => ({
    'X-RqUID': uuidv4(),
    'Authorization': `Bearer ${token}`,
});

export const CartService = {
    async getCart(token: string): Promise<ICart> {
        return await httpRequest<ICart>({
            method: 'get',
            endpoint: '/cart',
            headers: baseHeaders(token),
        });
    },

    async addItem(productId: number, quantity: number, token: string): Promise<void> {
        await httpRequest<void>({
            method: 'post',
            endpoint: '/cart/items',
            headers: {
                ...baseHeaders(token),
                'Content-Type': 'application/json',
            },
            data: { productId, quantity },
        });
    },

    async updateItem(productId: number, quantity: number, token: string): Promise<void> {
        await httpRequest<void>({
            method: 'put',
            endpoint: `/cart/items/${productId}`,
            headers: {
                ...baseHeaders(token),
                'Content-Type': 'application/json',
            },
            data: { quantity },
        });
    },

    async removeItem(productId: number, token: string): Promise<void> {
        await httpRequest<void>({
            method: 'delete',
            endpoint: `/cart/items/${productId}`,
            headers: baseHeaders(token),
        });
    },

    async clearCart(token: string): Promise<void> {
        await httpRequest<void>({
            method: 'delete',
            endpoint: '/cart',
            headers: baseHeaders(token),
        });
    },
};
