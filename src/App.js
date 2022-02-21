import './App.css';
import Navbar from './components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery/Gallery';
import ArtForm from './components/ArtForm/ArtForm';
import { Container } from 'react-bootstrap';
import ArtDisplay from './components/ArtDisplay/ArtDisplay';
import { useDispatch } from 'react-redux';
import { authenticate } from './slices/User';
// import RegistrationForm from './components/RegistrationForm/RegistrationForm';

function App() {
  const [ statuses, setStatuses ] = useState([])
  const [ arts, setArts ] = useState([])
  const [ showRegister, setShowRegister ] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const dispatch = useDispatch()
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

  useEffect(()=>{
    if(!!document.cookie.split('; ').find(row => row.startsWith('user_id='))){
      fetch(`${REACT_APP_BACKEND_URL}/me`,{
        credentials: "include"
      })
      .then((data) => data.json())
      .then((ret) => dispatch(authenticate(ret)))
    }
  }, [REACT_APP_BACKEND_URL])

  return (
    <div>
      <Navbar 
        showRegister = {showRegister}
        setShowRegister={setShowRegister}
        showSignIn={showSignIn}
        setShowSignIn={setShowSignIn}
      />
      <Container className="content">
        <Routes>
          <Route 
            exact 
            path={'/'} 
            element={<Gallery 
              arts={arts} 
              user={user}
              setArts={setArts}
              />} 
          />
          <Route 
            path={'/art/:id'}
            element= {<ArtDisplay 
              arts={arts}
              setArts={setArts}
              statuses={statuses}
              user={user}
            />}
          />
          <Route 
            path={'/upload'} 
            element={<ArtForm 
              statuses={statuses} 
              mode={'upload'}
              arts={arts}
              setArts={setArts}
            />} 
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
