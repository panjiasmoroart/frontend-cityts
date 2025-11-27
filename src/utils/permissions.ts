// import Js Cookie untuk mengelola cookies
import Cookies from "js-cookie";

// Fungsi untuk mengecek apakah user memiliki salah satu dari permission yang diminta
export default function hasAnyPermission(permissions: string[]): boolean {
  // Ambil seluruh permissions dari cookies
  const allPermissions = JSON.parse(Cookies.get("permissions") || '{}') as Record<string, boolean>;

  // Cek apakah salah satu permission tersedia
  return permissions.some((permission) => allPermissions[permission]);
}
