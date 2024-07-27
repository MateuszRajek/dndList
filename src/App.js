import { useState } from "react";
import "./App.css";
import MainSection from "./components/MainSection/MainSection";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [activeScreen, setActiveScreen] = useState("boards");

  const handleScreenChange = (screen) => {
    setActiveScreen(screen);
  };
  return (
    <div className="container">
      <NavBar handleScreenChange={handleScreenChange} activeScreen={activeScreen} />
      <MainSection activeScreen={activeScreen} />
    </div>
  );
}

export default App;

