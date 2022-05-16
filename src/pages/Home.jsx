import Announcement from "../components/Announcement";
import { React } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";

const Home = () => {

  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider/>
      <Categories/>
      <Products/>
      <Newsletter/> 
      <Footer/> 
    </div>
  );
};

export default Home;
