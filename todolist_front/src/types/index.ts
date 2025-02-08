//? 사용자 정보
export interface UserInfo {
  id: number;
  userId: string;
  password: string;
  name: string;
  email: string;
}

//? 로그인 요청 정보
export interface Credentials {
  userId: string;
  password: string;
}

//? 로그인 응답 정보
export interface SignInResponseDto {
  token: string;
  exprTime: number;
}

//? Todo 정보
export interface Todo {
  id: number;
  content: string;
  status: boolean;
}