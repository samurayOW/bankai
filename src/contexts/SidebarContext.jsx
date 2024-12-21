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
  pages: 1,
  currentPage: 1,
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
    case "genres/set":
      return { ...state, genresList: action.payload };
    case "genres/toggleItem":
      const genreExists = state.genresList.includes(action.payload);
      return {
        ...state,
        genresList: genreExists
          ? state.genresList.filter((genre) => genre !== action.payload)
          : [...state.genresList, action.payload],
      };
    case "production/set":
      return { ...state, productionList: action.payload };
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
    case "pages/set":
      return { ...state, pages: action.payload };
    case "currentPage/set":
      return { ...state, currentPage: action.payload };

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
      pages,
      currentPage,
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

  function setGenresList(list) {
    dispatch({ type: "genres/set", payload: list });
  }

  function toggleGenreItem(id) {
    dispatch({ type: "genres/toggleItem", payload: id });
  }

  function setProductionList(list) {
    dispatch({ type: "production/set", payload: list });
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

  function setPages(data) {
    dispatch({ type: "pages/set", payload: data });
  }

  function setCurrentPage(data) {
    dispatch({ type: "currentPage/set", payload: data });
  }

  async function fetchMangas(page) {
    setIsMangaLoading(true);
    let sortParam = "createdAt:desc";
    switch (sortPar) {
      case "newest":
        sortParam = "createdAt:desc";
        break;
      case "low":
        sortParam = "Price:asc";
        break;
      case "high":
        sortParam = "Price:desc";
        break;
      default:
        sortParam = "createdAt:desc";
    }

    setIsMangaLoading(true);

    const res = await fetch(
      `${BASE_URL}/api/mangas?populate=*&sort=${sortParam}&pagination[page]=${page}&pagination[pageSize]=10`
    );
    const data = await res.json();
    setMangaList(data.data);
    setPages(data.meta.pagination.pageCount);
    setCurrentPage(page);
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

  async function fetchMangasByParams(genres, page) {
    let query = "";
    genres.map((id) => (query += `filters[Genres][id][$in]=${id}&`));
    console.log("Genres query:", query);
    productionList.map(
      (id) => (query += `filters[production][id][$in]=${id}&`)
    );
    query += `filters[Price][$gte]=${priceRange[0]}&`;
    query += `filters[Price][$lte]=${priceRange[1]}&`;

    let sortParam = "createdAt:desc";
    switch (sortPar) {
      case "newest":
        sortParam = "createdAt:desc";
        break;
      case "low":
        sortParam = "Price:asc";
        break;
      case "high":
        sortParam = "Price:desc";
        break;
      default:
        sortParam = "createdAt:desc";
    }

    setIsMangaLoading(true);

    const res = await fetch(
      `${BASE_URL}/api/mangas?${query}populate=*&sort=${sortParam}&pagination[page]=${page}&pagination[pageSize]=10`
    );

    const data = await res.json();

    setMangaList(data.data);
    setPages(data.meta.pagination.pageCount);
    setCurrentPage(page);
    setIsMangaLoading(false);
  }

  function clearFilter() {
    setGenresList([]);
    setProductionList([]);
    setPriceRange([0, 100]);
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
        pages,
        sortPar,
        currentPage,
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
        clearFilter,
        setGenresList,
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
