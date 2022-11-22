import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Navbar from './components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery/Gallery';
import { Container } from 'react-bootstrap';
import ArtDisplay from './components/ArtDisplay/ArtDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './slices/User';
import { populate } from './slices/Arts'
import { TailSpin } from 'react-loader-spinner';
import PasswordReset from './components/PasswordReset/PasswordReset';
import Confirmation from './components/Confirmation/Confirmation';
import { updateOrderItems } from './slices/Order';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './components/CheckoutForm/CheckoutForm';
import PaymentConfirmation from './components/PaymentConfirmation/PaymentConfirmation';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { setBioInfo } from './slices/Bio';
import BioDisplay from './components/BioDisplay/BioDisplay';
import UserPanel from './components/UserPanel/UserPanel';
import ErrorModal from './components/ErrorModal/ErrorModal';

function App() {
  const [ statuses, setStatuses ] = useState([])
  const dispatch = useDispatch()
  const { REACT_APP_BACKEND_URL, REACT_APP_STRIPE_PUBLISHABLE_KEY } = process.env
  const [ ready, setReady ] = useState(false)
  const clientSecret = useSelector(state => state.clientSecret)
  const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY)
  const user = useSelector(state => state.user)
  
  useEffect(()=>{
    if(!!document.cookie.split('; ').find(row => row.startsWith('user_id='))){
      fetch(`${REACT_APP_BACKEND_URL}/me`,{
        credentials: "include"
      })
      .then((data) => data.json())
      .then((ret) => {
        dispatch(authenticate(ret))
      })
    }
  }, [REACT_APP_BACKEND_URL, dispatch])
  
  useEffect(() => {
    fetch(`${REACT_APP_BACKEND_URL}/statuses`)
    .then((data) => data.json())
    .then((ret)=>setStatuses(ret))
  }, [REACT_APP_BACKEND_URL])
  
  useEffect(() => {
    fetch(`${REACT_APP_BACKEND_URL}/arts`)
    .then((data) => data.json())
    .then((ret) => {
      dispatch(populate(ret))
      setReady(true)
    })
  }, [REACT_APP_BACKEND_URL, dispatch])

  useEffect(()=>{
    fetch(`${REACT_APP_BACKEND_URL}/bio`)
    .then((data) => data.json())
    .then((ret) => {
      dispatch(setBioInfo(ret))
    })
  }, [REACT_APP_BACKEND_URL, dispatch])

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  
  return (
    <div>
      {ready ? 
      <>
        <Navbar/>
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
              path={'/adminpanel'}
              element={<AdminPanel statuses={statuses}/>}
            />
            <Route
              path={'/password_reset/:token'}
              element={<PasswordReset />}
            />
            <Route
              path={'/confirm/:token'}
              element={<Confirmation />}
            />
            <Route
              path={'/checkout'}
              element = {
                clientSecret?
                  <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm/>
                  </Elements>
                :
                  null
              }
            />
            <Route
              path={'/success/:id'}
              element={<PaymentConfirmation/>}
            />
            <Route
              path={'/bio'}
              element={<BioDisplay/>}
            />
            <Route
              path={'/user'}
              element={<UserPanel stripePromise={stripePromise}/>}
            />
          </Routes>
        </Container>
        <ErrorModal/>
      </>
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
