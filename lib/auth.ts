import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-this';
const COOKIE_NAME = 'auth_token';

export interface TokenPayload {
    id: number;
    email: string;
    name: string;
    role: string;
}

// Hash a password
export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
}

// Compare a plain password with a hash
export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}

// Generate a JWT token
export function signToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// Verify a JWT token and return the payload or null
export function verifyToken(token: string): TokenPayload | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Ensure the decoded object matches our expected shape
        if (
            typeof decoded === 'object' &&
            decoded !== null &&
            'id' in decoded &&
            'email' in decoded
        ) {
            return decoded as TokenPayload;
        }
        return null;
    } catch {
        return null;
    }
}

// Get the token from the request cookies
export function getTokenFromRequest(req: NextRequest): string | null {
    return req.cookies.get(COOKIE_NAME)?.value || null;
}

// Get the token from the server-side cookies (for server components)
export function getTokenFromServerCookies(): string | null {
    const cookieStore = cookies();
    return cookieStore.get(COOKIE_NAME)?.value || null;
}

// Clear the auth cookie (logout)
export function clearAuthCookie(): void {
    const cookieStore = cookies();
    cookieStore.delete(COOKIE_NAME);
}
