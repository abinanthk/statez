import { Store } from "../vannila-store";
import { Cache } from "../vannila-cache";
import type { IStore } from "../vannila-store/types";
import type { ICache } from "../vannila-cache/types";
import type { IStoreCache, TStoreCacheConfig } from "./types";

export class StoreCache<TState extends {}> implements IStoreCache<TState> {
  static cache = new Cache<string, IStore<any>>();
  store: IStore<TState>;
  private readonly _config: TStoreCacheConfig<TState>;

  constructor(
    storeCacheConfig: TStoreCacheConfig<TState>,
    cache?: ICache<string, IStore<TState>>
  ) {
    const _cache = cache ? cache : StoreCache.cache;
    let _store: any;

    this._config = {
      enableCache: true,
      autoCache: true,
      ...storeCacheConfig,
    };

    if (this._config.enableCache && _cache.has(storeCacheConfig.key)) {
      _store = _cache.get(storeCacheConfig.key);
    }

    if (!_store) {
      _store = new Store<TState>(storeCacheConfig);
      _cache.set(storeCacheConfig.key, _store);
    }

    this.store = _store;

    if (this._config.autoCache) {
      this.store.load();
    }
  }
}
