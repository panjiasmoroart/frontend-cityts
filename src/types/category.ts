// --- Interface Category
export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

// --- Struktur respons API untuk list Category (pagination)
export interface CategoriesResponse {
  current_page: number;
  data: Category[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

// --- Interface untuk request membuat Category
export interface CategoryCreateRequest {
  name: string;
}

// --- Interface untuk request update Category
export interface CategoryUpdateRequest {
  id: number;
  name: string;
}