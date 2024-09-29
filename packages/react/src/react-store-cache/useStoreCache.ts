import { useRef } from "react";
import { useSyncStoreCache } from ".";
import { StoreCache } from "@statez/vannila";
import type { TDeps, IStoreCache, TStoreCacheConfig } from "@statez/vannila";

export const useStoreCache = <TState extends {}>(
  config: TStoreCacheConfig<TState>,
  deps?: TDeps<TState>
) => {
  const storeRef = useRef<IStoreCache<TState> | null>(null);

  if (!storeRef.current) {
    storeRef.current = new StoreCache<TState>(config);
  }

  return useSyncStoreCache<TState>(storeRef.current, deps);
};
