import { useEffect } from "react";
import { IStoreCache } from "@statez/vannila";
import type { TDeps, TNoti } from "@statez/vannila";

export const useStoreCacheEffect = <TState>(
  storeCache?: IStoreCache<TState>,
  fn?: (noti: TNoti<TState>) => void,
  deps?: TDeps<TState>
) => {
  useEffect(() => {
    const _deps =
      deps ||
      (Reflect.ownKeys(storeCache?.store?.state as object) as TDeps<TState>);

    const subscription = storeCache?.store?.subscribe((noti: TNoti<TState>) => {
      if (_deps?.includes(noti.change)) {
        fn?.(noti);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);
};
