import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from './module/Container';
import { Content } from './module/Content';
import { LoginPage } from './module/Authentication';



function App() {

  return (
    <div className='app'>
        <BrowserRouter>
          <Container.Provider>
            <Routes>
              <Route path="/" element={<LoginPage />} /> 
              <Route path="Content" element={<Content />} />
            </Routes>
          </Container.Provider>
        </BrowserRouter>
    </div>
  );
}


export default App;
