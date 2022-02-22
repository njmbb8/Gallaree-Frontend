import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Navbar from './components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery/Gallery';
import ArtForm from './components/ArtForm/ArtForm';
import { Container } from 'react-bootstrap';
import ArtDisplay from './components/ArtDisplay/ArtDisplay';
import { useDispatch } from 'react-redux';
import { authenticate } from './slices/User';
import { populate } from './slices/Arts'
import { TailSpin } from 'react-loader-spinner';

function App() {
  const [ statuses, setStatuses ] = useState([])
  const [ showRegister, setShowRegister ] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const dispatch = useDispatch()
  const { REACT_APP_BACKEND_URL } = process.env
  const [ ready, setReady ] = useState(false)

  useEffect(() => {
    fetch(`${REACT_APP_BACKEND_URL}/statuses`)
    .then((data) => data.json())
    .then((ret)=>setStatuses(ret))
  }, [REACT_APP_BACKEND_URL])

  useEffect(() => {
    fetch(`${REACT_APP_BACKEND_URL}/arts`)
    .then((data) => data.json())
    .then((ret) => dispatch(populate(ret)))
  }, [REACT_APP_BACKEND_URL, dispatch])

  useEffect(()=>{
    if(!!document.cookie.split('; ').find(row => row.startsWith('user_id='))){
      fetch(`${REACT_APP_BACKEND_URL}/me`,{
        credentials: "include"
      })
      .then((data) => data.json())
      .then((ret) => dispatch(authenticate(ret)))
    }
  }, [REACT_APP_BACKEND_URL, dispatch])

  return (
    <div>
      <Navbar 
        showRegister = {showRegister}
        setShowRegister={setShowRegister}
        showSignIn={showSignIn}
        setShowSignIn={setShowSignIn}
      />
      {ready ? 
      <Container className="content">
        <Routes>
          <Route 
            exact 
            path={'/'} 
            element={<Gallery />} 
          />
          <Route 
            path={'/art/:id'}
            element= {<ArtDisplay 
              statuses={statuses}
            />}
          />
          <Route 
            path={'/upload'} 
            element={<ArtForm 
              statuses={statuses} 
              mode={'upload'}
            />} 
          />
        </Routes>
      </Container>
      :<TailSpin 
        color="#00BFFF" 
        height={80} 
        width={80}
        wrapperStyle = { {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} 
      />}
    </div>
  );
}

export default App;
