const KEY = "juvkush_age_ok";
export const MIN_AGE = 21;

export function yearsOld(isoDate: string, now = new Date()) {
  const dob = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(dob.getTime())) return 0;
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age -= 1;
  return age;
}

export function isTwentyOne(isoDate: string) {
  return yearsOld(isoDate) >= MIN_AGE;
}

export function readAgeOk(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { dob?: string; at?: number };
    return Boolean(parsed.dob && isTwentyOne(parsed.dob));
  } catch {
    return false;
  }
}

export function persistAgeOk(dob: string) {
  localStorage.setItem(KEY, JSON.stringify({ dob, at: Date.now() }));
}

export function clearAgeOk() {
  localStorage.removeItem(KEY);
}
