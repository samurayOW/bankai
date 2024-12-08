import { createContext, useContext, useReducer } from "react";

const SidebarContext = createContext(null);

const initialState = {
  isSidebarHidden: true,
  isGenreHidden: false,
  isProductionHidden: false,
  isPriceHidden: false,
  genresList: [],
  productionList: [],
  priceRange: [0, 100],
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
    case "genres/toggleItem":
      const genreExists = state.genresList.includes(action.payload);
      return {
        ...state,
        genresList: genreExists
          ? state.genresList.filter((genre) => genre !== action.payload)
          : [...state.genresList, action.payload],
      };
    case "production/toggleItem":
      const productionExists = state.productionList.includes(action.payload);
      return {
        ...state,
        productionList: productionExists
          ? state.productionList.filter(
              (production) => production !== action.payload
            )
          : [...state.productionList, action.payload],
      };
    case "priceRange/set":
      return { ...state, priceRange: action.payload };

    default:
      return state;
  }
}

function SidebarProvider({ children }) {
  const [
    {
      isSidebarHidden,
      isGenreHidden,
      isProductionHidden,
      isPriceHidden,
      genresList,
      productionList,
      priceRange,
    },
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
  function toggleGenreItem(id) {
    dispatch({ type: "genres/toggleItem", payload: id });
  }
  function toggleProductionItem(id) {
    dispatch({ type: "production/toggleItem", payload: id });
  }
  function setPriceRange(range) {
    dispatch({ type: "priceRange/set", payload: range });
  }

  return (
    <SidebarContext.Provider
      value={{
        isSidebarHidden,
        isGenreHidden,
        isProductionHidden,
        isPriceHidden,
        genresList,
        productionList,
        priceRange,
        toggleSidebar,
        toggleGenre,
        toggleProduction,
        togglePrice,
        toggleGenreItem,
        toggleProductionItem,
        setPriceRange,
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
