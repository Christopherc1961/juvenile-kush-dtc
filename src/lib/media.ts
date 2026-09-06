/** Local in Vite dev; GitHub raw in production so Vercel doesn't need the photo tree. */
const REMOTE =
  "https://raw.githubusercontent.com/Christopherc1961/juvenile-kush-dtc/main/public";

export function media(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (import.meta.env.DEV) return p;
  return `${REMOTE}${p}`;
}
