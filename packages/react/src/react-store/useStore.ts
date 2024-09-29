import { useRef } from "react";
import { Store } from "@statez/vannila";
import { useSyncStore } from ".";
import type { TDeps, IStore, TStoreConfig } from "@statez/vannila";

export const useStore = <TState extends {}>(
  config: TStoreConfig<TState>,
  deps?: TDeps<TState>
) => {
  const storeRef = useRef<IStore<TState> | null>(null);

  if (!storeRef.current) {
    storeRef.current = new Store<TState>(config);
  }

  return useSyncStore<TState>(storeRef.current, deps);
};
