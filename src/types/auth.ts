// import type User
import type { User } from "./user";

// --- Type permissions (key-value boolean map)
export type Permissions = {
  [key: string]: boolean;
};

// --- Interface Credentials (payload login)
export interface Credentials {
  username: string;
  password: string;
}

// --- Interface AuthState (state autentikasi di client)
export interface AuthState {
  user: User | null;
  token: string;
  permissions: Permissions;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}