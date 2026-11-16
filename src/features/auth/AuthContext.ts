import { createContext } from "react";
import type { User } from "./schema";

export interface AuthContextValue {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
