import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage';
import NotFoundPage from './pages/NotFoundPage';
import NavbarComp from './components/NavbarComp';
import FooterComp from './components/FooterComp';
import Categories from './pages/Categories';
import ToTheTopComp from './components/ToTheTopComp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavbarComp />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      <FooterComp />
      <ToTheTopComp />
      </BrowserRouter>
    </div>
  );
}

export default App;
