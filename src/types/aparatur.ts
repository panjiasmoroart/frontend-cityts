// --- Interface Aparatur
export interface Aparatur {
  id: number;
  image: string;
  name: string;
  position: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// --- Struktur respons API untuk list Aparatur (pagination)
export interface AparatursResponse {
  current_page: number;
  data: Aparatur[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

// --- Interface untuk request membuat Aparatur
export interface AparaturCreateRequest {
  image: File | null; // upload foto aparatur
  name: string;
  position: string;
  description: string;
}

// --- Interface untuk request update Aparatur
export interface AparaturUpdateRequest {
  id: number;
  image: File | null; // wajib sertakan jika ganti foto
  name: string;
  position: string;
  description: string;
}