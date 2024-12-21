import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "./mangaList.css";
import Sidebar from "../components/sidebar/Sidebar";
import { useEffect } from "react";
import MangaItem from "../components/mangaItem/MangaItem";
import { FaFilter } from "react-icons/fa6";
import { useSidebar } from "../contexts/SidebarContext";
import { MoonLoader } from "react-spinners";
import { useParams } from "react-router-dom";

function Page({ i }) {
  const { fetchMangasByParams, genresList, currentPage } = useSidebar();
  const index = i + 1;

  return (
    <li
      className={`bankai__manga-list-page ${
        currentPage === index ? "current-page" : ""
      }`}
    >
      <button onClick={() => fetchMangasByParams(genresList, index)}>
        {index}
      </button>
    </li>
  );
}

function MangaList() {
  const { genreId } = useParams();

  const {
    sortPar,
    genresList,
    isMangaLoading,
    mangaList,
    pages,
    toggleSidebar,
    setSortPar,
    fetchMangas,
    clearFilter,
    setGenresList,
    fetchMangasByParams,
  } = useSidebar();

  useEffect(() => {
    async function loadManga() {
      await clearFilter();
      if (!genreId) {
        console.log("Loading all mangas.");
        await fetchMangas(1);
        return;
      }

      const newGenre = [Number(genreId)];
      console.log("Loading manga with genre:", newGenre);

      if (JSON.stringify(genresList) !== JSON.stringify(newGenre)) {
        await setGenresList(newGenre);
        console.log("Updated genresList:", genresList);
        await fetchMangasByParams(newGenre, 1);
      }
    }

    loadManga();
  }, [genreId]);

  useEffect(() => {
    fetchMangasByParams(genresList, 1);
  }, [sortPar]);

  return (
    <>
      <Navbar />
      <section className="bankai__section-manga-list section__padding">
        <div className="heading">
          <h1>All manga</h1>
          <div className="heading__buttons">
            <label htmlFor="sort" className="sort-label">
              Sort by:
            </label>
            <select name="sort" id="sort" onChange={setSortPar}>
              <option value="newest">Newest arrivals</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
            <button
              className="bankai__manga-list-filter_btn"
              onClick={toggleSidebar}
            >
              <FaFilter /> Filter
            </button>
          </div>
        </div>
        <div className="bankai__manga-list-inner">
          <Sidebar />
          <div className="bankai__manga-list-wrapper">
            <ul className="bankai__manga-list-products">
              {isMangaLoading ? (
                <MoonLoader color="pink" speedMultiplier={0.25} />
              ) : (
                mangaList.map((manga) => (
                  <MangaItem manga={manga} key={manga.id} />
                ))
              )}
            </ul>
            <ul className="bankai__manga-list-pages">
              {Array.from({ length: pages }, (_, i) => (
                <Page key={i} i={i} />
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default MangaList;
