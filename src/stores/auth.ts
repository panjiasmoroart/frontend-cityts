//import create zustand
import { create } from 'zustand'

//import services api
import Api from '../services/api'

// import type
import type { AuthState, Permissions } from '../types/auth'

//import js cookies
import Cookies from 'js-cookie'

export const useAuthStore = create<AuthState>((set) => ({

  // Inisialisasi state user, token, dan permissions dari cookies
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user') as string) : null,
  token: Cookies.get('token') || '',
  permissions: Cookies.get('permissions')
    ? JSON.parse(Cookies.get('permissions') as string)
    : {},

  // Fungsi untuk login
  login: async (credentials) => {

    //fetch data dari API
    const response = await Api.post('/api/login', credentials)
    const { data } = response.data

    //assign data ke user, token, dan permissions
    const user = {
      id: data.id,
      name: data.name,
      username: data.username,
      email: data.email,
      created_at: data.created_at,
      updated_at: data.updated_at,
    }

    // assign data ke token dan permissions
    const token: string = data.token
    const permissions: Permissions = data.permissions || {}

    // Set state
    set({ user, token, permissions })

    // Simpan ke cookies
    Cookies.set('user', JSON.stringify(user))
    Cookies.set('token', token)
    Cookies.set('permissions', JSON.stringify(permissions))
  },

  // Fungsi untuk logout
  logout: () => {

    // Set state ke null dan kosongkan token dan permissions
    set({ user: null, token: '', permissions: {} })

    // Hapus cookies
    Cookies.remove('user')
    Cookies.remove('token')
    Cookies.remove('permissions')
  },
}))