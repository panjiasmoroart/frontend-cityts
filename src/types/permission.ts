// --- Interface Permission
export interface Permission {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

// --- Struktur respons API untuk list Permission (pagination)
export interface PermissionsResponse {
  current_page: number;
  data: Permission[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

// --- Interface untuk request membuat Permission
export interface PermissionCreateRequest {
  name: string;
}

// --- Interface untuk request update Permission
export interface PermissionUpdateRequest {
  id: number;
  name: string;
}

