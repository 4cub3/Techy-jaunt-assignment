export const BASE_ROUTE = "/api/v1";

export enum ROOT_ROUTE {
  AUTH = `${BASE_ROUTE}/auth`,
  USER = `${BASE_ROUTE}/user`,
}

export enum AUTH_ROUTE {
  LOGIN = "/login",
  REGISTER = "/register",
  VERIFY_EMAIL = "/email/verify",
}

export enum PROFILE_ROUTE {
  PROFILE = "/profile",
}
