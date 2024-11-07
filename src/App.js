import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Home from './componentes/Pages/Home'
import Contact from './componentes/Pages/Contact'
import NewProject from './componentes/Pages/NewProject'
import Empresa from './componentes/Pages/Empresa'
import Projects from './componentes/Pages/Projects'
import Project from './componentes/Pages/Project'


import Container from './componentes/Layout/Container';
import NavBar from './componentes/Layout/NavBar';
import Footer from './componentes/Layout/Footer';

function App() {
  return (
    <Router>
      <NavBar/>
      <Container customClass = "min-height">
      <Routes>
      <Route exact path="/" element = {<Home/>} />
      <Route exact path="/projects" element = {<Projects/>} />     
        <Route path="/contact" element = {<Contact/>} />
        <Route  path="/company" element = {<Empresa/>} />
        <Route path="/newproject" element = {<NewProject/>} />
        <Route path ="/project/:id" element = {<Project/>} />
       </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
