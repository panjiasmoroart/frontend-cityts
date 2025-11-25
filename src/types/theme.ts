// --- Interface ThemeState (state tema di client)
export interface ThemeState {
  //======== DASHBOARD SIDEBAR ========//
  sidebarOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  setMobile: (isMobile: boolean) => void;

  //======== WEB DRAWER ========//
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
}