/** True when running `next dev` or served from localhost. */
export function isLocalDevelopment(): boolean {
  if (process.env.NODE_ENV === "development") return true;
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    return host === "localhost" || host === "127.0.0.1" || host === "[::1]";
  }
  return false;
}

/** Token passed to onVerify when Turnstile is bypassed in local dev. */
export const DEV_TURNSTILE_BYPASS = "dev-local-bypass";
