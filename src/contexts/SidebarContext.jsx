import { createContext, useContext, useReducer } from "react";
import { BASE_URL } from "../strapi";

const SidebarContext = createContext(null);

const initialState = {
  isSidebarHidden: true,
  isGenreHidden: false,
  isProductionHidden: false,
  isPriceHidden: false,
  genresList: [],
  productionList: [],
  priceRange: [0, 100],
  sortPar: "newest",
  mangaList: [],
  isMangaLoading: false,
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
    case "sortPar/set":
      return { ...state, sortPar: action.payload };
    case "mangaList/set":
      return { ...state, mangaList: action.payload };
    case "isMangaLoading/set":
      return { ...state, isMangaLoading: action.payload };

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
      sortPar,
      mangaList,
      isMangaLoading,
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

  function setSortPar(e) {
    dispatch({ type: "sortPar/set", payload: e.target.value });
  }

  function setMangaList(mangas) {
    dispatch({ type: "mangaList/set", payload: mangas });
  }

  function setIsMangaLoading(data) {
    dispatch({ type: "isMangaLoading/set", payload: data });
  }

  async function fetchMangas() {
    setIsMangaLoading(true);
    const res = await fetch(`${BASE_URL}/api/mangas?populate=*`);
    const data = await res.json();
    setMangaList(data.data);
    setIsMangaLoading(false);
  }

  function sortMangas(data) {
    switch (sortPar) {
      case "newest":
        return data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "low":
        return data.sort((a, b) => a.Price - b.Price);
      case "high":
        return data.sort((a, b) => b.Price - a.Price);
    }
  }

  async function fetchMangasByParams() {
    let query = "";

    genresList.map((id) => (query += `filters[Genres][id][$in]=${id}&`));

    productionList.map(
      (id) => (query += `filters[production][id][$in]=${id}&`)
    );

    query += `filters[Price][$gte]=${priceRange[0]}&`;
    query += `filters[Price][$lte]=${priceRange[1]}&`;

    setIsMangaLoading(true);
    const res = await fetch(`${BASE_URL}/api/mangas?${query}populate=*`);
    const data = await res.json();
    setMangaList(data.data);
    setIsMangaLoading(false);
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
        isMangaLoading,
        mangaList,
        toggleSidebar,
        toggleGenre,
        toggleProduction,
        togglePrice,
        toggleGenreItem,
        toggleProductionItem,
        setPriceRange,
        setSortPar,
        setMangaList,
        fetchMangas,
        sortMangas,
        fetchMangasByParams,
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
