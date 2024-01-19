import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

type ContextProviderProps = {
  children: ReactNode;
};

type ContextData = {
  state: null[]
}

type ContextType = {
  state: ContextData | null;
  setState: Dispatch<SetStateAction<ContextData | null>>;
};

const initialData: ContextType = {
  state: null,
  setState: () => { }
}

export const Context = createContext<ContextType>(initialData);

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [state, setState] = useState(initialData.state);

  return (
    <Context.Provider value={{ state, setState }}>
      {children}
    </Context.Provider>)
}
