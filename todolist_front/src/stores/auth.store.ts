// zustand 파일명 권장
// : 전역상태관리할데이터명.store.ts
// EX) auth.store.ts

import { create } from "zustand";

interface User {
  token: string;
}

interface AuthStoreType {
  isAuthenticated: boolean;
  user: User | null;

  login: (user: User) => void;
  logout: () => void;
}

const UseAuthStore = create<AuthStoreType>((set) => ({
  isAuthenticated: false,
  user: null,

  login: (user) => set ({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null })
}));

export default UseAuthStore;