export type TDep<T> = keyof T;
export type TDeps<T> = TDep<T>[];
export type TOptions<T> = (options?: TDeps<T>) => void;

export type TListener<TState> = (noti: TNoti<TState>) => void;
export type TSubscribe<T> = (listener: TListener<T>) => TSubscription;
export type TSubscription = {
  unsubscribe: () => void;
};

export type TNoti<TState> = {
  state: TState;
  change: TDep<TState>;
};

export type TStoreConfig<TState> = {
  key?: string;
  state: TState;
  loader?: (state: TState) => void;
  saver?: (state: TState) => void;
  autoLoad?: boolean;
};

export type IStore<TState> = {
  key?: string;
  state: TState;
  prevState: TState;
  load: () => void;
  save: () => void;
  reset: TOptions<TState>;
  revert: TOptions<TState>;
  subscribe: TSubscribe<TState>;
};
