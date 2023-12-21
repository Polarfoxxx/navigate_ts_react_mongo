import './App.css';
import {  Route, Routes } from 'react-router-dom';
import { Container } from './module/Container';
import { Content } from './module/Content';
import { LoginPage } from './module/Authentication';
import React from 'react';
import { useNavigate } from 'react-router-dom';


function App(): JSX.Element {
  const NAVIGATE = useNavigate();

  React.useEffect(() => {
    localStorage.getItem("JWT_token") === null ? NAVIGATE("/LoginPage") : NAVIGATE("/Content")
  }, [])


  return (
    <div className='app'>
      <Container.Provider>
          <Routes>
            <Route path="LoginPage" element={<LoginPage />} />
            <Route path="Content" element={<Content />} />
          </Routes>
      </Container.Provider>

    </div>
  );
}


export default App;
