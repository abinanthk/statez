import { Subject } from "rxjs";
import type { IStore, TStoreConfig, TDeps, TListener, TNoti } from "./types";

export class Store<TState extends {}> implements IStore<TState> {
  private readonly _state: TState;
  private readonly _prevState: TState;
  private readonly _subject$: Subject<TNoti<TState>>;
  private readonly _config: TStoreConfig<TState>;

  constructor(config: TStoreConfig<TState>) {
    const _state = { ...config.state };
    const _prevState = { ...config.state };
    const _subject$ = new Subject<TNoti<TState>>();

    this._prevState = _prevState;
    this._subject$ = _subject$;
    this._config = { autoLoad: true, ...config, state: { ...config.state } };

    this._state = new Proxy(_state, {
      get(target, prop) {
        return Reflect.get(target, prop);
      },
      set(target, prop, value) {
        const prevValue = Reflect.get(target, prop);

        if (!Reflect.has(target, prop)) {
          console.error(
            `Property ${String(prop)} is not presented in state's blueprint.
            State's blueprints are immutable.
            `
          );
          return false;
        }

        if (typeof prevValue === "function") {
          console.error(
            `Property ${String(prop)} is a function in state's blueprint.
            Functions are immutable in Store's state.
            `
          );
          return false;
        }

        if (prevValue === value) {
          return true;
        }

        if (!Reflect.set(target, prop, value)) {
          return false;
        }

        Reflect.set(_prevState, prop, prevValue);

        _subject$.next({
          state: { ...target },
          change: prop as any,
        });

        return true;
      },
    });

    if (this._config.autoLoad) {
      this.load();
    }
  }

  get key() {
    return this._config.key;
  }

  get state() {
    return this._state;
  }

  get prevState() {
    return { ...this._prevState };
  }

  load() {
    this._config.loader?.(this.state);
  }

  save() {
    this._config.saver?.(this.state);
  }

  private setState(fromState: TState, toState: TState, deps?: TDeps<TState>) {
    const _deps =
      deps || (Reflect.ownKeys(fromState as object) as TDeps<TState>);

    _deps?.forEach((key) => {
      if (
        !Reflect.has(fromState, key) ||
        typeof fromState[key] === "function"
      ) {
        return;
      }

      (toState as any)[key] = fromState[key];
    });
  }

  revert(deps?: TDeps<TState>) {
    this.setState(this._prevState, this.state, deps);
    this.setState(this.state, this._prevState, deps);
  }

  reset(deps?: TDeps<TState>) {
    this.setState(this._config.state, this.state, deps);
  }

  subscribe(listener: TListener<TState>) {
    return this._subject$.subscribe(listener);
  }
}
