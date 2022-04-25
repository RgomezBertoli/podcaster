import React, { useContext, createContext, useState } from "react";

const context = createContext({ isLoading: false, setLoader: null });
context.displayName = "LoaderContext";

export function useLoaderContext() {
  return useContext(context);
}

export default function LoaderContext({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  return <context.Provider value={{ isLoading, setLoader: setIsLoading }}>{children}</context.Provider>;
}
