import { useStoreEffect } from ".";
import { useForceUpdate } from "../react-utils/hooks";
import type { TDeps, IStore } from "@statez/vannila";

export const useSyncStore = <TState>(
  store: IStore<TState>,
  deps?: TDeps<TState>
) => {
  const forceUpdate = useForceUpdate();

  useStoreEffect<TState>(store, () => forceUpdate(), deps);

  return store;
};
