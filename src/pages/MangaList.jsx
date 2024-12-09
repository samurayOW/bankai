import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "./mangaList.css";
import Sidebar from "../components/sidebar/Sidebar";
import { useEffect } from "react";
import MangaItem from "../components/mangaItem/MangaItem";
import { FaFilter } from "react-icons/fa6";
import { useSidebar } from "../contexts/SidebarContext";
import { MoonLoader } from "react-spinners";

function MangaList() {
  const {
    isMangaLoading,
    mangaList,
    toggleSidebar,
    setSortPar,
    fetchMangas,
    sortMangas,
  } = useSidebar();

  useEffect(function () {
    fetchMangas();
  }, []);

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
          <ul className="bankai__manga-list-products">
            {isMangaLoading ? (
              <MoonLoader color="pink" speedMultiplier={0.25} />
            ) : (
              sortMangas(mangaList).map((manga) => (
                <MangaItem manga={manga} key={manga.id} />
              ))
            )}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default MangaList;
