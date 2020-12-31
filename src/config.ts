export const port = (process.env.PORT || 8080) as number;
export const paths = {
  admin: "/admin",
  api: "/api",
};
export const url = process.env.URL || `http://localhost:${port}`;
