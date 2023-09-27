import "@root/src/App.css";
import NavBar from "@src/components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "@src/components/NavBar/Header";

function App() {
  return (
    <>
      <Router>
      <Header />
        <NavBar />

        <Routes>
        </Routes>
      </Router>
    </>
  );
}

export default App;
