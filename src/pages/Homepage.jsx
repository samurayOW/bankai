import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";
import NewArrivals from "../components/newArrivals/NewArrivals";
import About from "../components/about/About";
import Categories from "../components/categories/Categories";
import Feedbacks from "../components/feedbacks/Feedbacks";
import Footer from "../components/footer/Footer";

function Homepage() {
  return (
    <>
      <Navbar />
      <Header />
      <NewArrivals />
      <About />
      <Categories />
      <Feedbacks />
      <Footer />
    </>
  );
}

export default Homepage;
