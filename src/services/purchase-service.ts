import { v4 as uuidv4 } from 'uuid';

import {IPurchase, IPurchaseSummary} from "../types/purchase.ts";
import {httpRequest} from "./adapter/http-adapter.ts";

const baseHeaders = (token: string) => ({
    'X-RqUID': uuidv4(),
    'Authorization': `Bearer ${token}`,
});

export const PurchaseService = {
    async placePurchase(token: string): Promise<IPurchase> {
        return await httpRequest<IPurchase>({
            method: 'post',
            endpoint: '/purchases',
            headers: {
                ...baseHeaders(token),
                'Content-Type': 'application/json',
            },
            data: { 'Description': 'Purchase Items' },
        });
    },

    async getPurchaseHistory(token: string): Promise<IPurchaseSummary[]> {
        return await httpRequest<IPurchaseSummary[]>({
            method: 'get',
            endpoint: '/purchases',
            headers: baseHeaders(token),
        });
    },

    async getPurchaseById(id: number, token: string): Promise<IPurchase> {
        return await httpRequest<IPurchase>({
            method: 'get',
            endpoint: `/purchases/${id}`,
            headers: baseHeaders(token),
        });
    },
};
