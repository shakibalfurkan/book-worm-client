export const AUTH_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

export const isAuthRoute = (url?: string) =>
  AUTH_ROUTES.some((route) => url?.includes(route));

export const USER_ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;
