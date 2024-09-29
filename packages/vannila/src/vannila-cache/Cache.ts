import type { ICache } from "./types";

const DEFAULT_CACHE_MAX_SIZE = 50;

export class Cache<K, V> implements ICache<K, V> {
  private readonly _cache: Map<K, V>;
  private readonly _maxSize: number;

  constructor(maxSize: number = DEFAULT_CACHE_MAX_SIZE) {
    this._cache = new Map<K, V>();
    this._maxSize = maxSize;
  }

  set(key: K, value: V) {
    if (this._cache.size >= this._maxSize) {
      console.warn("Cache is full.");
      return false;
    }

    this._cache.set(key, value);

    return true;
  }

  get(key: K) {
    return this._cache.get(key);
  }

  remove(key: K) {
    return this._cache.delete(key);
  }

  has(key: K) {
    return this._cache.has(key);
  }

  get size() {
    return this._cache.size;
  }

  clear() {
    this._cache.clear();
  }
}
