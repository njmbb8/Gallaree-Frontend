import './App.css';
import Navbar from './components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery/Gallery';
import ArtUploadForm from './components/ArtUploadForm/ArtUploadForm';
import { Container } from 'react-bootstrap';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';

function App() {
  const [ statuses, setStatuses ] = useState([])
  const [ arts, setArts ] = useState([])
  const { REACT_APP_BACKEND_URL } = process.env

  useEffect(() => {
    fetch(`${REACT_APP_BACKEND_URL}/statuses`)
    .then((data) => data.json())
    .then((ret)=>setStatuses(ret))
  }, [REACT_APP_BACKEND_URL])

  useEffect(() => {
    fetch(`${REACT_APP_BACKEND_URL}/arts`)
    .then((data) => data.json())
    .then((ret) => setArts(ret))
  }, [REACT_APP_BACKEND_URL])

  return (
    <div>
      <Navbar />
      <Container className="content">
        <Routes>
          <Route exact path={'/'} element={<Gallery arts={arts} />} />
          <Route path={'/upload'} element={<ArtUploadForm statuses={statuses} />} />
          <Route path={'/register'} element={<RegistrationForm />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
