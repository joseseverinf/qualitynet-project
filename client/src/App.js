import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Container } from 'reactstrap';
import Home from './components/home/home'


import './App.css';

function App() {
  return (
     <Container fluid className="Fondo">
      
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Home />} />         
          </Routes>
        </BrowserRouter>

    </Container>
  );
}

export default App;
