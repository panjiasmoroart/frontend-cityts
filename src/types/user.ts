// import type Role
import type { Role } from "./role";

// --- Interface User
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  roles?: Role[];
}

// --- Struktur respons API untuk list User (pagination)
export interface UsersResponse {
  current_page: number;
  data: User[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

// --- Interface untuk request membuat User
export interface UserCreateRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  role_ids: number[];
}

// --- Interface untuk request update User
export interface UserUpdateRequest {
  id: number;
  name: string;
  username: string;
  email: string;
  password?: string; // optional jika tidak mengubah password
  role_ids: number[];
}