// --- Interface Photo
export interface Photo {
  id: number;
  image: string;
  caption: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// --- Struktur respons API untuk list Photo (pagination)
export interface PhotosResponse {
  current_page: number;
  data: Photo[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

// --- Interface untuk request membuat Photo
export interface PhotoCreateRequest {
  image: File | null; // file upload (form-data)
  caption: string;
  description: string;
}