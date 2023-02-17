import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Chat from './pages/Chat';

function App() {
  return (
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/chat" element={<Chat/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
