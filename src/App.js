import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Battle from "./components/Battle/Battle";
import Gallery from "./components/Gallery/Gallery";
import Navbar from "./components/Navbar";
import "./components/Battle/Battle.css";
import Start from "./components/FrontPage/Start";
import NewHamster from "./components/Gallery/NewHamster";

function App() {
    return (
        <div className="App">
            <Router>
                <header className="header">
                    <h1>Welcome to Hamster wars</h1>
                    <Navbar />
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<Start />} />
                        <Route path="/battle" element={<Battle />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="newHamster" element={<NewHamster />} />
                    </Routes>
                </main>
            </Router>
        </div>
    );
}

export default App;
