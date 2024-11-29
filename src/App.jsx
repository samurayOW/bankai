import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Categories from "./pages/Categories";
import PageNotFound from "./pages/PageNotFound";
import MangaList from "./pages/MangaList";
import Manga from "./pages/Manga";

function App() {
  return (
    <div className="bankai__app">
      <div className="bankai__app-inner">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="categories" element={<Categories />} />
            <Route path="manga" element={<MangaList />} />
            <Route path="manga/:id" element={<Manga />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
