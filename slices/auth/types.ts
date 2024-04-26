/* --- STATE --- */
export interface AuthState {
  loading: {
    login: boolean,
    register: boolean,
    email: boolean,
    phone: boolean,
    forgotPassword: boolean
  };
  error: {
    login: string,
    register: string,
    email: string,
    phone: string,
    forgotPassword: string
  };
  isLoggedIn: boolean;
}
