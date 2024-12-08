import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import PopularAnime from "@/pages/PopularAnime";


const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/popular" element={<PopularAnime />} />
    </Routes>
  </Router>
);

export default AppRoutes;
