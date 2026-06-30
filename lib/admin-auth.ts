export async function ensureAdminAccess() {
  // Middleware protects /admin with Basic Auth. Keep this helper as the future
  // attachment point for role-based auth without touching page code.
  return { role: "basic-auth-admin" };
}
