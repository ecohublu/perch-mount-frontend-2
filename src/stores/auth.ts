import { defineStore } from 'pinia'
import type { Member } from '@/types/member'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    currentUser: null as Member | null,
  }),
  actions: {
    setUser(user: Member) {
      this.currentUser = user
      this.isLoggedIn = true
    },
    clearUser() {
      this.currentUser = null
      this.isLoggedIn = false
    },
  },
})
