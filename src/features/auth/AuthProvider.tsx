import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { login } from "./authApi";
import { userSchema } from "./schema";
import type { User } from "./schema";

const STORAGE_KEY = "stockdesk.user";

function readStoredUser(): User | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const result = userSchema.safeParse(JSON.parse(raw));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readStoredUser);

  const signIn = useCallback(async (email: string, password: string) => {
    const signedInUser = await login(email, password);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(signedInUser));
    setUser(signedInUser);
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, signIn, signOut }),
    [user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
