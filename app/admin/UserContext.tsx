'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface UserContextType {
    user: User | null;
    loading: boolean;
    refetch: () => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    refetch: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Skip fetching on login page (no token needed)
        if (pathname === '/admin/login') {
            // These synchronous state updates are safe and intentional.
            // They only run when pathname is '/admin/login' and won't cause
            // cascading renders because the effect dependencies don't include the state.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(false);
            setUser(null);
            return;
        }

        fetchUser();
    }, [pathname]);

    return (
        <UserContext.Provider value={{ user, loading, refetch: fetchUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
