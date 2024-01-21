import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

type ContextData = {
  cart: ProductType[]
  currentAccount: string | null
}

type ContextType = {
  state: ContextData;
  setState: Dispatch<SetStateAction<ContextData>>;
};

const initialData: ContextType = {
  state: { cart: [], currentAccount: null },
  setState: () => { }
}

type ContextProviderProps = {
  children: ReactNode;
};

export const Context = createContext<ContextType>(initialData);

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [state, setState] = useState(initialData.state);

  return (
    <Context.Provider value={{ state, setState }}>
      {children}
    </Context.Provider>)
}
