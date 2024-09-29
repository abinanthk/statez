import { useEffect } from "react";
import type { TDeps, IStore, TNoti } from "@statez/vannila";

export const useStoreEffect = <TState>(
  store?: IStore<TState>,
  fn?: (noti: TNoti<TState>) => void,
  deps?: TDeps<TState>
) => {
  useEffect(() => {
    const _deps =
      deps || (Reflect.ownKeys(store?.state as object) as TDeps<TState>);

    const subscription = store?.subscribe((noti: TNoti<TState>) => {
      if (_deps?.includes(noti.change)) {
        fn?.(noti);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);
};
