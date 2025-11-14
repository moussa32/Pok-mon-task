import { Route, Routes } from "react-router";
import Home from "./features/pokemon/pages/HomePage";
import PokemonDetailsPage from "./features/pokemon/pages/pokemon/[id]/Page";

function App() {
  return (
    <section className="min-h-screen pt-8 pb-16 bg-linear-to-tr from-[#effcf3] to-[#d4fbe6]">
      <section className="px-5 lg:px-0 container mx-auto">
        <Routes>
          <Route index element={<Home />} />
          <Route path="pokemon/:id" element={<PokemonDetailsPage />} />
        </Routes>
      </section>
    </section>
  );
}

export default App;
