import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Lol from "./pages/Lol";
import Vlrt from "./pages/Vlrt";
import Home from "./pages/Home";
import Footer from "components/Footer";

function App() {
  return (
    <div className="root-wrap flex h-screen flex-col overflow-hidden">
      <BrowserRouter>
        <Header />
        <div className="flex flex-1 flex-col overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leagueOfLegends" element={<Lol />} />
            <Route path="/valorant" element={<Vlrt />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
