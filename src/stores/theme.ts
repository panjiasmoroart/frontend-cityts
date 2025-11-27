// Import fungsi create dari Zustand untuk membuat state global
import { create } from 'zustand';

// import type ThemeState
import type { ThemeState } from '../types/theme';

// Buat store global dengan Zustand
export const useThemeStore = create<ThemeState>((set) => ({
  // Default sidebar tertutup
  sidebarOpen: false,

  // Deteksi apakah mode mobile berdasarkan lebar window
  isMobile: window.innerWidth < 768,

  // Toggle status sidebar (true <-> false)
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  // Atur status mobile secara manual
  setMobile: (isMobile) => set({ isMobile }),

  //======== WEB DRAWER ========//

  // Default drawer tertutup
  isDrawerOpen: false,

  // Toggle status drawer
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

  // Tutup drawer
  closeDrawer: () => set({ isDrawerOpen: false }),
}));

