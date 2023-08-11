import { Routes, Route } from "react-router-dom";
import Pokedex from "./Components/Pokedex/Pokedex.js";
import PokemonDetails from "./Components/PokemonDetails/PokemonDetails.js";
import {Link} from 'react-router-dom'
import './App.css'
function App() {

  return (
    <>
    <div className='outer-pokedex'> 
      <h1 className="pokedex-heading">
      <Link to="/">Pokedex</Link>
      </h1> 
      <Routes>

          <Route path="/" element={<Pokedex/>}/>
          <Route path="/pokemon/:id" element={<PokemonDetails/>}/>

       </Routes>
    </div>
    </>
  )
}

export default App ;