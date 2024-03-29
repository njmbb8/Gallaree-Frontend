import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery/Gallery';
import ArtDisplay from './components/ArtDisplay/ArtDisplay';
import { useDispatch } from 'react-redux';
import { authenticate } from './slices/User';
import { populate } from './slices/Arts'
import { TailSpin } from 'react-loader-spinner';
import PasswordReset from './components/PasswordReset/PasswordReset';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './components/CheckoutForm/CheckoutForm';
import PaymentConfirmation from './components/PaymentConfirmation/PaymentConfirmation';
import AdminPanel from './components/AdminPanel/AdminPanel';
import BioDisplay from './components/BioDisplay/BioDisplay';
import UserPanel from './components/UserPanel/UserPanel';
import ErrorModal from './components/ErrorModal/ErrorModal';
import Order from './components/Order/Order';
import Blogs from './components/Blogs/Blogs';
import Blog from './components/Blogs/Blog/Blog';
import Contact from './components/Contact/Contact';
import Unsubscribe from './components/Unsubscribe/Unsubscribe';
import Confirmation from './components/Confirmation/Confirmation';

function App() {
  const dispatch = useDispatch()
  const { REACT_APP_BACKEND_URL, REACT_APP_STRIPE_PUBLISHABLE_KEY } = process.env
  const [ ready, setReady ] = useState(false)
  const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY)
  
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
    fetch(`${REACT_APP_BACKEND_URL}/arts`)
    .then((data) => data.json())
    .then((ret) => {
      dispatch(populate(ret))
      setReady(true)
    })
  }, [REACT_APP_BACKEND_URL, dispatch])
  
  return (
    <>
      {ready ? 
      <>
        <Navbar/>
        <Routes>
          <Route 
            exact 
            path={'/'} 
            element={<Gallery />} 
          />
          <Route 
            path={'/art/:id'}
            element= {<ArtDisplay />}
          />
          <Route
            path={'/adminpanel'}
            element={<AdminPanel />}
          />
          <Route
            path={'/adminpanel/:key'}
            element={<AdminPanel />}
          />
          <Route
            path={'/password_reset/:token'}
            element={<PasswordReset />}
          />
          <Route
            path={'/checkout'}
            element = {<CheckoutForm stripePromise={stripePromise}/>}
          />
          <Route
            path={'/success/:id'}
            element={<PaymentConfirmation/>}
          />
          <Route
            path={'/about'}
            element={<BioDisplay/>}
          />
          <Route
            path={'/user'}
            element={<UserPanel stripePromise={stripePromise}/>}
          />
          <Route
            path={'/user/:key'}
            element={<UserPanel stripePromise={stripePromise}/>}
          />
          <Route
            path={'/order/:id'}
            element={<Order stripePromise={stripePromise}/>}
          />
          <Route
            path={'/order/:id/:clientSecret'}
            element={<Order stripePromise={stripePromise}/>}
          />
          <Route
            path={'/blog/'}
            element={<Blogs />}
          />
          <Route
            path={'/blog/:id'}
            element={<Blog />}
          />
          <Route 
            path={'/contact/'}
            element={<Contact />}
          />
          <Route
            path={'/confirm/:token'}
            element={<Confirmation />}
          />
          <Route
            path={'/unsubscribe/:token'}
            element={<Unsubscribe />}
          />
        </Routes>
        <ErrorModal/>
      </>
      :<TailSpin 
        color="#00BFFF" 
        height={80} 
        width={80}
        wrapperStyle = { {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} 
      />}
    </>
  );
}

export default App;
