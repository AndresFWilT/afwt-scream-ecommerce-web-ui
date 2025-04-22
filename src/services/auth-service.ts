import { httpRequest } from './adapter/http-adapter';

interface SignUpPayload {
    name: string;
    email: string;
    password: string;
}

export const loginUser = async (email: string, password: string): Promise<string> => {
    const response = await httpRequest({
        method: 'post',
        endpoint: '/authentication/login',
        data: { email, password },
        headers: {
            'X-RqUID': crypto.randomUUID(),
        },
    })
    return response.token
}

export const signUp = async (body: SignUpPayload) => {
    return httpRequest({
        method: 'post',
        endpoint: '/users/sign-up',
        data: body,
        headers: {
            'Content-Type': 'application/json',
            'X-RqUID': crypto.randomUUID(),
        },
    });
};

