import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-this';
const COOKIE_NAME = 'auth_token';

// Hash a password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

// Compare a plain password with a hash
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

// Generate a JWT token
export function signToken(payload: { id: number; email: string; name: string; role: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// Verify a JWT token
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
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

// Set the auth cookie in a response
export function setAuthCookie(response: Response, token: string): void {
  // Note: For API routes, we use the `cookies().set()` method
  // This function is for convenience; we'll handle cookie setting directly in the API route.
}

// Clear the auth cookie (logout)
export function clearAuthCookie(): void {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}