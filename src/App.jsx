import "./app.css";
import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import NewArrivals from "./components/newArrivals/NewArrivals";
import About from "./components/about/About";
import Categories from "./components/categories/Categories";
import Feedbacks from "./components/feedbacks/Feedbacks";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="bankai__app">
      <div className="bankai__app-inner">
        <Navbar />
        <Header />
        <NewArrivals />
        <About />
        <Categories />
        <Feedbacks />
        <Footer />
      </div>
    </div>
  );
}

export default App;
