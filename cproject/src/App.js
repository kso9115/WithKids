import './App.css';
import Home from './home/Home.js'
import Select from './select/Select'
import UserHome from './user/UserHome'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Select />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/userHome" element={<UserHome />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;