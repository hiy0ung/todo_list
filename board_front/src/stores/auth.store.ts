// zustand 파일명 권장
// : 전역상태관리할데이터명.store.ts
// EX) auth.store.ts

import { create } from "zustand";

//* interface *//
//# 상태 인터페이스 정의 //
interface User {
  id: number; 
  name: string;
}

interface AuthStoreType {
  isAuthenticated: boolean; // 인증 여부를 나타냄
  user: User | null; // 사용자 정보를 담은 객체 또는 null

  // 상태 업데이트 함수
  login: (user: User) => void;
  logout: () => void;
}

const UseAuthStore = create<AuthStoreType>((set) => ({
  // 상태 필드 초기화
  isAuthenticated: false,
  user: null,

  // 상태 업데이트 함수
  login: (user) => set ({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null })
}));

export default UseAuthStore;