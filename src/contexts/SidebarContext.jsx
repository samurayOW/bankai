import { createContext, useContext, useReducer } from "react";

const SidebarContext = createContext(null);

const initialState = {
  isSidebarHidden: true,
  isGenreHidden: false,
  isProductionHidden: false,
  isPriceHidden: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "sidebar/toggle":
      return { ...state, isSidebarHidden: !state.isSidebarHidden };
    case "genre/toggle":
      return { ...state, isGenreHidden: !state.isGenreHidden };
    case "production/toggle":
      return { ...state, isProductionHidden: !state.isProductionHidden };
    case "price/toggle":
      return { ...state, isPriceHidden: !state.isPriceHidden };
  }
}

function SidebarProvider({ children }) {
  const [
    { isSidebarHidden, isGenreHidden, isProductionHidden, isPriceHidden },
    dispatch,
  ] = useReducer(reducer, initialState);

  function toggleSidebar() {
    dispatch({ type: "sidebar/toggle" });
  }
  function toggleGenre() {
    dispatch({ type: "genre/toggle" });
  }
  function toggleProduction() {
    dispatch({ type: "production/toggle" });
  }
  function togglePrice() {
    dispatch({ type: "price/toggle" });
  }

  return (
    <SidebarContext.Provider
      value={{
        isSidebarHidden,
        isGenreHidden,
        isProductionHidden,
        isPriceHidden,
        toggleSidebar,
        toggleGenre,
        toggleProduction,
        togglePrice,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("SidebarContext was used outside the SidebarProvider");
  }
  return context;
}

export { SidebarProvider, useSidebar };
