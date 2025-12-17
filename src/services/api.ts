// import axios
import axios, { AxiosError, type AxiosResponse } from 'axios';

// import Cookies untuk mengelola cookies
import Cookies from 'js-cookie';

// Buat instance Axios
const Api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Tambahkan interceptor untuk response
Api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {

    // Skip interceptor untuk login
    const excludedEndpoints = ['/login'];
    const shouldSkip = excludedEndpoints.some(endpoint =>
      error.config?.url?.includes(endpoint)
    );

    // Jika skip, kembalikan error
    if (shouldSkip) return Promise.reject(error);

    // Jika error 401, hapus token, user, dan permissions
    if (error.response?.status === 401) {

      // Hapus token, user, dan permissions
      Cookies.remove('token');
      Cookies.remove('user');
      Cookies.remove('permissions');

      // Redirect ke halaman login
      window.location.href = '/login';
    } else if (error.response?.status === 403) {

      //Redirect ke halaman forbidden (user not in admin/superadmin etc)
      window.location.href = '/admin/forbidden';
    } else {

      // Jika error bukan 401, kembalikan error
      return Promise.reject(error);
    }
  }
);

export default Api;