import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery/Gallery';
import ArtUploadForm from './components/ArtUploadForm/ArtUploadForm';
import { Container } from 'react-bootstrap';
import { data } from 'jquery';

function App() {
  const [ statuses, setStatuses ] = useState([])
  const [ arts, setArts ] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/statuses')
    .then((data) => data.json())
    .then((ret)=>setStatuses(ret))
  }, [])

  useEffect(() => {
    fetch('http://localhost:4000/arts')
    .then((data) => data.json())
    .then((ret) => setArts(ret))
  }, [])

  return (
    <div>
      <Navbar />
      <Container className="content">
        <Routes>
          <Route exact path={'/'} element={<Gallery arts={arts} />} />
          <Route path={'/upload'} element={<ArtUploadForm statuses={statuses} />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
