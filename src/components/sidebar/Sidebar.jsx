import "./sidebar.css";
import { BASE_URL } from "../../strapi";
import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { MoonLoader } from "react-spinners";
import { Slider } from "@mui/material";
import { useSidebar } from "../../contexts/SidebarContext";

function FilterItem({ type, id, title }) {
  const { toggleGenreItem, toggleProductionItem } = useSidebar();
  let handler;

  switch (type) {
    case "genre":
      handler = toggleGenreItem;
      break;
    case "production":
      handler = toggleProductionItem;
      break;
  }

  return (
    <li className="bankai__sidebar-filter_item">
      <input
        type="checkbox"
        name={title}
        id={`checkbox-${id}`}
        onChange={() => handler(id)}
      />
      <label htmlFor={`checkbox-${id}`}>{title}</label>
    </li>
  );
}

function RangeSlider({ range, setRange }) {
  const handleChange = (event, newValue) => {
    setRange(newValue);
  };

  const valuetext = (value) => {
    return `${value}°C`;
  };

  return (
    <Slider
      getAriaLabel={(index) =>
        `Slider handle ${index === 0 ? "minimum" : "maximum"} value`
      }
      value={range}
      onChange={handleChange}
      valueLabelDisplay="auto"
      getAriaValueText={valuetext}
      disableSwap
      sx={{
        color: "#fff",
        "& .MuiSlider-thumb": {
          backgroundColor: "#fff",
          border: "2px solid #fff",
          width: "1rem",
          height: "1rem",
        },
        "& .MuiSlider-track": {
          backgroundColor: "#fff",
        },
        "& .MuiSlider-rail": {
          backgroundColor: "#fff",
        },
      }}
    />
  );
}

function Sidebar() {
  const [genres, setGenres] = useState([]);
  const [productions, setProductions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isSidebarHidden,
    isGenreHidden,
    isProductionHidden,
    isPriceHidden,
    priceRange,
    toggleGenre,
    toggleProduction,
    togglePrice,
    setPriceRange,
    fetchMangasByParams,
  } = useSidebar();

  useEffect(function () {
    setIsLoading(true);
    async function fetchGenres() {
      const res = await fetch(`${BASE_URL}/api/genres`);
      const data = await res.json();
      const sortedGenres = data.data.sort((a, b) =>
        a.Title.localeCompare(b.Title)
      );
      setGenres(sortedGenres);
    }

    async function fetchProduction() {
      const res = await fetch(`${BASE_URL}/api/productions`);
      const data = await res.json();
      setProductions(data.data);
    }

    fetchGenres();
    fetchProduction();
    setIsLoading(false);
  }, []);

  return (
    <aside
      className={`bankai__manga-list-sidebar ${
        isSidebarHidden ? "hidden" : ""
      }`}
    >
      <div className="bankai__sidebar-filter">
        <div className="heading">
          <h3>Genre</h3>
          <button
            className="bankai__sidebar-filter_button"
            onClick={toggleGenre}
          >
            {isGenreHidden ? <FaAngleDown /> : <FaAngleUp />}
          </button>
        </div>
        <ul
          className={`bankai__sidebar-filter_list ${
            isGenreHidden ? "hidden" : ""
          }`}
        >
          {isLoading ? (
            <MoonLoader color="#fff" speedMultiplier={0.25} />
          ) : (
            genres.map((genre) => (
              <FilterItem
                type="genre"
                id={genre.id}
                title={genre.Title}
                key={genre.id}
              />
            ))
          )}
        </ul>
      </div>
      <div className="bankai__sidebar-filter">
        <div className="heading">
          <h3>Production</h3>
          <button
            className="bankai__sidebar-filter_button"
            onClick={toggleProduction}
          >
            {isProductionHidden ? <FaAngleDown /> : <FaAngleUp />}
          </button>
        </div>
        <ul
          className={`bankai__sidebar-filter_list ${
            isProductionHidden ? "hidden" : ""
          }`}
        >
          {isLoading ? (
            <MoonLoader color="#fff" speedMultiplier={0.25} />
          ) : (
            productions.map((production) => (
              <FilterItem
                type="production"
                title={production.Title}
                id={production.id}
                key={production.id}
              />
            ))
          )}
        </ul>
      </div>
      <div className="bankai__sidebar-filter">
        <div className="heading">
          <h3>Price</h3>
          <button
            className="bankai__sidebar-filter_button"
            onClick={togglePrice}
          >
            {isPriceHidden ? <FaAngleDown /> : <FaAngleUp />}
          </button>
        </div>
        <ul
          className={`bankai__sidebar-filter_list ${
            isPriceHidden ? "hidden" : ""
          }`}
        >
          <RangeSlider range={priceRange} setRange={setPriceRange} />
          <div className="price-range">{`${priceRange[0]} - ${priceRange[1]}`}</div>
        </ul>
      </div>
      <div className="bankai__filter-search-btn">
        <button onClick={fetchMangasByParams}>Find</button>
      </div>
    </aside>
  );
}

export default Sidebar;
