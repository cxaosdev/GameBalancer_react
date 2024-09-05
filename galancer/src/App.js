import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Lol from "./pages/Lol";
import Vlrt from "./pages/Vlrt";

function App() {
  return (
    <div className="root-wrap">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/LeagueOfLegends" element={<Lol />} />
          <Route path="/Valorant" element={<Vlrt />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
