// --- Interface Page
export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// --- Struktur respons API untuk list Page (pagination)
export interface PagesResponse {
  current_page: number;
  data: Page[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

// --- Interface untuk request membuat Page
export interface PageCreateRequest {
  title: string;
  content: string;
}

// --- Interface untuk request update Page
export interface PageUpdateRequest {
  id: number;
  title: string;
  content: string;
}