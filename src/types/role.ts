// import type Permission
import type { Permission } from "./permission";

// --- Interface Role
export interface Role {
  id: number;
  name: string;
  permissions?: Permission[];
  created_at: string;
  updated_at: string;
}

// --- Struktur respons API untuk list Role (pagination)
export interface RolesResponse {
  current_page: number;
  data: Role[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

// --- Interface untuk request membuat Role
export interface RoleCreateRequest {
  name: string;
  permission_ids: number[];
}

// --- Interface untuk request update Role
export interface RoleUpdateRequest {
  id: number;
  name: string;
  permission_ids: number[];
}