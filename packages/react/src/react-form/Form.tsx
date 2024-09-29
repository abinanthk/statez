import { createContext, ReactNode, useContext } from "react";
import { useSyncStore } from "../react-store";
import { Store } from "@statez/vannila";

const formStore = new Store({ state: {} });

const FormContext = createContext(formStore);

const useFormContext = () => {
  return useContext(FormContext);
};

export type FormRootProps = {
  children: ReactNode;
  store: any;
};

export const FormRoot = (props: FormRootProps) => {
  return (
    <FormContext.Provider value={props.store}>
      {props.children}
    </FormContext.Provider>
  );
};

export type FormSubscribeProps = {
  children: any;
  options: string[];
};

export const FormSubscribe = (props: FormSubscribeProps) => {
  const formCtx = useFormContext();

  useSyncStore(formCtx, props.options as never[]);

  return props.children?.(formCtx.state);
};

export type FormFieldProps = {
  children: any;
  name: string;
};

export const FormField = (props: FormFieldProps) => {
  const formCtx = useFormContext();

  useSyncStore(formCtx, [props.name as never]);

  return props.children?.(formCtx.state);
};

export const Form = {
  Root: FormRoot,
  Subscribe: FormSubscribe,
  Field: FormField,
};
