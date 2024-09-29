export interface ICache<K, V> {
  size: number;
  set: (key: K, value: V) => boolean;
  get: (key: K) => V | undefined;
  remove: (key: K) => void;
  has: (key: K) => boolean;
  clear: () => void;
}
