import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Listbeers from "./components/ListBeers";
import SingleBeer from "./components/SingleBeer";
import RandomBeer from "./components/RandomBeer";
import NewBeer from "./components/NewBeer";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    getBeers()
  }, []);

  const getBeers = () => {
    axios
      .get("https://ih-beers-api2.herokuapp.com/beers")
      .then((response) => {
        console.log("response.data", response.data);
        setBeers(response.data);
      })
      .catch((error) => {
        console.log("error getting data from API", error);
      });
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />} />
        <Route path="/beers" element={<Listbeers beersList={beers} />} />
        <Route
          path="/random-beer"
          element={<RandomBeer beersList={beers} />}
        ></Route>
        <Route path="/new-beer" element={<NewBeer updateList={getBeers}/>}></Route>
        <Route
          path="/beerdetails/:beerId"
          element={<SingleBeer beersList={beers} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
