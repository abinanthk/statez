import { useStoreCacheEffect } from ".";
import { useForceUpdate } from "../react-utils/hooks";
import { IStoreCache } from "@statez/vannila";
import type { TDeps } from "@statez/vannila";

export const useSyncStoreCache = <TState>(
  storeCache: IStoreCache<TState>,
  deps?: TDeps<TState>
) => {
  const forceUpdate = useForceUpdate();

  useStoreCacheEffect<TState>(storeCache, () => forceUpdate(), deps);

  return storeCache;
};
