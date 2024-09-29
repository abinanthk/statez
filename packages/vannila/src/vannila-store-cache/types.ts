import { IStore, TStoreConfig } from "../vannila-store/types";

export type TStoreCacheConfig<TState> = TStoreConfig<TState> & {
  key: string;
  enableCache?: boolean;
  autoCache?: boolean;
  cacheInterval?: number;
};

export interface IStoreCache<TState> {
  store: IStore<TState>;
}
