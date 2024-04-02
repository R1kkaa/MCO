import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Header from './header';


import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Body as Register} from './Register';
import {Body as Login} from './Login';
import {Body as View} from './RestaurantPreview';
import {Body as User} from './Profile';
import {Body as Restaurant} from './ViewRestaurant';
import {Body as Form} from './Form';
import {Body as Edit} from './EditProfile'

export const App = () => {
  return (
    <Routes>
    <Route path="/home/register" element={<><Header location="register" /><Register/></>} loader={{location: "register"}}/>
    <Route path="/home/login" element={<><Header location="login"/><Login/></>}/>
    <Route path="/home/main" element={<><Header location="home"/><View/></>}/>
    <Route path="/home/form" element={<><Header location="form"/><Form/></>}/>
    <Route path="/home/main/user/:id" element={<><Header location="profile"/><User/></>}/>
    <Route path="/home/main/restaurant/:restaurantid" element={<><Header location="profile"/><Restaurant/></>}/>
    <Route path="/home/main/user/editprofile" element={<><Header location="profile"/><Edit/></>}></Route>
    </Routes>
  );
};
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(<Router><App /></Router>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
