type Entry = { at: number; data?: unknown; promise?: Promise<unknown> };
const store = new Map<string, Entry>();

export function cachedJson<T = any>(url: string, ttlMs = 60_000): Promise<T> {
  const hit = store.get(url);
  const now = Date.now();

  if (hit) {
    if (hit.promise) return hit.promise as Promise<T>;
    if (now - hit.at < ttlMs) return Promise.resolve(hit.data as T);
  }

  const promise = fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    })
    .then((data) => {
      store.set(url, { at: Date.now(), data });
      return data as T;
    })
    .catch((err) => {
      store.delete(url);
      throw err;
    });

  store.set(url, { at: now, promise });
  return promise;
}