import './App.css';

// router
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

// hooks
import { useAuth } from './hooks/useAuth';

// pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile';

// components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  const { auth, loading } = useAuth();

  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <BrowserRouter>

        <Navbar/>

        <div className="container">
          <Routes>
            <Route path="/" element={ auth ? <Home/> : <Navigate to="/Login"/> }/>
            <Route path="/profile" element={ auth ? <EditProfile/> : <Navigate to="/Login"/> }/>
            <Route path="/users/:id" element={ <Profile/> }/>
            <Route path="/login" element={ !auth ? <Login/> : <Navigate to="/"/> }/>
            <Route path="/register" element={ !auth ? <Register/> : <Navigate to="/"/> }/>
          </Routes>
        </div>

        <Footer/>

      </BrowserRouter>
    </div>
  );
}

export default App;
