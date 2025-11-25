// import type User
import type { User } from "./user";

// --- Interface Product
export interface Product {
  id: number;
  image: string;
  title: string;
  slug: string;
  content: string;
  owner: string;
  price: number;
  phone: string;
  address: string;
  user_id: number;
  user: User;
  created_at: string;
  updated_at: string;
}

// --- Struktur respons API untuk list Product (pagination)
export interface ProductsResponse {
  current_page: number;
  data: Product[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

// --- Interface untuk request membuat Product
export interface ProductCreateRequest {
  image: File | null;
  title: string;
  content: string;
  owner: string;
  price: number;
  phone: string;
  address: string;
}

// --- Interface untuk request update Product
export interface ProductUpdateRequest {
  id: number;
  image?: File | null; // opsional jika tidak diganti
  title: string;
  content: string;
  owner: string;
  price: number;
  phone: string;
  address: string;
}