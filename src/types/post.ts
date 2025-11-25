// import type Category
import type { Category } from "./category";

// import type User
import type { User } from "./user";

// --- Interface Post
export interface Post {
  id: number;
  image: string;
  title: string;
  slug: string;
  content: string;
  category_id: number;
  category: Category;
  user_id: number;
  user: User;
  created_at: string;
  updated_at: string;
}

// --- Struktur respons API untuk list Post (pagination)
export interface PostsResponse {
  current_page: number;
  data: Post[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

// --- Interface untuk request membuat Post
export interface PostCreateRequest {
  image: File | null; // file upload (form-data)
  title: string;
  content: string;
  category_id: number;
}

// --- Interface untuk request update Post
export interface PostUpdateRequest {
  id: number;
  image?: File | null; // opsional jika tidak diganti
  title: string;
  content: string;
  category_id: number;
}